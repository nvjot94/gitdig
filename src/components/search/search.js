import React, { useEffect, useState, useContext } from 'react';
import GithubContext from '../../context/context';
const Search = () => {


    const githubContext = useContext(GithubContext);
    const [text, setText] = useState('');
    const onChange = (event) => setText(event.target.value);

    const onSubmit = (event) => {
        event.preventDefault();

        if (text.length === 0) {

            githubContext.showAlert('Please enter something', 'light');
            setTimeout(githubContext.removeAlert, 5000);
        }
        else {
            githubContext.searchUser(text);
            setText('');
        }

    };

    const clearHandler = () => {
        setText('');
        githubContext.clearScreen(text);
    }
    return (
        <div>
            <form className="form" onSubmit={onSubmit}>
                <input type="text" name="text" placeholder="search users..."
                    value={text} onChange={onChange}></input>
                <input type="submit" value="Search"
                    className="btn btn-dark btn-block" ></input>
            </form>
            {githubContext.users.length > 0 && <input type="button" value="Clear"
                className="btn btn-dark btn-block" onClick={clearHandler}></input>}
        </div>
    )

};
export default Search;
