import React from "react";
import { ChatAppProvider } from "../Context/ChatAppContext.jsx";
import NavBar from '../Components/NavBar/NavBar.jsx';

const App=()=>{
  return(
    <>
      <ChatAppProvider>
        <NavBar />
      </ChatAppProvider>
    </>
  )
}

export default App;