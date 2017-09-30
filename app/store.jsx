import { createStore, applyMiddleware } from 'redux';
// import rootReducer from './reducers';
// import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
// import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk

const GET_STUDENTS = "GET_STUDENTS";
const GET_CAMPUSES = "GET_CAMPUSES";
const GET_STUDENTS_SINGLE_CAMPUS = "GET_STUDENTS_SINGLE_CAMPUS";
const ENTER_STUDENT_NAME = "ENTER_STUDENT_NAME";
const ADD_STUDENT = "ADD_STUDENT";
const SELECT_CAMPUS = "SELECT_CAMPUS";

export const getStudentsAction = (students)=>{
    return {
        type: GET_STUDENTS,
        students
    }
}

export const getCampusesAction = (campuses)=>{
    return {
        type: GET_CAMPUSES,
        campuses
    }
}

export const getStudentsOfSingleCampusAction = (campus)=>{
    return {
        type: GET_STUDENTS_SINGLE_CAMPUS,
        students : campus.students,
        campus : campus.name
    }
}

export const enteringStudentName = (name)=>{
    return {
        type: ENTER_STUDENT_NAME,
        name
    }
}

export const addingStudent = (student)=>{
    return {
        type: ADD_STUDENT,
        student
    }
}

export const selectedCampusAction = (selectedCampus)=>{
    return {
        type: SELECT_CAMPUS,
        selectedCampus
    }
}

const initialState = {
    campuses : [],
    students: [],
    studentsOfSingleCampus : [],
    campus : '',
    name : '',
    selectedCampus : ''
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case ENTER_STUDENT_NAME:
            return Object.assign({}, state, {name : action.name});
        case ADD_STUDENT:
            return Object.assign({}, state, {name : '', students : [...state.students, action.student]});
        case SELECT_CAMPUS:
            return Object.assign({}, state, {selectedCampus : action.selectedCampus});
        case GET_STUDENTS:
            return Object.assign( {}, state, {students : action.students});
        case GET_CAMPUSES:
            return Object.assign( {}, state, {campuses : action.campuses});
        case GET_STUDENTS_SINGLE_CAMPUS:
            return Object.assign( {}, state, {studentsOfSingleCampus : action.students, campus: action.campus});
        default : 
            return state;
    }
}

export default createStore(reducer);

// export default createStore(rootReducer, applyMiddleware(thunkMiddleware, createLogger()))
