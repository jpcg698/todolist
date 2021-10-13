import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    add,
    remove,
    addAsync,
    selectList
} from './listSlice';
import styles from './Counter.module.css';


const RenderList = ({list,dispatch})=>{
    if(list){
        return(
            list.map((element,i)=>(
                <li key={i} id={i} onClick={()=>{
                    dispatch(remove(i))}}>
                        {element}
                </li>
            ))
        )
    }else{
        return <li></li>
    }
}


export function List() {
  const list = useSelector(selectList);
  const dispatch = useDispatch();
  const [text, setText] = useState('Add Text Here');
    console.log(list)
  return (
    <div>
        <input type="text" value={text} onChange={(e)=>setText(e.target.value)}/>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Add to ToDo"
          onClick={() => {
            dispatch(add(text))
            setText("")
            }}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <button
          className={styles.asyncButton}
          onClick={() => {
            dispatch(addAsync(text))
            setText("")
            }}
        >
          Add Async
        </button>
      </div>
      <ul>
          <RenderList list={list} dispatch={dispatch}/>
      </ul>

    </div>
  );
}
