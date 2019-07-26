import React from 'react'
import EditableCell from "./EditableCell";

class ProductRow extends React.Component {
    onDelEvent() {
        this.props.onDelEvent(this.props.product);

    }
    render() {

        return (
            <tr className="eachRow">
                <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                    "type": "name",
                    value: this.props.product.name,
                    id: this.props.product.id
                }}/>
                <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                    type: "address",
                    value: this.props.product.address,
                    id: this.props.product.id
                }}/>
                <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                    type: "city",
                    value: this.props.product.city,
                    id: this.props.product.id
                }}/>
                <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                    type: "state",
                    value: this.props.product.state,
                    id: this.props.product.id
                }}/>
                <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                    type: "postalcode",
                    value: this.props.product.postalcode,
                    id: this.props.product.id
                }}/>
                <td className="del-cell">
                    <div onClick={this.onDelEvent.bind(this)}><i className="fa fa-trash" aria-hidden="true"></i></div>
                </td>
            </tr>
        );

    }

}

export default ProductRow