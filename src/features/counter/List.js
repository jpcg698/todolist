import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    add,
    remove,
    addAsync,
    selectList
} from './listSlice';
import styles from './Counter.module.css';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik"

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

const validationSchema = yup.object({
    text: yup
      .string('Enter ToDo')
      .min(1, 'Enter Some text')
      .required('Enter Some text'),
  });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));


export function List() {
    const formik = useFormik({
        initialValues: {
            text: '',
          },
        validationSchema: validationSchema,
        onSubmit:async (values) => {
            if(values.text.trim()){
                if(document.activeElement.dataset.flag === "async"){
                    await sleep(500); 
                    dispatch(addAsync(values.text))
                }else{
                    dispatch(add(values.text))
                }
            }
            values.text=""
          },
    });


  const list = useSelector(selectList);
  const dispatch = useDispatch();
  return (
    <div>
       {/* // {({ isSubmitting }) => ( */}
        <form onSubmit={formik.handleSubmit}>
            <TextField
            fullWidth
            id="text"
            name="text"
            label="Add todo Item"
            value={formik.values.text}
            onChange={formik.handleChange}
            error={formik.touched.text && Boolean(formik.errors.text)}
            helperText={formik.touched.text && formik.errors.text}
            />
        <div className={styles.row}>
            <Button variant="contained" fullWidth type="submit"
            data-flag="normal"
            className={styles.button}
            aria-label="Add to ToDo"
            >
            Add to List
            </Button>
        </div>
        <div className={styles.row}>
            <Button variant="contained" fullWidth type="submit"
            data-flag="async"
            className={styles.asyncButton}
            >
            Add Async
            </Button>
            
        </div>
      </form>
        {/* /* )} */}
      <ul>
          <RenderList list={list} dispatch={dispatch}/>
      </ul>

    </div>
  );
}
