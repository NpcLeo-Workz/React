import { useState } from 'react';
import {Button, Form} from 'react-bootstrap'
import {register} from '../../api/userAPI'
import ResponseMessage from "../../utils/responseMessage.jsx";
const Login = () => {
    const [email, setEmail] = useState(''); // email of the user
    const [password, setPassword] = useState(''); // password of the user
    const [username, setUsername] = useState(''); // username of the user
    const [Rmsg, setRMsg] = useState(''); // Registration message
    const [Lmsg, setLMsg] = useState(''); // Login message
    const [user, setUser] = useState(''); // User object after registration / login
    const [session, setSession] = useState(''); // session object after registration / login

    const handleRegister = async (event) =>{
        event.preventDefault()
        await register({email, password, username})
    }

    return (
        <div>
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
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" value={username}
                                  onChange={u => setUsername(u.target.value)}/>
                </Form.Group>
                <Button type="submit" text={'register'}/>
            </Form>
        </div>

    );
}

export default Login;
