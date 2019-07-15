import React from 'react';
import Login from './Login';
import Signup from './Signup';
import Layout from './Layout';
import Main from './Main';
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';
import {Switch} from 'react-router-dom';


function App() {
  return (
  <BrowserRouter>
    <div>
      <Switch>
      <Route path="/" exact component= {Login}/>
      <Route path="/signup" component= {Signup}/>
      <Layout/>
      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
