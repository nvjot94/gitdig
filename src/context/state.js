import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './context';
import GithubReducer from './reducer';
import {
    SEARCH_USERS, GET_USER, GET_REPOS,
    CLEAR_USERS, SET_LOADING,
    SET_ALERT, REMOVE_ALERT
} from './types';

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
        alert: null
    };

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    // clear Users
    const clearScreen = () => {
        dispatch({
            type: CLEAR_USERS
        })
    };

    // search Users
    const searchUser = async (text) => {
        setLoading();
        var result = await axios.get(`https://api.github.com/search/users?q=${text}`);
        dispatch({
            type: SEARCH_USERS,
            payload: result.data.items
        })
    };
    // get user repos
    const getUserRepos = async (username) => {
        setLoading();
        let result = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`);
        dispatch({ type: GET_REPOS, payload: result.data });
    };

    // get single user
    const getSingleUser = async (username) => {
        setLoading();
        var result = await axios.get(`https://api.github.com/users/${username}`);

        dispatch({ type: GET_USER, payload: result.data });
    };

    //set alert

    const showAlert = (msg, type) => {
        dispatch({ type: SET_ALERT, payload: { msg: msg, type: type } });
        //setTimeout(() => setAlert(null), 5000);
    };

    // rmv alert

    const removeAlert = () => {
        dispatch({ type: REMOVE_ALERT });
    };

    // Set Loading
    const setLoading = () => dispatch({ type: SET_LOADING });




    return <GithubContext.Provider value={{
        users: state.users, user: state.user,
        repos: state.repos, loading: state.loading, alert: state.alert,
        searchUser, clearScreen, getSingleUser, getUserRepos, showAlert, removeAlert
    }}>
        {props.children}
    </GithubContext.Provider>
};

export default GithubState;





