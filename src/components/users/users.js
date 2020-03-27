import React, { useEffect, useContext } from 'react'
import UserItem from './useritem';
import Spinner from '../layout/spinner';
import PropTypes from 'prop-types';
import GithubContext from '../../context/context';

const Users = () => {
    const githubContext = useContext(GithubContext);
    useEffect(() => {
        githubContext.searchUser('nvjot94');
        //eslint-disable-next-line
    }, []);

    const { loading, users } = githubContext;
    return loading ? <Spinner /> : <div style={userStyle}>
        {users.map(user =>
            <UserItem key={user.id} user={user} />
        )}
    </div>;
}

Users.propTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gridGap: '1rem'
}

export default Users;
