
import React, { useEffect,useContext } from 'react';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';

export default function BadgerLogout() {
    const [, setLoginStatus] = useContext(BadgerLoginStatusContext);

    useEffect(() => {
        fetch('https://cs571api.cs.wisc.edu/rest/f24/hw6/logout', {
            method: 'POST',
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            },
            credentials: "include"
        }).then(res => res.json()).then(json => {
            // Maybe you need to do something here?
            setLoginStatus(false)
            sessionStorage.removeItem('loginName')
            alert("You have been logged out!")
        })
    }, []);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}
