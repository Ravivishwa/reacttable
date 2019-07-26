import React, { Component } from 'react'



class Main extends Component {

    state = {
        users : []
    }

    componentDidMount() {
        fetch("/user.json")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        users: result
                    });
                }
            )
    }

    render() {
        return (
            <div className="container">
                <div className="col-md-3">
                    <form className="navbar-form" role="search">
                        <div className="input-group add-on">
                            <input type="text" className="form-control" placeholder="Search" name="srch-term" id="srch-term"/>
                            <div className="input-group-btn">
                                <button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
                            </div>
                        </div>
                    </form>
                </div>
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
                    {
                        this.state.users.map(user =>
                            <tr key = {user.id}>
                                <td>{user.name}</td>
                                <td>{user.address}</td>
                                <td>{user.city}</td>
                                <td>{user.state}</td>
                                <td>{user.postalcode}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Main