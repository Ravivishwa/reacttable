import React from 'react'
import UserTable from './UserTable'
import Pagination from "./Pagination";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            filterText:"",
            page: 1,
            totalPages: 0,
            limit: 10,
            sortOrder: 'asc',
            searchResult: [],
        };
    }

    componentWillMount() {
        const userData = localStorage.getItem('userData');
        if(!userData) {
            localStorage.setItem('userData', JSON.stringify(require('../user.json')));
        }
    }

    componentDidMount() {
        let userData = localStorage.getItem('userData');
        const { limit } = this.state;
        if(userData) {
            userData = JSON.parse(userData).sort((a, b) => b.name > a.name ? -1 : 1);
            localStorage.setItem('userData', JSON.stringify(userData));
            const totalPages = Math.ceil(userData.length / limit);
            this.setState({ userData: userData.slice(0, limit), totalPages });
        }
    }

    handlePageChange = (e) => {
        e.preventDefault();
        let userData = localStorage.getItem('userData');
        const { limit, page, totalPages, searchResult } = this.state;
        let currentPage = parseInt(e.target.innerHTML);
        if(e.target.innerHTML === 'Next' && page < totalPages) {
            currentPage = page + 1;
        } else if(e.target.innerHTML === 'Next' && page >= totalPages) {
            currentPage = totalPages;
        }
        if(e.target.innerHTML === 'Previous' && page > 1) {
            currentPage = page - 1;
        } else if(e.target.innerHTML === 'Previous' && page <= 1)  {
            currentPage = 1;
        }
        const lastIndex = limit * currentPage;
        const firstIndex = lastIndex - limit;
        if(userData) {
            userData = searchResult.length ? searchResult : JSON.parse(userData);
            this.setState({ userData: userData.slice(firstIndex, lastIndex), page: currentPage});
        }
    }

    handleSearch = (e) => {
        const { limit } = this.state;
        let userData = JSON.parse(localStorage.getItem('userData'));
        if(e.target.value.length) {
            const filteredData = userData.filter(item => {
                return Object.keys(item).some(key =>
                    ['name', 'address', 'city', 'state', 'postalcode'].includes(key) ? item[key].toLowerCase().includes(e.target.value.toLowerCase()) : null
                );
            })
            const totalPages = Math.ceil(filteredData.length / limit);
            this.setState({ userData: filteredData.slice(0, limit), totalPages, searchResult: filteredData, page: 1, sortOrder: 'asc' });
        } else {
            const totalPages = Math.ceil(userData.length / limit);
            this.setState({ userData: userData.slice(0, limit), totalPages, searchResult: [], page: 1,  sortOrder: 'asc' });
        }
    }

    handleRowDel = (product) => {
        const { limit, page, searchResult } = this.state;
            let myData = JSON.parse(localStorage.getItem('userData'));
            myData = myData.filter(d => d.id !== product.id);
            localStorage.setItem('userData', JSON.stringify(myData));
            const lastIndex = limit * page;
            const firstIndex = lastIndex - limit;
            if(searchResult.length) {
                const searchData = searchResult.filter(d => d.id !== product);
                this.setState({ userData: searchData.slice(firstIndex, lastIndex), searchResult: searchData});
            } else {
                this.setState({ userData: myData.slice(firstIndex, lastIndex)});
            }
    };

    handleProductTable = (evt) => {
        var item = {
            id: evt.target.id,
            name: evt.target.name,
            value: evt.target.value
        };
        const { limit } = this.state;
        let getUsers = JSON.parse(localStorage.getItem('userData'));
        var newerData;
        newerData = getUsers.map(function (product) {
            for (var key in product) {
                console.log(key,item.name)
                if (!(key === item.name && product.id === Number(item.id))) continue;
                product[key] = item.value;
            }
            return product;
        });
        localStorage.setItem('userData', JSON.stringify(newerData));
        const totalPages = Math.ceil(newerData.length / limit);
        this.setState({ userData: newerData.slice(0, limit), totalPages });
    }

    onSort= () => {
        const { limit, page, sortOrder, searchResult } = this.state;
        let myData = searchResult.length ? searchResult : JSON.parse(localStorage.getItem('userData'));
        let order = sortOrder;
        if(sortOrder === 'asc') {
            myData = myData.sort((a, b) => b.name > a.name ? 1 : -1);
            order = 'desc';
        } else {
            myData = myData.sort((a, b) => b.name > a.name ? -1 : 1);
            order = 'asc';
        }
        if(!searchResult.length) {
            localStorage.setItem('myData', JSON.stringify(myData));
        }

        const lastIndex = limit * page;
        const firstIndex = lastIndex - limit;

        this.setState({ userData: myData.slice(firstIndex, lastIndex), sortOrder: order });

    }

    render() {
        const { userData, totalPages, page,sortOrder } = this.state;
        return (
            <div className={"container"} style={{ marginTop: '30px '}}>
                <div style={{ marginBottom: '30px '}}><input onKeyUp={this.handleSearch} className="p-1" placeholder="Search..."  /></div>
                {userData && userData.length && totalPages ? <UserTable onProductTableUpdate={this.handleProductTable} onSort={() => this.onSort} sort={sortOrder} onRowDel={this.handleRowDel} userData={this.state.userData} filterText={this.state.filterText}/> : 'NO RESULTS FOUND'}
                {userData && userData.length && totalPages ? <Pagination onPageChange={this.handlePageChange} page={page} totalPages={totalPages} /> : ''}
            </div>
        );

    }
}