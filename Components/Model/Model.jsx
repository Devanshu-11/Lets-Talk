import React, { useContext, useState } from 'react';
import './Model.css';
import {ChatAppContext} from '../../Context/ChatAppContext';
import Loader from '../Loader/Loader.jsx';

const Model=({openBox, title, head, info, smallInfo, functionName,address})=>{
    const [name, setName]=useState('');
    const [accountAddress, setAccountAddress]=useState('');
    const {loading}= useContext(ChatAppContext);

    const handleSubmit = () => {
        console.log("Name entered:", name);
        console.log("Account Address entered:", accountAddress);
        console.log("Address placeholder:", address);
        functionName({name,accountAddress});
    };

    return(
        <div className='Model'>
            <div className='Model_box'>
                <div className='Model_box_left'></div>
                <div className='Model_box_right'></div>
                <h1 className='h1_title'>{title} <span className='span_title'>{head}</span></h1>
                <p className='para_info'>{info}</p>
                
                <small className='small_smallInfo'>{smallInfo}</small>

                {
                    loading==true? (<Loader/>): (
                        <div className='Model_box_right_name'>
                            <div className='Model_box_right_name_info'>
                                <input type='text' placeholder='Your Name' onChange={(e)=>setName(e.target.value)}></input>
                            </div>


                            <div className='Model_box_right_name_info'>
                                <input type='text' placeholder={address||'Enter Your Address'} onChange={(e)=>setAccountAddress(e.target.value)}></input>
                            </div>

                            <div className='Navbar_box__right_name_button'>
                                <button onClick={handleSubmit}>
                                    {""}
                                    Submit
                                </button>

                                <button onClick={()=> openBox(false)}>
                                    {""}
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Model;
