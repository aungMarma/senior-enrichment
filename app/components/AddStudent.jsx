import React, { Component } from 'react';
import store, {enteringStudentName, addingStudent, selectedCampusAction} from "../store";
import axios from "axios";


export default class AddStudent extends Component{
     constructor(props){
        super(props);
        this.state = store.getState();
        this.onNameInput = this.onNameInput.bind(this);
        this.onCampusSelect = this.onCampusSelect.bind(this);
        this.onSubmitted = this.onSubmitted.bind(this);
      }

    componentDidMount(){
      this.unsubscribe = store.subscribe( ()=> this.setState(store.getState()));
    }

    componentWillUnmount(){
      this.unsubscribe();
    }

    onNameInput(e){
        const action = enteringStudentName(e.target.value)
        store.dispatch(action);
    }

    onCampusSelect(e){
        const action = selectedCampusAction(e.target.value);
        store.dispatch(action);
        
    }

    onSubmitted(e){
        e.preventDefault();
        const {name, selectedCampus} = this.state;
         axios.post("/api/students", {name, selectedCampus})
        .then(result => result.data)
        .then( createdStudent => {
            const action = addingStudent(createdStudent)
            store.dispatch(action);
        });
    }

    render() {
        const {campuses, name} = this.state;
        const {onSubmitted, onCampusSelect, onNameInput} = this;
        return (
            <div>
            <h3> Add new student </h3>
                <form onSubmit= {onSubmitted}>
                    <div className="form-group">
                        <label>Student name: </label>
                        <input onChange = {onNameInput} value = {name} type="text" id="recipient-field" name="recipient" />
                    </div>
                    <div className="form-group">
                        <label> Select Campus </label>
                        <select onChange = {onCampusSelect}>
                        {campuses.length && campuses.map( campus=> {
                            return <option key={campus.id}>{campus.name}</option>
                        })}
                        </select>
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>
        );
    }
}