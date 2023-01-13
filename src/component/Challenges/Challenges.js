import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import usePrivateAxios from '../../hooks/usePrivateAxios';

import './Challenges.css';
import '../../index.css';
import filter from '../../assets/filter.svg';
import trash from '../../assets/trash.svg';
import edit from '../../assets/edit.svg';
import copy from '../../assets/copy.svg';


function Challenges() {

  const privateAxios = usePrivateAxios();

  const [challenges, setChallenges] = useState([]);

  const fetchChallenges = async ({ privateAxios,controller }) => {
    const res = await privateAxios.get('/challenges',{
      signal : controller.signal
    });
    console.log(res.data);
    setChallenges(res.data.challenges);

  }

  useEffect(() => {
    const controller = new AbortController();
    fetchChallenges({ privateAxios,controller });
    return () => {
      controller.abort();
    }
  }, [])

  return (
    <>
      <div id='challenges'>
        <h1 className='head1'>Challenges</h1>
        <div id='challenges__searchbox'>
          <input type="text" id='challenges__search' className='input' placeholder='Search Here....' />
          <img src={filter} alt="filter" className='svg-img' />
        </div>
        {
          challenges.length === 0 ? 
            (<div>No Challenges</div>)
            : challenges.map(s=>{
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
      </div>
    </>
  )
}

export default Challenges