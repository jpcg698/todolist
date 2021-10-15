import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { List} from "./features/counter/List"
import './App.css';
import styled from "styled-components";

const StyledDiv = styled.div`
  align-items: center;
  justify-content: center;
  margin:auto;
  width:60vw;
`

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <StyledDiv>
        <List />
      </StyledDiv>
    </div>
  );
}

export default App;
