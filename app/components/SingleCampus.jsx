import React, { Component } from 'react';
import store, {getStudentsOfSingleCampusAction} from "../store";
import axios from "axios";

export default class SingleCampus extends Component {
    constructor() {
      super();
      this.state = store.getState();
    }

    componentDidMount(){
      this.unsubscribe = store.subscribe( ()=> this.setState(store.getState()));
      const campusId = this.props.match.params.campusId;
      axios.get(`/api/campuses/${campusId}/students`)
        .then(result => result.data)
        .then( campus => {
            const action = getStudentsOfSingleCampusAction(campus)
            store.dispatch(action);
        })
    }

    componentWillUnmount(){
      this.unsubscribe();
    }

    render(){
      const {studentsOfSingleCampus} = this.state;
      const {campus} = this.state;
      return(
        <div className="row col-xs-4">
          <legend> All students  of {campus}</legend>
          <ol>
            {
              studentsOfSingleCampus.length && studentsOfSingleCampus.map( student=> {
                return (
                  <li key={student.id}> {student.name}<span className="left"></span></li>
                  )
              })
            }
          </ol>
        </div>
      )
    }
}