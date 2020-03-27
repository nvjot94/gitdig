import React, { Fragment } from 'react'
import Users from "../users/users";
import Search from '../search/search';
import Alert from '../layout/alert';
const Home = () => {
    return (

        <Fragment>
            <Alert alert={alert} />
            <Search />
            <Users />
        </Fragment>

    )
};

export default Home;
