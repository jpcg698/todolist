import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    add,
    remove,
    selectList
} from './listSlice';

import {
  selectLogin,
  selectUsername,
  logout
} from './loginSlice';

import styles from './List.module.css';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik"
import styled from "styled-components"
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {Link,useLocation} from "react-router-dom"


const ListElement = styled.li`
  display: grid;
  column-gap: 1rem;
  row-gap: 1rem;
  max-height:3em;
  margin-bottom:1em;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
`;



const StyledDiv = styled.div`
  align-items: center;
  justify-content: center;
  margin:auto;
  width:40vw;
`

const RenderList = ({list,dispatch})=>{
    console.log(list)
    if(list.length>0){
        return(
            <>
                <h2>
                        Todo
                </h2>
                <h2>
                        Complete by
                </h2>
                <div>
                </div>

            {list.map(({text,date} ,i)=>(
                <>
                <div key={i + "text"} style={{margin:"auto"}} onClick={(e)=>e.target.classList.toggle("crossed-line")}>
                        {text}
                </div>
                <div key={i + "date"} style={{margin:"auto"}} onClick={(e)=>e.target.classList.toggle("crossed-line")}>
                        {date}
                </div>
                <Button key={i + "button"} style={{margin:"auto"}} onClick={()=>{
                    dispatch(remove(i))}}>
                        Remove
                </Button>
                </>
                ))}
            </>
        )
    }else{
        return <div></div>
    }
}

const validationSchema = yup.object({
    text: yup
      .string('Enter ToDo')
      .min(1, 'Enter Some text')
      .required('Enter Some text'),
    date: yup
        .string('Enter a date')
        .required('Select a date to complete by')
  });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));


export function List() {

    const [date, setDate] = useState(new Date());
    let location = useLocation()
    let logged = useSelector(selectLogin)
    let username = useSelector(selectUsername)
    const formik = useFormik({
        initialValues: {
            text: '',
            date: new Date().toDateString(),
          },
        validationSchema: validationSchema,
        onSubmit:async (values,actions) => {
            if(values.text.trim()){
                if(document.activeElement.dataset.flag === "async"){
                    await sleep(500); 
                    dispatch(add(values))
                }else{
                    dispatch(add(values))
                }
            }
            actions.resetForm()
          },
    });

  const list = useSelector(selectList);
  const dispatch = useDispatch();
  return (
    <StyledDiv>
       {logged &&

       <>
       <h2>
         Hello {username}
       </h2>
       <Button variant="contained"
        className={styles.button}
        style={{marginBottom:"1em"}}
        aria-label="Login"
        onClick={(e)=>dispatch(logout())}
        >
                    Log out
        </Button>
        <form onSubmit={formik.handleSubmit}>

            <TextField
            id="text"
            name="text"
            label="Add todo Item"
            value={formik.values.text}
            onChange={formik.handleChange}
            error={formik.touched.text && Boolean(formik.errors.text)}
            helperText={formik.touched.text && formik.errors.text}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>

            <DesktopDatePicker
            renderInput={(params) => <TextField {...params} />}
            inputFormat="MM/dd/yyyy"
            id='date'
            name='date'
            label='Complete by'
            value={formik.values.date}
            onChange={(value) => formik.setFieldValue("date", value.toDateString())}
            error={formik.touched.date && Boolean(formik.errors.date)}
            helperText={formik.touched.date && formik.errors.date}
            />
            </LocalizationProvider>
        <div className={styles.row}>
            <Button variant="contained" type="submit"
            data-flag="normal"
            className={styles.button}
            aria-label="Add to ToDo"
            >
            Add to List
            </Button>
            <Button variant="contained" type="submit"
            data-flag="async"
            className={styles.asyncButton}
            >
            Add Async
            </Button>
        </div>
      </form>
      <ul>
          <ListElement>
            <RenderList list={list} dispatch={dispatch} date={date} setDate={setDate}/>
          </ListElement>
      </ul>
      </>
        }
        {!logged &&

        <Button variant="contained"
        className={styles.button}
        aria-label="Login"
        >
        <Link to={{ pathname: "/login", state: { background: location } }}>
                    Log in
                </Link>
        </Button>
        
        }
    </StyledDiv>
  );
}

export default List