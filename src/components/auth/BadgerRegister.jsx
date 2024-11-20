import React from 'react';
import {useRef,useState} from 'react';
import {Form,Row,Button} from 'react-bootstrap';
export default function BadgerRegister() {
    
    let badgerID = 'bid_15e28f6a0302c806a69bfe7c2dad8ab57cffa04c99c3002a017cc137cbe4f007';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const passwordPattern = /^\d{7}$/;

    // TODO Create the register component.
    const handleRegister = (event) =>{
        event.preventDefault()
        console.log(password)
        console.log(confirmPassword)
        if(password == "" || email == ""){
            alert("You must provide both a username and pin!")
        }
        else if (!passwordPattern.test(password)){
            alert("Your pin must be a 7-digit number!")
        }
        else if (password != confirmPassword){
            alert("Your pins do not match!")
        }
       fetch("https://cs571api.cs.wisc.edu/rest/f24/hw6/register",{
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
             if (res.status === 409) {
                alert("This user already exists!");
            } else if (res.status === 413) {
                alert("'username' must be 64 characters or fewer");
            } else if (res.status === 200) {
                alert("Successfully authenticated.");
            }
            return res.json()
       }).then(json => {
       })
    }
   
    return <>
        <h1>Register</h1>
        <Form>
            <Form.Group as={Row} className='mb-3' controlId = "formPlaintextEmail">
                <Form.Label htmlFor='username' column sm='5'>username</Form.Label>
                    <Form.Control 
                        id='username'
                        type="text" 
                        placeholder =""
                        value = {email}
                        onChange={(e) => setEmail(e.target.value)} 
                    />

                <Form.Label htmlFor='password'column sm='5'>Password</Form.Label>
                    <Form.Control 
                        id='password'
                        type="password" 
                        placeholder =""
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                <Form.Label column sm='5'>Repeat Password</Form.Label>
                    <Form.Control htmlFor='confrim'
                        id = "confirm"
                        type="password" 
                        placeholder ="" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
            </Form.Group>
        </Form>
        <Button variant="primary" onClick={handleRegister}>Register</Button>
    </>
}
