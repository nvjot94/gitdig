import React, { Component } from 'react'

export class Search extends Component {
    state = {
        text: ''
    };

    onChange = (event) => this.setState({ [event.target.name]: event.target.value });

    onSubmit = (event) => {
        event.preventDefault();

        if (this.state.text.length === 0) {
            this.props.showAlert('Please enter something', 'light');
        }
        else {
            this.props.searchUser(this.state.text);
            this.setState({ text: '' });
        }

    };

    clearScreen = () => {

        this.setState({ text: '' });
        this.props.clearScreen(this.state.text);
    }

    render() {
        return (
            <div>
                <form className="form" onSubmit={this.onSubmit}>
                    <input type="text" name="text" placeholder="search users..."
                        value={this.state.text} onChange={this.onChange}></input>
                    <input type="submit" value="Search"
                        className="btn btn-dark btn-block" ></input>
                </form>
                {this.props.showClearButton && <input type="button" value="Clear"
                    className="btn btn-dark btn-block" onClick={this.clearScreen}></input>}
            </div>
        )
    }
}

export default Search
