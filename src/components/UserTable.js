import React from 'react'
import ProductRow from './ProductRow'

class UserTable extends React.Component {
    render() {
        const { onSort, sort } = this.props;
        var onProductTableUpdate = this.props.onProductTableUpdate;
        var rowDel = this.props.onRowDel;
        var renderList = this.props.userData.map(function(data) {
            return (<ProductRow onProductTableUpdate={onProductTableUpdate} product={data} onDelEvent={rowDel.bind(this)} key={data.id}/>)
        });
        return (
            <div>
                <table className="table table-hover table-bordered">
                    <thead className={"thead-light"}>
                    <tr>
                        <th onClick={onSort('name')} style={{ cursor: 'pointer' }}>
                            Name <i className={`fa fa-arrow-${sort === 'asc' ? 'down': 'up'}`} aria-hidden="true" />
                        </th>
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