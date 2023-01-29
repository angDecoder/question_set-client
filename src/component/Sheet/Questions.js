import React, { useEffect, useState } from 'react';
import { NavLink,useParams,useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
// import { getAllQuestionApi } from '../../api/Question';
import { getQuestion } from '../../features/questionSlice';
import usePrivateAxios from '../../hooks/usePrivateAxios';

import trash from '../../assets/trash.svg';
import edit from '../../assets/edit.svg';
import add from '../../assets/add.svg';
import './Questions.css'
import '../../index.css';

function Questions() {

    const {id} = useParams();
    const privateAxios = usePrivateAxios();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(id);
    const sheetInfo = useSelector( state=>{
        return state.challenge.challenges.filter( elem=>elem.id===id )[0];
    } );

    const question = useSelector(state=>state.question.questions);
    useEffect(()=>{
        dispatch(getQuestion({ privateAxios,id }));
    },[]);

    return (
        <>
            <div id='question'>
                <h1 className='head1'>{sheetInfo.title}</h1>
                <div id='question__searchbox'>
                    <input type="text" id='question__search' className='input' placeholder='Search Here....' />
                    {/* <img src={filter} alt="filter" className='svg-img' /> */}
                </div>
                <div id='queston__info'>
                    <div id='question__bar'>
                        <div id='question__'></div>
                    </div>
                    <p>{sheetInfo.solved}/{sheetInfo.total}</p>
                </div>
                
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
                <img src={add} alt="add" className='svg-img' id='questions__add' onClick={()=>navigate('/challenges/question/add',{ state : { challenge_id : id } })}  />
            </div>
        </>
    )
}

export default Questions