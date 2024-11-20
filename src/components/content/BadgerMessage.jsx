import React from "react"
import { Card,Button } from "react-bootstrap";

function BadgerMessage(props) {

    const dt = new Date(props.created);
    let badgerID = 'bid_15e28f6a0302c806a69bfe7c2dad8ab57cffa04c99c3002a017cc137cbe4f007';

    const handleDelete = () =>{
        fetch(`https://cs571api.cs.wisc.edu/rest/f24/hw6/messages?id=${props.id}`,{
            method:"DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": badgerID
            },
           
           }).then(res => {
               
                return res.json()
           }).then(json => {
           
            alert(json.msg)

           })
    }
    return <Card style={{margin: "0.5rem", padding: "0.5rem"}}>
        <h2>{props.title}</h2>
        <sub>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</sub>
        <br/>
        <i>{props.poster}</i>
        <p>{props.content}</p>
            {props.poster === props.currentUser ? (
                <>
                <Button variant ='danger' onClick={handleDelete}>Delete Post</Button>
                </>
            ):(
                <>
                </>
            )}
    </Card>
}

export default BadgerMessage;