import React,{ useState } from 'react'
import { NavLink } from 'react-router-dom';

import './Challenges.css';
import '../../index.css';
import filter from '../../assets/filter.svg';
import trash from '../../assets/trash.svg';
import edit from '../../assets/edit.svg';
import copy from '../../assets/copy.svg';


function Challenges() {

    const [challenges, setChallenges] = useState([
        {
          id : ';djfa',
          title : 'challenge 1 akjdlkj df;kls ;kdnf;kj adnf kkj ;k jdkjfd;kjf dk f;dkj  .kf;j ;kdf;kdj ;kdhf;ksdj ',
          owner : 'angshu',
          description : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas explicabo quas, voluptatibus recusandae corporis sunt inventore magni corrupti harum, cupiditate iure quia quod, ipsum adipisci. Dolorum temporibus sequi ab voluptates.',
          total : 120,
          solved : 20,
          tags : ['vvi','binary_search','hard']
        },
        {
          id : ';djfaja',
          title : 'chae 1',
          owner : 'rahul',
          total : 120,
          solved : 20,
          tags : ['vvi','array','basic']
        },
        {
          id : ';djfkdfa',
          title : 'question binary',
          owner : 'rahul',
          total : 120,
          solved : 20,
          tags : ['vvi','array','basic']
        },
        {
          id : ';djkajfa',
          title : 'question array',
          owner : 'rahul',
          total : 120,
          solved : 20,
          tags : ['vvi','array','basic']
        },
    ]);
    
  return (
    <>
      <div id='challenges'>
        <h1 className='head1'>Challenges</h1>
        <div id='challenges__searchbox'>
          <input type="text" id='challenges__search' className='input'  placeholder='Search Here....' />
          <img src={filter} alt="filter" className='svg-img' />
        </div>
        {
          challenges.map(s=>{
            return <div className='challenges__sheet box para fancyborder' key={s.id}>
              <h3 className='head3'>{s.title}</h3>
              <p className='para'>{s.description}</p>
              <NavLink to={`/sheet/${s.id}`} className='btn challenges__link' color='green'>Solve</NavLink>
              <div className='challenges__tags'>
                {
                  s.tags.map(tag=><span className='span' key={tag}>#{tag}</span>)
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