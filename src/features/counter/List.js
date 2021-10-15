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
import styled from "styled-components"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ListElement = styled.div`
  display: grid;
  column-gap: 1rem;
  row-gap: 3rem;
  max-height:3em;
  margin-bottom:1em;
  grid-template-columns: repeat(3, minmax(300px, 1fr));
`;


const RenderList = ({list,dispatch,date,setDate})=>{
    if(list){
        return(
            list.map((element,i)=>(
                <ListElement key={i} id={i}>
                <div style={{margin:"auto"}} onClick={(e)=>e.target.classList.toggle("crossed-line")}>
                        {element}
                </div>
                <Button style={{margin:"auto"}} onClick={()=>{
                    dispatch(remove(i))}}>
                        Remove
                </Button>
                <label>
                    Date to finish
                <DatePicker selected={date} onChange={date => setDate(date)} style={{margin:"auto"}}/>
                </label>
                </ListElement>
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

    const [date, setDate] = useState(new Date());

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
          <RenderList list={list} dispatch={dispatch} date={date} setDate={setDate}/>
      </ul>
    </div>
  );
}
