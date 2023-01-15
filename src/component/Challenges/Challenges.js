import React, { useEffect, useState } from 'react'
import { NavLink,Router,useNavigate } from 'react-router-dom';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import { useSelector,useDispatch } from 'react-redux';
import { getAllChallenges } from '../../features/challengesSlice';
import useToast from '../../hooks/useToast';

import './Challenges.css';
import '../../index.css';
import filter from '../../assets/filter.svg';
import trash from '../../assets/trash.svg';
import edit from '../../assets/edit.svg';
import add from '../../assets/add.svg';


function Challenges() {

  const privateAxios = usePrivateAxios();
  const createToast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const challenges = useSelector(state=>state.challenge.challenges);
  const [myChallenges, setMyChallenges] = useState(challenges);

  const searchChallenges = (event)=>{
    const text = event.target.value.trim().toLowerCase();
    if( text==='' )
      setMyChallenges(challenges);
    else{
      setMyChallenges(
        myChallenges.filter(elem=>{
          const title = elem.title.trim().toLowerCase();
          const tags = elem.tags;
          if( elem.title.includes(text) )
            return true;

          for( let i = 0; i<tags.length; i++ ){
            if( tags[0].trim().includes(text) )
              return true;
          }
        })
      )
    }
  }

  useEffect(()=>{
    setMyChallenges(challenges);
  },[challenges])
  
  useEffect(() => {
    if( challenges.length>0 )
      return;
    const controller = new AbortController();
    getAllChallenges({ privateAxios,controller });
    const toast = createToast({ type : 'promise-pending',text : 'fetching challenges' });
    dispatch(getAllChallenges({ privateAxios,controller,toast }));
    return () => {
      controller.abort();
    }
  }, [])

  return (
    <>
      <div id='challenges'>
        <h1 className='head1'>Challenges</h1>
        <div id='challenges__searchbox'>
          <input onChange={searchChallenges} type="text" id='challenges__search' className='input' placeholder='Search Here....' />
          {/* <img src={filter} alt="filter" className='svg-img' /> */}
        </div>
        {
          myChallenges.length === 0 ? 
            (<div>No Challenges</div>)
            : myChallenges.map(s=>{
              return <div className='challenges__sheet box para fancyborder' key={s.id}>
          <h3 className='head3'>{s.title}</h3>
          <p className='para'>{s.description}</p>
          <NavLink to={`/sheet/${s.id}`} className='btn challenges__link' color='green'>Solve</NavLink>
          <div className='challenges__tags'>
            {
              s.tags.map(tag => <span className='span' key={tag}>#{tag}</span>)
            }
          </div>
          <div className='challenges__bar'>
            <div className='challenges__progress'></div>
          </div>
          <p className='challenges__info span'>{s.solved}/{s.total}</p>

          <div id='challenges__img'>
            <img src={edit} alt="edit" className='svg-img' />
            {/* <img src={copy} alt="copy" className='svg-img'  /> */}
            <img src={trash} alt="delete" className='svg-img' />
          </div>
        </div>
          })
        }
      <img onClick={()=>navigate('/challenges/add')}
       src={add} alt="" className='svg-img' id='add-challenges' />
      </div>
    </>
  )
}

export default Challenges