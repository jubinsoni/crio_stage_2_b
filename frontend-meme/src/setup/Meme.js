import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Meme = ({id,name,caption,date,image_file}) => {

  const datez = new Date(date);
  
  return (<article className="single-meme">
    <header>
      <div className="meme-info">
        <h4 className="meme-details">{name}</h4>
        <Link to={`/memes/${id}`}>
          <button className="btn link-meme-details"> Details </button>
        </Link>
      </div>
      <div className="meme-info">
          <p className="meme-details">{datez.toLocaleString()}</p>
      </div>
      <p>{caption}</p>
    </header>
    <img src={image_file} alt={name}/>
    
  </article>);
};

export default Meme;
