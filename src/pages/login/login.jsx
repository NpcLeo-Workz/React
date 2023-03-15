import { useState } from 'react';
import {Button, Form} from 'react-bootstrap'
import {register} from '../../api/userAPI'
import ResponseMessage from "../../utils/responseMessage.jsx";
import FormSubmitButtonWithLoading from "../../utils/formSubmitButtonWithLoading.jsx";
const Login = () => {
    const [email, setEmail] = useState(''); // email of the user
    const [password, setPassword] = useState(''); // password of the user
    const [username, setUsername] = useState(''); // username of the user
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(''); // User object after registration / login
    const [session, setSession] = useState(''); // session object after registration / login

    const handleRegister = async (event) =>{
        event.preventDefault()
        setLoading(true)
        await register({email, password, username})
        setSuccess(success)
        setLoading(false)
    }

    return (
        <div className="container">
            <Form onSubmit={handleRegister}>
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email}
                                  onChange={e => setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password}
                                  onChange={p => setPassword(p.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" value={username}
                                  onChange={u => setUsername(u.target.value)}/>
                </Form.Group>
                <ResponseMessage success={success}
                                 successText={'You\'ve successfully singed up, please check your email for a confirmation link.'}
                                 failureText={'Something went wrong, please try again.'}/>

                <FormSubmitButtonWithLoading loading={loading} loadingText={'trying to register ...'} text={'register'} />
            </Form>
        </div>

    );
}

export default Login;
