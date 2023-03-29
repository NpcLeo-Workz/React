import { useState } from 'react';
import {Col, Container, Form, Row} from 'react-bootstrap'
import {useAuthenticate} from '../../api/userAPI'
import ResponseMessage from "../../utils/responseMessage.jsx";
import FormSubmitButtonWithLoading from "../../utils/formSubmitButtonWithLoading.jsx";
import { useNavigate } from "react-router-dom";
import useProfile from '../../hooks/useProfile.js'
import styled from "styled-components";
const NoStyleButton = styled.button`
  background: inherit;
  color: inherit;
  border: none;

  &:focus {
    outline: none;
  }
`
const Login = () => {
    const [email, setEmail] = useState(''); // email of the user
    const [password, setPassword] = useState(''); // password of the user
    const [username, setUsername] = useState(''); // username of the user
    const [isNewAccount, setIsNewAccount] = useState(false)
    const {mutate, isSuccess, error, isLoading} = useAuthenticate()
    const {isAuthenticated} = useProfile()
    const navigateFn = useNavigate()
    if (isAuthenticated) {
        setTimeout(() => navigateFn('/dashboard'), 1500)
    }

    const loginOrRegister = (evt) => {
        evt.preventDefault()
        evt.target.blur()
        if (isNewAccount) {
            mutate({email, password, username})
        } else {
            mutate({email, password})
        }
    }
    const usernameForm = (
        <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" required placeholder="Enter username" value={username}
                          onChange={e => setUsername(e.target.value)}/>
        </Form.Group>
    )
    const successText = `You've successfully signed ${isNewAccount ? 'up' : 'in'}, you'll be redirected soon.`
    return (
        <Container className="d-flex flex-column vh-100">
            <Row className="justify-content-center">
                <Col xs={12} sm={8}>

                    <Row className="mb-3">
                        <Col xs={6} className={!isNewAccount ? '' : 'text-muted'}>
                            <NoStyleButton onClick={() => setIsNewAccount(false)}>
                                <h4>Sign in</h4>
                            </NoStyleButton>
                        </Col>
                        <Col xs={6} className={`${isNewAccount ? '' : 'text-muted'} d-flex justify-content-end`}>
                            <NoStyleButton onClick={() => setIsNewAccount(true)}>
                                <h4>Create a new account</h4>
                            </NoStyleButton>
                        </Col>
                    </Row>

                    <Row>
                        <Form onSubmit={loginOrRegister}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" required placeholder="Enter email" value={email}
                                              onChange={e => setEmail(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" required placeholder="Enter password" value={password}
                                              onChange={e => setPassword(e.target.value)}/>
                            </Form.Group>

                            {isNewAccount && usernameForm}

                            <ResponseMessage success={isSuccess} successText={successText}
                                             failureText={error?.message}/>

                            <FormSubmitButtonWithLoading
                                loadingText={isNewAccount ? 'Creating an account for you' : 'Logging in ...'}
                                loading={isLoading}
                                text={isNewAccount ? 'Register account' : 'Log in'}/>
                        </Form>

                    </Row>

                </Col>
            </Row>
        </Container>

    );
}

export default Login;
