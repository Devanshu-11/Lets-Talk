import React,{useContext, useEffect, useState} from "react";
import styles from './NavBar.module.css';
import {ChatAppContext} from "../../Context/ChatAppContext.jsx";
import {Link} from "react-router-dom";

const NavBar=()=>{

    // Static MenuItems, moved out of the component to avoid re-creation on each render
    const MenuItems=[
        {
            menu: "All users",
            link: "alluser",
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
    const {account, userName,connectWallet}=useContext(ChatAppContext);

    return(
        <>
            <div className="NavBar">
                <div className="NavBar_box">
                    <div className="NavBar_box_right">
                        <div className="NavBar_box_right_menu">
                            {MenuItems.map((el,i)=>(
                                <div key={i+1} onClick={()=>setActive(i+1)} className={`NavBar_box_right_menu_items ${active === i+1?'active_btn':''}`}>
                                    <Link className="NavBar_box_right_menu_items_link" to={el.link}>
                                        {el.menu}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar;