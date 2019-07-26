import React from  "react";

class SearchBar extends React.Component {
    handleChange() {
        this.props.onUserInput(this.refs.filterTextInput.value);
    }
    render() {
        return (
            <div>
                <div className="col-md-3">
                    <form className="navbar-form" role="search">
                        <div className="input-group add-on">
                            <input type="text" className="form-control" placeholder="Search" name="srch-term" id="srch-term" value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange.bind(this)}/>
                            <div className="input-group-btn">
                                <button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        );
    }

}

export default SearchBar