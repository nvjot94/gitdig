import React, { useState } from 'react'
const Search = ({ searchUser, clearScreen, showAlert, showClearButton }) => {
    const [text, setText] = useState('');

    const onChange = (event) => setText(event.target.value);

    const onSubmit = (event) => {
        event.preventDefault();

        if (text.length === 0) {
            showAlert('Please enter something', 'light');
        }
        else {
            searchUser(text);
            setText('');
        }

    };

    const clearHandler = () => {

        setText('');
        clearScreen(text);
    }
    return (
        <div>
            <form className="form" onSubmit={onSubmit}>
                <input type="text" name="text" placeholder="search users..."
                    value={text} onChange={onChange}></input>
                <input type="submit" value="Search"
                    className="btn btn-dark btn-block" ></input>
            </form>
            {showClearButton && <input type="button" value="Clear"
                className="btn btn-dark btn-block" onClick={clearHandler}></input>}
        </div>
    )

}

export default Search;
