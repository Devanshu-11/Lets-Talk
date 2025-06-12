import React from 'react';
import './Error.css';

const Error=({error})=>{
    return(
        <div className='Error'>
            <div className='Error_box'>
                <h1 className='h1_error'>Please Fix this Error and reload browser</h1>
                <p className="error_message">{error}</p>
            </div>
        </div>
    )
}

export default Error;