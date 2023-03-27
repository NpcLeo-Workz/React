import {Form} from 'react-bootstrap'
import SettingsContext from "../../context/settingsContext.jsx";
import {useContext} from "react";
const Settings = () => {
    const {listByCategory, toggleListByCategory, budget,setBudget} = useContext(SettingsContext)
    const changeBudget=(evt)=>{
        setBudget(Number(evt.target.value))
        localStorage.setItem("budget",evt.target.value)
    }
    return (
        <div className="mt-5">
            <Form.Group className="mb-3" >
                <Form.Label>Budget</Form.Label>
                <Form.Control type="number" placeholder="Enter budget in euro"
                              onChange={changeBudget} value={budget}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Check type="switch" label="list expenses by category" checked={listByCategory}
                            onChange={toggleListByCategory}/>
            </Form.Group>
        </div>
    )
}

export default Settings;
