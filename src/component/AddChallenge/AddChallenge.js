import React,{ useState,useRef } from 'react';
import { useDispatch } from 'react-redux';

import './AddChallenge.css';
import '../../index.css';
import add from '../../assets/add.svg';
import useToast from '../../hooks/useToast';
import  usePrivateAxios from '../../hooks//usePrivateAxios.js';
import { addNewChallenge } from '../../features/challengesSlice.js';

function AddChallenge() {

  const [tags, setTags] = useState([]);
  const createToast = useToast();
  const privateAxios = usePrivateAxios();
  const dispatch = useDispatch();
  const titleRef = useRef();
  const descriptionRef = useRef();
  

  const addTags = ()=>{
    const tagInput = document.querySelector('#add-challenge__tags > input');
    const text = tagInput.value.trim().toLowerCase();
    const newTags = [...tags,text];
    tagInput.value = '';
    if( text==='' ){
      createToast({ text : "tag can't be empty" });
      return;
    }
    if( tags.includes(text) ){
      createToast({ text : 'tag already exists' });
      return;
    }
    if( tags.length===5 ){
      createToast({ text : 'only 5 tags can be added' });
      return;
    }
    setTags(newTags);
  }

  const removeTag = (text)=>{
    setTags(tags.filter(elem=>elem!==text));
  }

  const onSubmitHandler = (event)=>{
    event.preventDefault();
    const title = titleRef.current.value.trim().toLowerCase();
    const description = descriptionRef.current.value.trim().toLowerCase();
    if( title==='' || description==='' ){
      createToast({ text : "title and description can't be empty" });
      return;
    }
    const toast = createToast({ text : 'adding new challenge', type : 'promise-pending' });
    dispatch( addNewChallenge({ privateAxios,title,tags,description,toast }) );
  }

  const clearInput = (event)=>{
    event.preventDefault();
    setTags([]);
    titleRef.current.value = '';
    descriptionRef.current.value = '';
  }

  return (
    <form id='add-challenge' className='fancyborder box'>
      <h2 className='head2'>Add New Challenge</h2>
      <input ref={titleRef} type="text" placeholder='Title' className='input' />
      <textarea ref={descriptionRef}  className='input' cols="30" rows="5" placeholder='Description'></textarea>

      <div id='add-challenge__tags'>
        <input type="text" className='input' placeholder='Tags' />
        
        <div id='add-challenge__tag'>
          <img onClick={addTags} src={add} alt="add" className='svg-img' />
          {
            tags.length === 0 ? 
              <p>No tags added </p>
              : 
              
              tags.map(elem=>{
                return <span onClick={()=>removeTag(elem)}
                 key={elem} className='span'>#{elem}</span>
              })
              
          }
        </div>
      </div>

      <div>
        <button onClick={onSubmitHandler} className='btn' color='green'>Submit</button>
        <button onClick={clearInput} className='btn' color='red'>Clear</button>
      </div>
    </form>
  )
}

export default AddChallenge