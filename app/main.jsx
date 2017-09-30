'use strict'
import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux'
import {HashRouter, Route} from 'react-router-dom';

import store from './store';
import Nav from  './components/Nav';
import Campuses from "./components/Campuses";
import Students from "./components/Students";
import SingleCampus from "./components/SingleCampus";
import AddStudent from "./components/AddStudent";

ReactDOM.render (
  <HashRouter>
        <div>
          <Nav />
          <Route exact path="/campuses" component={Campuses} />
          <Route exact path="/students" component={Students} />
          <Route path="/campuses/:campusId/students" component={SingleCampus} />
          <Route path="/students/add-new-student" component={AddStudent} />
        </div>
  </HashRouter>,
  document.getElementById('main')
);



