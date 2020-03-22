import React, { Fragment } from 'react';
import gif from './spinner.gif';
const Spinner = () => {
    return <Fragment>
        <img src={gif} alt="loading..." style={spinnerClass}></img>
    </Fragment>
};

const spinnerClass = {
    width: '200px',
    margin: 'auto',
    display: 'block'
};

export default Spinner;