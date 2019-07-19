import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import Layout from "../src/Routes/Layout";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signup" component={Signup} />
        <Layout />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
