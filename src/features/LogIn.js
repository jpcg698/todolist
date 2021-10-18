import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import {
    login,
    reset,
    selectError,
    selectLogin
} from './loginSlice';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik"
import * as yup from 'yup';

const ModalWrapper = styled.div`
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;


const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 1% auto;
  padding: 2em;
  border: 1px solid #888;
  width: 90vw;
`;

function LogInModal() {
  // console.log(`Modal loaded with video ${title}`)
  const dispatch = useDispatch();
  const history = useHistory();
  const logged = useSelector(selectLogin)
  const errorMessage = useSelector(selectError)


  const goBack = (event) => {
    dispatch(reset())
    event.stopPropagation();
    history.goBack();
  };

  const validationSchema = yup.object({
    username: yup
      .string("Enter your username")
      .required('Enter your username'),
    password: yup
        .string('Enter your password')
        .required('Enter your password')
  });

  

  useEffect(()=>{
    if(logged === true){
      dispatch(reset())
      history.goBack()
    }
  },[logged,history])

  const formik = useFormik({
    initialValues: {
        username: '',
        password: '',
      },
      validationSchema:validationSchema,
    onSubmit:(values,actions) => {
        dispatch(login(values))
      },
});



  return (
    <ModalWrapper>
      <ModalContent>
        <button className="close" onClick={goBack} style={{ float: "right" }}>
          X
        </button>
        <h1>Login</h1>
        <form
          onSubmit={formik.handleSubmit}
        >
          <div className="form-group">
              <TextField
        
                type="text"
                id="username"
                label="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
              />
              <TextField
                
                type="password"
                id="password"
                label="password"
                value={formik.values.password}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                onChange={formik.handleChange}
              />
              <div>{errorMessage}</div>
          </div>
          <div className="actions">
            <Button type="button" onClick={goBack}>
              Cancel
            </Button>
            <Button type="submit">
              Login
            </Button>
          </div>
        </form>
      </ModalContent>
    </ModalWrapper>
  );
}

export default LogInModal;