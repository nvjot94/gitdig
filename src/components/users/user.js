import React, { useEffect, Fragment, useContext } from 'react';
import Spinner from '../layout/spinner';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Repos from './repos';
import GithubContext from '../../context/context';
const User = ({ match }) => {
    const githubContext = useContext(GithubContext);
    const { getSingleUser, getUserRepos, user, repos, loading } = githubContext;
    useEffect(() => {
        getSingleUser(match.params.login);
        getUserRepos(match.params.login);
        //eslint-disable-next-line
    }, []);

    const {
        name,
        company,
        avatar_url,
        location,
        bio,
        blog,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable
    } = user;


    return loading ? <Spinner /> : <Fragment>
        <Link to='/gitdig' className='btn btn-light'>
            Back To Search
        </Link>
        Hireable:{' '}
        {hireable ? (
            <i className='fas fa-check text-success' />
        ) : (
                <i className='fas fa-times-circle text-danger' />
            )}
        <div className='card grid-2'>
            <div className='all-center'>
                <img
                    src={avatar_url}
                    className='round-img'
                    alt=''
                    style={{ width: '150px' }}
                />
                <h1>{name}</h1>
                <p>Location: {location}</p>
            </div>
            <div>
                {bio && (
                    <Fragment>
                        <h3>Bio</h3>
                        <p>{bio}</p>
                    </Fragment>
                )}
                <a href={html_url} className='btn btn-dark my-1'>
                    Visit Github Profile
            </a>
                <ul>
                    <li>
                        {login && (
                            <Fragment>
                                <strong>Username: </strong> {login}
                            </Fragment>
                        )}
                    </li>

                    <li>
                        {company && (
                            <Fragment>
                                <strong>Company: </strong> {company}
                            </Fragment>
                        )}
                    </li>

                    <li>
                        {blog && (
                            <Fragment>
                                <strong>Website: </strong> {blog}
                            </Fragment>
                        )}
                    </li>
                </ul>
            </div>
        </div>
        <div className='card text-center'>
            <div className='badge badge-primary'>Followers: {followers}</div>
            <div className='badge badge-success'>Following: {following}</div>
            <div className='badge badge-light'>Public Repos: {public_repos}</div>
            <div className='badge badge-dark'>Public Gists: {public_gists}</div>
        </div>
        <Repos repos={repos} />
    </Fragment>;


};

User.propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired
};

export default User;