import React from 'react';
import Meme from './Meme';
const Memes = ({memes}) => {
  return <section>
    <div className="title">
      <h2>our memes</h2>
      <div className="underline"></div>
    </div>
    <div>
      {memes.map((meme) =>{
        return <Meme key={meme.id} {...meme}> </Meme>
      }
      )}
    </div>
  </section>;
};

export default Memes;
