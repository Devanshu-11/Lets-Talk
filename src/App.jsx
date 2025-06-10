import React from "react";
import { ChatAppProvider } from "../Context/ChatAppContext.jsx";
import NavBar from '../Components/NavBar/NavBar.jsx';

const App=()=>{
  return(
    <>
      <ChatAppProvider>
        <NavBar />
        <h1>Hi, This is the chatting Application</h1>
      </ChatAppProvider>
    </>
  )
}

export default App;