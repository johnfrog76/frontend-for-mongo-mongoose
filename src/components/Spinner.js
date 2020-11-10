import React from 'react';

import '../components/Spinner.css';

const Spinner = props => {
    return (
        // <div className="loading text-success">
        //     loading...
        // </div>
        <div className="spinner text-success">
             <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-clockwise" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                 <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"></path>
                 <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"></path>
             </svg>
        </div>
    );
};

export default Spinner;