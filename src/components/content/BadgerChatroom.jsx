import React, { useEffect, useState, useContext,useRef } from "react";
import { Row, Col, Pagination, Form ,Button} from 'react-bootstrap'; 
import BadgerMessage from "./BadgerMessage";
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';

export default function BadgerChatroom(props) {
    const [messages, setMessages] = useState([]);
    let badgerID = 'bid_15e28f6a0302c806a69bfe7c2dad8ab57cffa04c99c3002a017cc137cbe4f007';
    const [activePage, setActivePage] = useState(1); 
    const [loginName, setLoginName] = useContext(BadgerLoginStatusContext);

    const titleRef = useRef();
    const contentRef = useRef();
    console.log(loginName)
    const loadMessages = () => {
        fetch(`https://cs571api.cs.wisc.edu/rest/f24/hw6/messages?chatroom=${props.name}&page=${activePage}`, {
            headers: {
                "X-CS571-ID": badgerID
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        });
    };

    useEffect(() => {
        loadMessages(activePage); 
        
        
        const storedUser = sessionStorage.getItem('loginName');
        setLoginName(storedUser);
    }, [props.name, activePage]);

  
    
    const handlePost = () =>{
        const title = titleRef.current.value
        const content = contentRef.current.value
        if(title === '' || content === ''){
            alert("You must provide both a title and content!")
            return;
        }
        fetch(`https://cs571api.cs.wisc.edu/rest/f24/hw6/messages?chatroom=${props.name}`,{
            method:"POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": badgerID
            },
            body: JSON.stringify({
                "title": title,
                "content": content
            })
           }).then(res => {
                 if (res.status === 401) {
                    alert("You must be logged in to do that!");
                } else if (res.status === 404) {
                    alert("The specified chatroom does not exist. Chatroom names are case-sensitive.");
                } else if (res.status === 413){
                    alert("'title' must be 128 characters or fewer and 'content' must be 1024 characters or fewer")
                }
                return res.json()
           }).then(json => {
           
            alert("Successfully posted message!")

           })
    }
    return (
        <>
            <h1>{props.name} Chatroom</h1>
            <hr/>
            
            {messages.length > 0 ? (
                <Row>
                    {/* Left side - Form */}
                    <Col xs={12} md={4}>
                        {loginName ? (
                            <>
                                <Form>
                                    <Form.Group className='mb-3' controlId="formPlaintextEmail">
                                        <Form.Label htmlFor="title">Post Title</Form.Label>
                                        <Form.Control 
                                            id='title'
                                            type="text" 
                                            placeholder="Enter your title"
                                            ref={titleRef}
                                        />
                                        <Form.Label htmlFor="content">Post Content</Form.Label>
                                        <Form.Control 
                                            id='content'
                                            type="text" 
                                            placeholder="Enter your content"
                                            ref={contentRef}
                                        />
                                    </Form.Group>
                                </Form>
                                <Button variant ='primary' onClick={handlePost}>Create Post</Button>
                            </>
                        ):(
                            <>
                            <p>You must be logged in to post!</p>
                            </>
                        )
                    }
                    </Col>

                    {/* Right side - Messages */}
                    <Col xs={12} md={8}>
                        <Row>
                            {messages.map((message) => (
                                <Col key={message.id} xs={12} sm={6} className="mb-4">
                                    <BadgerMessage
                                        title={message.title}
                                        poster={message.poster}
                                        content={message.content}
                                        created={message.created}
                                        currentUser = {loginName}
                                        id = {message.id}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            ) : (
                <p>There are no messages on this page yet!</p>
            )}

            <Pagination>
                {[1, 2, 3, 4].map(page => (
                    <Pagination.Item
                        key={page}
                        active={activePage === page}
                        onClick={() => setActivePage(page)}
                    >
                        {page}
                    </Pagination.Item>
                ))}
            </Pagination>
        </>
    );
}
