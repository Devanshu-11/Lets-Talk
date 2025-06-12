import React,{useContext, useEffect, useState} from "react";
import './NavBar.css';
import {ChatAppContext} from "../../Context/ChatAppContext.jsx";
import {Link} from "react-router-dom";
import Error from '../Error/Error.jsx';
import Model from "../Model/Model.jsx";

const NavBar=()=>{

    // Static MenuItems, moved out of the component to avoid re-creation on each render
    const MenuItems=[
        {
            menu: "All users",
            link: "/alluser",
        },
        {
            menu: "Chat",
            link: "/",
        },
        {
            menu: "Contact",
            link: "/",
        },
        {
            menu: "Setting",
            link: "/",
        },
        {
            menu: "Faqs",
            link: "/",
        },
        {
            menu: "Terms of use",
            link: "/",
        }
    ]

    // use State
    const [active, setActive]= useState(2);
    const [open, setOpen]= useState(false);
    const [openModel, setOpenModel]= useState(false);

    // get the context
    const {account, userName,connectWallet, createAccount, error}=useContext(ChatAppContext);

    return(
        <>
            <div className="NavBar">
                <div className="NavBar_box">
                    <div className="NavBar_box_right">

                        {/* For Desktop */}
                        <div className="NavBar_box_right_menu">
                            {MenuItems.map((el,i)=>(
                                <div key={i+1} onClick={()=>setActive(i+1)} className={`NavBar_box_right_menu_items ${active === i+1?'active_btn':''}`}>
                                    <Link className="NavBar_box_right_menu_items_link" to={el.link}>
                                        {el.menu}
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* For Mobile */}
                        {open && (
                            <div className="mobile_menu">
                                {MenuItems.map((el,i)=>(
                                    <div key={i+1} onClick={()=>setActive(i+1)} className={`mobile_menu_items ${active === i+1?'active_btn':''}`}>
                                        <Link className="mobile_menu_items_link" to={el.link}>
                                            {el.menu}
                                        </Link>
                                    </div>
                                ))}

                                <p className="mobile_menu_btn">
                                    <button onClick={()=>setOpen(false)}>Close Menu</button>
                                </p>
                            </div>
                        )}

                        {/* Connect Wallet */}
                        <div className="NavBar_box_right_connect">
                            {!account?(
                                <button onClick={()=>connectWallet()}>
                                    {" "}
                                    <span>Connect Wallet</span>
                                </button>
                            ): (
                                <button onClick={()=>setOpenModel(true)}>
                                    {/* {" "} */}
                                    {/* {userName? userName: "No Account Connected"} */}
                                    {" "}
                                    <small>{userName|| 'Create Account'}</small>
                                </button>
                            )}
                        </div>

                        <div className="NavBar_box_right_open" onClick={()=>setOpen(true)}>
                            &#9776;
                        </div>

                    </div>
                </div>
            </div>

            {/* Model Component */}
            {openModel&&(
                <div className="model_box">

                    <Model 
                        openBox={setOpenModel} 
                        title="Welcome To" 
                        head="Chat Buddy"
                        info="Chat Buddy is a real-time messaging app developed using React, designed for seamless communication between users. It features an intuitive user interface with wallet integration for authentication. The app ensures a responsive, interactive messaging experience across various devices, making it easy for users to connect, chat, and manage their contacts effortlessly"
                        smallInfo="Kindly select your name"
                        functionName={createAccount}
                        address={account}
                    ></Model>
                </div>
            )}

            {error?<Error error={error}/>:""}
        </>
    )
}

export default NavBar;