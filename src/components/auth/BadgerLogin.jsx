import React from 'react';
import {useRef,useContext ,useEffect} from 'react';
import {Form,Row,Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import  BadgerLoginStatusContext  from '../contexts/BadgerLoginStatusContext';

export default function BadgerLogin() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const navigate = useNavigate(); 
    let badgerID = 'bid_15e28f6a0302c806a69bfe7c2dad8ab57cffa04c99c3002a017cc137cbe4f007';

    
    useEffect(() =>{
        const loggedIn = sessionStorage.getItem('loginStatus');
        if(loggedIn === 'true'){
            setLoginStatus(true)
        }
    },[setLoginStatus])
    // TODO Create the login component.
    const handleLogin = () =>{
        const password = passwordRef.current.value
        const email = emailRef.current.value
        const passwordPattern = /^\d{7}$/;
        if(password == "" || email == ""){
            alert("You must provide both a username and pin!")
        }else if (!passwordPattern.test(password)){
            alert("Your pin must be a 7-digit number!")
        }
       fetch("https://cs571api.cs.wisc.edu/rest/f24/hw6/login",{
        method:"POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-CS571-ID": badgerID
        },
        body: JSON.stringify({
            "username": email,
            "pin": password
        })
       }).then(res => {
            if (res.status === 401) {
                alert("That username or pin is incorrect!");
            }else if (res.status === 200) {
                alert("Successfully authenticated.");
                setLoginStatus(true)
                sessionStorage.setItem('loginStatus','true')
                sessionStorage.setItem('loginName',email)
                navigate('/')
            }
            return res.json()
       }).then(json => {
       })
    }
    return <>
        <h1>Login</h1>
        <Form>
            <Form.Group as={Row} className='mb-3' controlId = "formPlaintextEmail">
                <Form.Label htmlFor='email'column sm='5'>Email</Form.Label>
                    <Form.Control 
                        id='email'
                        type="email" 
                        placeholder ="name@example.com"
                        ref={emailRef}
                    />
                <Form.Label htmlFor='password' column sm='5'>Password</Form.Label>
                    <Form.Control 
                        id='password'
                        type="password" 
                        placeholder =""
                        ref={passwordRef}
                    />
            </Form.Group>
        </Form>
        <Button variant="primary" onClick={handleLogin}>Login</Button>
    
    </>
}
