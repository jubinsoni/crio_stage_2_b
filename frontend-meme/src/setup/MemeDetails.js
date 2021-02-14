import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PatchFrom from './PatchForm';

const MemeDetails = () => {
  const {id} = useParams();
  
  //const url = 'http://localhost:8000/memes/'
  const url = 'http://ec2-3-7-45-215.ap-south-1.compute.amazonaws.com:8000/memes/'
  const [details,setDetails] = useState([]);
  const fetchDetails = async () => {
    try{
      const response = await fetch(url+id);
      const details = await response.json();
      setDetails(details);
    } catch (error){
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetails();
  },[]);

  return (
    <main>
      <article className="single-meme single-meme-details">
        <PatchFrom {...details}/>
        <div className="title">
            <h2>Meme Details</h2>
            <div className="underline"></div>
        </div>
        <header>
          <div className="meme-info">
            <h4 className="meme-details">{details.name}</h4>
            <Link to="/">
              <button className="link-meme-details" >Back to Memes</button>
            </Link>
          </div>
          <div className="meme-info">
              <p className="meme-details">{(new Date(details.date)).toLocaleString()}</p>
          </div>
          <p>{details.caption}</p>
        </header>
        <img src={details.image_file} alt={details.name}/>
        
      </article>
    </main>
  );
};

export default MemeDetails;
