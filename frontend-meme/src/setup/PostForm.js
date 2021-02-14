import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const PostFrom = () => {
    const [name,setName] = useState('');
    const [caption,setCaption] = useState('');
    const [imageUrl,setImageUrl] = useState('');
    const history = useHistory();
    const [reqError,setReqError] = useState('');

    //const url = 'http://localhost:8000/memes/'
    const url = 'http://ec2-3-7-45-215.ap-south-1.compute.amazonaws.com:8000/memes/'
    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            "name":name,
            "caption":caption,
            "image_url":imageUrl
        };
        console.log(payload);
        axios.post(url,payload)
            .then(response => {
                console.log(response);
                setTimeout(function(){
                    history.go(0);
                },500);
            })
            .catch(error => {
                console.log(error.response);
                setReqError(error.response.status + ' ' + error.response.statusText);
            });
    }

    return (
        <section className="section-center">
            <div className="title">
                <h2>Post Memes</h2>
                <div className="underline"></div>
            </div>
            <form onSubmit={handleSubmit} className="smaller-input">
                <div>
                    Name <br></br> <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    Caption <br></br> <input type="text" name="caption" value={caption} onChange={(e) => setCaption(e.target.value)}/>
                </div>
                <div>
                    Meme URL <br></br> <input type="url" name="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}/>
                </div>
                <button type="submit" className="btn">Submit</button>
                <p className='request-error'> {reqError} </p>
            </form>
        </section>
    );
};

export default PostFrom;
