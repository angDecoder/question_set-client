import React from 'react';
import useToast from '../../hooks/useToast';

// import './Toast.css';
function Toast() {
    const createToast = useToast({canClose : true,text: "mess 2",position : 'top-right'});
    let toast;
    let getToast = ()=>{
        toast = createToast();
    }
  return (
    <div>
        <button onClick={getToast} className='btn' color='green'>click Me</button>
    </div>
  )
}

export default Toast