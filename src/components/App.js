import React from 'react'
import SearchBar from './SearchBar'
import UserTable from './UserTable'


export default class App extends React.Component {

    state = {
        products : [],
        filterText:""
    }

    makeAsyncCall = () => {
        fetch("/user.json")
            .then(res => res.json())
            .then(
                (result) => {
                    localStorage.setItem('products', JSON.stringify(result))
                    this.setState({
                        products: JSON.parse(localStorage.getItem('products'))
                    });
                }
            )
    }

    setProductState = (data) => {
        this.setState({
            products: data
        });
    }

    componentDidMount() {
        let data = JSON.parse(localStorage.getItem('products'));
        if(data !== null){
            this.setProductState(data);
        }else{
            this.makeAsyncCall();
        }
    }


    handleUserInput(filterText) {
        this.setState({filterText: filterText});
    }

    handleRowDel(product) {
        var index = this.state.products.indexOf(product);
        this.state.products.splice(index, 1);
        let updatedRow = this.state.products;
        localStorage.setItem('products', JSON.stringify(updatedRow))
        this.setState(JSON.parse(localStorage.getItem('products')));
    };

    handleProductTable(evt) {
        var item = {
            id: evt.target.id,
            name: evt.target.name,
            value: evt.target.value
        };
        var products = this.state.products.slice();
        localStorage.setItem('products', JSON.stringify(products))
        let getUsers = JSON.parse(localStorage.getItem('products'));

        var newProducts = getUsers.map(function(product) {
            for (var key in product) {
                if (key == item.name && product.id == item.id) {
                    product[key] = item.value;

                }
            }
            return product;
        });

        localStorage.setItem('products', JSON.stringify(newProducts))
        this.setState({products:JSON.parse(localStorage.getItem('products'))});
    };
    render() {

        return (
            <div>
                <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)}/>
                <UserTable onProductTableUpdate={this.handleProductTable.bind(this)} onRowDel={this.handleRowDel.bind(this)} products={this.state.products} filterText={this.state.filterText}/>
            </div>
        );

    }

}