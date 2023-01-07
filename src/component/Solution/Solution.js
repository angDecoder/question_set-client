import React from 'react';
import Highlight from 'react-highlight';

import './atom.css';
import './Solution.css';
import edit from '../../assets/edit.svg';
import copy from '../../assets/copy.svg';

function Solution() {
    const questionInfo = {
        id : 'iejrj',
        title : 'important question',
        solution : {
            language : 'javascript',
            code : `let a = 7;\nconsole.log(a);`
        }
    }
  return (
    <div id='solution'>
        <h2 id='solution__head' className='head2'>{questionInfo.title}</h2>
        <div id='code' className='box fancyborder para'>
          <Highlight id='highlight' className={questionInfo.solution?.language || 'javascript'}>
            {
              questionInfo.solution?.code || '// no solution provided'
            }
          </Highlight>
          <div id='code__img'>
            <img src={edit} alt="edit" className='svg-img' />
            <img src={copy} alt="copy" className='svg-img' />
          </div>
        </div>
    </div>
  )
}

export default Solution