import React, { Component } from 'react';
import store, {getStudentsAction} from "../store";
import axios from "axios";
import {Link} from 'react-router-dom';

export default class Students extends Component {
    constructor() {
      super();
      this.state = store.getState();
      this.onDelete = this.onDelete.bind(this);

    }

    componentDidMount(){
      this.unsubscribe = store.subscribe( ()=> this.setState(store.getState()));
      axios.get("/api/students")
        .then(result => result.data)
        .then( students=> {
            const action = getStudentsAction(students);
            store.dispatch(action)
        })

    }

    onDelete(e){
      const studentId = e.target.value;
      axios.delete(`/api/students/${studentId}`)
        .then( result=> result.data)
        .then( students=> {
             const action = getStudentsAction(students);
             store.dispatch(action);
        })
    }

    componentWillUnmount(){
      this.unsubscribe();
    }

    render(){
      const {students} = this.state;
      const {onDelete} = this;
      return(
        <div className="col-xs-8">
          <h3> All students </h3>
          <div>
          <Link className="btn btn-primary" to={"/students/add-new-student"}>
            <span className="glyphicon glyphicon-plus pull-left"></span>
          </Link>
          </div>
          <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Campus</th>
                  </tr>
                </thead>
                <tbody>
            { students.map( student=> {
                return (
                    <tr key={student.id}> 
                      <th> {student.id} </th>
                      <th> {student.name}  </th>
                      { student.campus && 
                      <th> {student.campus.name} </th>
                      }
                      <th> <button onClick={onDelete} value={student.id} className="btn btn-danger">Delete </button> </th>
                    </tr>
                  )
              })
            }
              </tbody>
          </table>
        </div>
      )
    }
}
