import {createContext} from "react";

const SettingsContext = createContext( {
    // pages categories
    listByCategory: true,
    toggleListByCategory:(evt)=>{
        console.log('Not implemented yet')
    },
    // monthly budget
    budget: 0,
    setBudget:(number)=>{
        console.log('not implemented yet')
    }

})

export default SettingsContext;
