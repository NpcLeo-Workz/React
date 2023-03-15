import {Form} from 'react-bootstrap'
import SettingsContext from "../../context/settingsContext.jsx";
import {useContext} from "react";
const Settings = () => {
    const {commaSeparator, setCommaSeparator} = useContext(SettingsContext)
    return (
        <div className="mt-5">
        <Form.Group className="mb-3">
            <Form.Check type="switch" id="custom-switch" label="Use comma Separator" checked={commaSeparator}
                        onChange={setCommaSeparator}/>
        </Form.Group>

        </div>
    )
}

export default Settings;
