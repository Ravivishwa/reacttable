import React from 'react'
import ProductRow from './ProductRow'

class UserTable extends React.Component {

    render() {
        var onProductTableUpdate = this.props.onProductTableUpdate;
        var rowDel = this.props.onRowDel;
        var filterText = this.props.filterText;
        var product = this.props.products.map(function(product) {
            if (product.name.toLowerCase().indexOf(filterText) === -1) {
                return;
            }
            return (<ProductRow onProductTableUpdate={onProductTableUpdate} product={product} onDelEvent={rowDel.bind(this)} key={product.id}/>)
        });
        return (
            <div>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Adress</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Postal Code</th>
                    </tr>
                    </thead>
                    <tbody>
                    {product}
                    </tbody>

                </table>
            </div>
        );

    }

}

export default UserTable