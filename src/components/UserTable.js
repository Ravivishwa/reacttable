import React from 'react'
import ProductRow from './ProductRow'

class UserTable extends React.Component {
    render() {

        var onProductTableUpdate = this.props.onProductTableUpdate;
        var rowDel = this.props.onRowDel;
        var renderList = this.props.userData.map(function(data) {
            return (<ProductRow onProductTableUpdate={onProductTableUpdate} product={data} onDelEvent={rowDel.bind(this)} key={data.id}/>)
        });
        return (
            <div>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th name="name">Name</th>
                        <th name="address">Adress</th>
                        <th name="city">City</th>
                        <th name="state">State</th>
                        <th name="postalcode">Postal Code</th>
                        <th name="delete"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderList}
                    </tbody>

                </table>
            </div>
        );

    }

}

export default UserTable