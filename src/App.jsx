import { useState } from 'react'
import Navigation from './navigation/navigation.jsx'
import './App.css'
import Routing from "./routing.jsx";
import SettingsContext from "./context/settingsContext.jsx";
import {Navigate, useLocation} from 'react-router-dom'
import useProfile from "./hooks/useProfile.js";
const listChoice = localStorage.getItem('listByCategory') || 'true'
const currentBudget = Number(localStorage.getItem('budget'))|| 0
const App=()=> {
    const [listByCategory, setListByCategory] = useState(listChoice === 'true')
    const [budget,setBudget]= useState(currentBudget)

    const {pathname} = useLocation()
    const {profile} = useProfile()
    if(!profile?.id &&  pathname !=='/login' && pathname !== '/'){
        return <Navigate to={'/login'}/>
    }
    const toggleListByCategory = (evt)=>{
        evt?.target?.blur()
        setListByCategory(l=>{
            localStorage.listByCategory = l ? 'false' : 'true'
            return !l
        })
    }
  return (
        <SettingsContext.Provider value={{listByCategory, toggleListByCategory, budget,setBudget}}>
            <Navigation/>
            <div className="container">
                <Routing/>
            </div>
        </SettingsContext.Provider>
  )
}

export default App
