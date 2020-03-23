import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './context';
import GithubReducer from './reducer';
import {
    SEARCH_USERS, GET_USER,
    CLEAR_USERS, SET_LOADING,
    SET_ALERT, REMOVE_ALERT
} from './types';

const GithubState = props => {
    const initialState = {
        users: {},
        user: [],
        repos: {},
        loading: false
    };



    const [state, dispatch] = useReducer(GithubReducer, initialState);
    return <GithubContext.Provider value={{
        users: state.users, user: state.user,
        repos: state.repos, loading: state.loading
    }}>
        {props.children}
    </GithubContext.Provider>
};

export default GithubState;





