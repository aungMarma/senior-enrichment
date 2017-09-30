'use strict'
const api = require('express').Router()
const db = require('../db')

const Student = require("../db/models/students").Student;
const Campus = require("../db/models/campuses").Campus;

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!

api.get('/hello', (req, res) => res.send({hello: 'world'}))

api.get("/students", (req,res, next)=> {
	Student.findAll({
			include : [{model : Campus}]
		})
		.then( result=> {
			return result;
		})
		.then(students=> res.send(students));
})

api.get("/students/:studentId", (req,res, next)=> {
	Student.findOne({
		    where : {
				id : req.params.studentId
			},
			include : [{model : Campus}]
		})
		.then( result=> {
			return result;
		})
		.then(students=> res.send(students));
})

api.post("/students", (req, res, next)=> {
	console.log(req.body);
	const {name, selectedCampus} = req.body;
	Student.create({name})
		.then( createdStudent=> {
			if(selectedCampus){
				Campus.findOne({
					where: {
						name : selectedCampus
					}
				})
				.then( cam=> {
					return cam.addStudent(createdStudent)
				})
				.then( ()=> {
					return createdStudent;
				})
			}
			return createdStudent;
		})
		.then( createdStudent=> {
			res.status(201).send(createdStudent);
		})
})

api.delete("/students/:studentId", (req, res, next)=>{
	Student.findById(req.params.studentId)
		.then( student=> {
			return student.destroy();
		})
		.then( ()=> {
			return Student.findAll({
				include : [{model: Campus}]
			})
		})
		.then( students=> {
			res.status(200).send(students);
		})
})

api.get("/campuses", (req,res, next)=> {
	Campus.findAll()
		.then( campuses => res.send(campuses));
})

api.get("/campuses/:campusId/students", (req,res, next)=> {
	console.log(req.params.campusId);
	Campus.findOne({
		where : {
			id : req.params.campusId
		},
		include : [ {model : Student}]
	})
	.then( result=> {
		console.log(result.get());
		result.students.forEach(function(element) {
			console.log(element.get());
		});
		return result;
	})
	.then(result=> res.json(result));
})

module.exports = api;
