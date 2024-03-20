import './App.css';
import {ZIMKitManager, Common} from "@zegocloud/zimkit-react"
import "@zegocloud/zimkit-react/index.css"
import { useEffect, useState } from 'react';
import Form from './Form';
function App() {
  const [isLoggedin, setIsLoggedIn]=useState(false)
  const [appConfig,setAppConfig]=useState(
  {
      appID:Number(import.meta.env.VITE_APP_ID),
      serverSecret:import.meta.env.VITE_APP_SECRET
    })

const [userInfo,setUserInfo]=useState({
      userID:'',
      userName:'',
      userAvatarUrl:'https://storage.zego.im/IMKit/avatar/avatar-0.png'
    }
)
useEffect(()=>{
  const zimKit=async()=>{
    const zimKit=new ZIMKitManager();
    const token=zimKit.generateKitTokenForTest
    (appConfig.appID, 
    appConfig.serverSecret,
    userInfo.userID)
    await zimKit.init(appConfig.appID);
    await zimKit.connectUser(userInfo, token)
  }
  isLoggedin && zimKit()
},[isLoggedin])
  return (
   
     <>
     {isLoggedin ? <Common/>: <Form setUserInfo={setUserInfo} setIsLoggedIn={setIsLoggedIn}/>}
     </>
  );
}

export default App