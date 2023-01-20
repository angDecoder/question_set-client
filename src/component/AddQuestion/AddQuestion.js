import React,{useState} from 'react';
import useToast from '../../hooks/useToast';
import { useLocation,Navigate } from 'react-router-dom';
import { addNewQuestion } from '../../features/challengesSlice';
import { useDispatch } from 'react-redux';
import usePrivateAxios from '../../hooks//usePrivateAxios.js';

import '../../index.css'
import './AddQuestion.css';
import add from '../../assets/add.svg';

function AddQuestion() {
    const dispatch = useDispatch();
    const privateAxios = usePrivateAxios();
    const createToast = useToast();
    const [tags, setTags] = useState([]);
    const location = useLocation();
    const challenge_id = location?.state?.challenge_id || "";
    // console.log( location );
    if( challenge_id==='' ){
        createToast({ text : 'no quetion id provided' });
        return <Navigate to={'/challenges'} />
    }
    const addTags = ()=>{
        const elem = document.querySelector('input[placeholder="Tag"');
        const text = elem.value.trim().toLowerCase();
        elem.value = '';
        if( tags.includes(text) ){
            createToast({ text : 'tag already exists' });
            return;
        }
        if( text==='' ){
            createToast({ text : "tag can't be empty" });
            return;
        }
        setTags([...tags,text]);
    }

    const removeTag = (text)=>{
        // const text = event.target.innerText;
        setTags(
            tags.filter(elem=>elem!==text)
        )
        console.log(text);
    }


    const onSubmitHandler = (event)=>{
      event.preventDefault();
      const title = document.querySelector('input[placeholder="Title"]').value.trim();
      const description = document.querySelector('textarea').value.trim();
      const link = document.querySelector('input[placeholder="Link"]').value.trim();
      if( title==='' ){
        createToast({ text : "title can't be empty" });
        return;
      }
      if( description==='' ){
        createToast({ text : "description can't be empty" });
        return;
      }

      if( link==='' ){
        createToast({ text : "link can't be empty" });
        return;
      }

      const toast = createToast({ type : "promise-pending", text : "adding new question" });
      dispatch( addNewQuestion({ title,description,link,tags,privateAxios,toast,id : challenge_id }) );

    }

    const clearInput = (event)=>{
      event.preventDefault();
      document.querySelector('input[placeholder="Title"]').value = '';
      document.querySelector('textarea').value = '';
      document.querySelector('input[placeholder="Link"]').value = '';
      setTags([]);
      createToast({ text : 'input cleared' });
    }

  return (
    <form id='add-question' className='fancyborder box'>
        <h2 className="head2">Add Questions</h2>
        <input type="text" placeholder='Title' className='input'/>
        <textarea placeholder='Description' className='input' cols="30" rows="5"></textarea>
        <input type="text" className="input" placeholder='Link' />
        <input type="text" className='input' placeholder='Tag' />
        <div id='add-questions__tags'>
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
        <div>
            <button onClick={onSubmitHandler} className='btn' color='green'>Submit</button>
            <button onClick={clearInput} className='btn' color='red'>Clear</button>
        </div>
    </form>
  )
}

export default AddQuestion