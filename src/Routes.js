import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import List from "./features/List"
import Login from "./features/LogIn"


export default function Routes() {

  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Switch location={background || location}>
        <Route exact path="/" component={List} />
        <Route path="/login" componen={Login}/>
      </Switch>
      {background && <Route path="/login" component={Login} />}
    </>
  );
}