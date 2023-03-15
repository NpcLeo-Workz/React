import {createContext} from "react";

const SettingsContext = createContext( {
    // decimal sign
    commaSeparator: false,
    setCommaSeparator: (boolean)=>{
        
        console.log('commaseparator')
    }
    // pages categories
    // monthly budget

})

export default SettingsContext;
