import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Memes from './Memes';
import PostFrom from './PostForm';

//const url = 'http://localhost:8000/memes/' 
const url = 'http://ec2-3-7-45-215.ap-south-1.compute.amazonaws.com:8000/memes/'
function AllMemes() {
  const [loading,setLoading] = useState(true);
  const [memes,setMemes] = useState([]);

  const fetchMemes = async () => {
    setLoading(true);
    try{
      const response = await fetch(url);
      const memes = await response.json();
      setLoading(false);
      setMemes(memes);
    } catch (error){
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMemes();
  },[]);

  if(loading)
  {
    return (
    <main>
      <Loading />
    </main>
    );
  }
  return (
  <main>
    <PostFrom />
    <Memes memes={memes} />
  </main>)
;
}

export default AllMemes