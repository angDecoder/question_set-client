import React from 'react';
import useToast from '../../hooks/useToast';

import '../../Toast.css';
import '../../index.css';

function Home(){
  const createToast = useToast();
  const getToast = ()=>{
    let toast = createToast({type : 'promise-rejected',autoClose : 10000});
    
  }

  return (  
    <>
      <button onClick={getToast} className='btn' color='green'>Click</button>
    
    </>
  )
}

export default Home