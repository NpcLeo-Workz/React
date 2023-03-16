import { useState } from 'react'
import Navigation from './navigation/navigation.jsx'
import './App.css'
import Routing from "./routing.jsx";
import SettingsContext from "./context/settingsContext.jsx";
import {Navigate, useLocation} from 'react-router-dom'
import useProfile from "./hooks/useProfile.js";

function App() {
    const [commaSeparator, setCommaSeparator] = useState(false)
    const {pathname} = useLocation()
    const {profile} = useProfile()
    console.log(profile?.id)
    if(!profile?.id &&  pathname !=='/login' && pathname !== '/'){
        return <Navigate to={'/login'}/>
    }
  return (

        <SettingsContext.Provider value={{commaSeparator, setCommaSeparator:()=> setCommaSeparator(x=> !x)}}>
            <Navigation/>
            <div className="container">
                <Routing/>
            </div>
        </SettingsContext.Provider>
  )
}

export default App
