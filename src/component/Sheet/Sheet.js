import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import filter from '../../assets/filter.svg';
import trash from '../../assets/trash.svg';
import edit from '../../assets/edit.svg';
// import copy from '../../assets/edit.svg';
import './Sheet.css'
import '../../index.css';

function Sheet() {

    const sheetInfo = {
        title: 'very imp question',
        total: 120,
        solved: 20
    }

    const [question, setQuestion] = useState([
        {
            title: 'question 1',
            hint: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, earum!",
            solved: true,
            solution: {
                language: 'javascript',
                code: 'let a = 7;\nconsole.log(a)\n'
            },
            tags: ['hard', 'binary_search', 'array'],
            link: '#'
        }
    ])

    return (
        <>
            <div id='question'>
                <h1 className='head1'>{sheetInfo.title}</h1>
                {/* <div id='question__searchbox'>
                    <input type="text" id='question__search' className='input' placeholder='Search Here....' />
                    <img src={filter} alt="filter" className='svg-img' />
                </div> */}
                {/* <div id='queston__info'>
                    <div id='question__bar'>
                        <div id='question__'></div>
                    </div>
                    <p>{sheetInfo.solved}/{sheetInfo.total}</p>
                </div> */}
                
                {
                    question.map(s => {
                        return (
                            <div className='question__sheet box para fancyborder' key={s.id}>
                                <h3 className='head3'>{s.title}</h3>
                                <p className='para'>{s.hint}</p>
                                <p>Here is link to the question <NavLink to={s.link} className='span'>Link</NavLink></p>
                                <NavLink to={s.link} className='btn question__link' color='green'>Solution</NavLink>
                                <div className='question__tags'>
                                    {
                                        s.tags.map(tag => <span className='span' key={tag}>#{tag}</span>)
                                    }
                                </div>
                                <div id='challenges__img'>
                                    <img src={edit} alt="edit" className='svg-img' />
                                    {/* <img src={copy} alt="copy" className='svg-img'  /> */}
                                    <img src={trash} alt="delete" className='svg-img' />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Sheet