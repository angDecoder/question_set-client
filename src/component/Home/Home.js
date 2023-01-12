import React from 'react';
import useToast from '../../hooks/useToast';

import '../../Toast.css';
import '../../index.css';

function Home(){
  const createToast = useToast();
  const getToast = ()=>{
    let toast = createToast({type : 'promise-pending',autoClose : 10000});
    setTimeout(() => {
      toast.update({ type : 'promise-rejected' });
    }, 2000);
  }

  return (  
    <>
      <button onClick={getToast} className='btn' color='green'>Click</button>
    
    </>
  )
}

export default Home