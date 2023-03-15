import { useState } from 'react'
import {BrowserRouter} from 'react-router-dom'
import Navigation from './navigation/navigation.jsx'
import './App.css'
import Routing from "./routing.jsx";
import SettingsContext from "./context/settingsContext.jsx";

function App() {
  const [commaSeparator, setCommaSeparator] = useState(false)

  return (
    <BrowserRouter>
        <SettingsContext.Provider value={{commaSeparator, setCommaSeparator:()=> setCommaSeparator(x=> !x)}}>
            <Navigation/>
            <div className="container">
                <Routing/>
            </div>
        </SettingsContext.Provider>

    </BrowserRouter>
  )
}

export default App
