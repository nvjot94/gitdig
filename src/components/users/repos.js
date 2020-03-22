import React, { Fragment } from 'react';

export const Repos = (props) => {

    return (<Fragment>
        {props.repos.map(repo => {
            return <div className='card'>
                <h3>
                    <a href={repo.html_url}>{repo.name}</a>
                </h3>
            </div>
        })
        }
    </Fragment>

    );
};



export default Repos;
