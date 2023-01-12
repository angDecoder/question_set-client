import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { autoLoginUser } from '../../features/userSlice';

import '../../Toast.css';
import '../../index.css';

function Home(){
  const dispatch = useDispatch();
  const loggedIn = useSelector(state=>state.user.loggedIn);
  const refreshToken = localStorage.getItem('questionset_jwt');

  useEffect(()=>{
    if( !loggedIn && refreshToken ){
      dispatch(autoLoginUser({ refreshToken }));
    }
  },[refreshToken]);

  return (  
    <>
      {/* <button onClick={getToast} className='btn' color='green'>Click</button> */}
    
    </>
  )
}

export default Home