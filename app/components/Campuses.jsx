import React, { Component } from 'react';
import store, {getCampusesAction} from "../store";
import axios from "axios";
import {Link} from 'react-router-dom';

export default class Campuses extends Component {
    constructor() {
      super();
      this.state = store.getState();
    }

    componentDidMount(){
      this.unsubscribe = store.subscribe( ()=> this.setState(store.getState()));
      axios.get("/api/campuses")
        .then(result => result.data)
        .then( campuses => {
            const action = getCampusesAction(campuses);
            store.dispatch(action);
        })
    }

    componentWillUnmount(){
      this.unsubscribe();
    }

    render(){
      const {campuses} = this.state;
      return(
          <div className="row col-xs-8">
            <h3> All Campuses </h3>
            {
              campuses.length && campuses.map( campus=> {
                return (
                    <div className="col-xs-6 row-eq-height well" key={campus.id}>
                        <div className="panel-heading">
                            <h3 className="panel-title">{campus.name}</h3>
                        </div>
                        <div className="panel-body">
                            {campus.name} info: ...
                            <Link to={`/campuses/${campus.id}/students`}> students </Link>
                        </div>
                    </div>
                  )
              })
            }
          </div>
        )
    }
}