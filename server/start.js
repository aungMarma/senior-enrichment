'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const {resolve} = require('path')
const path = require("path");

const app = express()

if (process.env.NODE_ENV !== 'production') {
  // Logging middleware (non-production only)
  app.use(require('volleyball'))
}  

//The code below works because `.use` returns `this` which is `app`. So what we want to return in the `module.exports` is `app`, and we can chain on that declaration because each method invokation returns `app` after mutating based on the middleware functions
module.exports = app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(express.static(resolve(__dirname, '..', 'public'))) // Serve static files from ../public
  .use(express.static(path.join(__dirname, '..', "node_modules")))   // bootstrap
  .use('/api', require('./api')) // Serve our api
  .get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html'))) // Send index.html for any other requests.

  // notice the use of `_` as the first parameter above. This is a pattern for parameters that must exist, but you don't use or reference (or need) in the function body that follows.

if (module === require.main) {
  // Start listening only if we're the main module.

  /* 
    https://nodejs.org/api/modules.html#modules_accessing_the_main_module
      - This (module === require.main) will be true if run via node foo.js, but false if run by require('./foo')
      - If you want to test this, log `require.main` and `module` in this file and also in `api.js`. 
        * Note how `require.main` logs the same thing in both files, because it is always referencing the "main" import, where we starting running in Node 
        * In 'start.js', note how `module` is the same as `require.main` because that is the file we start with in our 'package.json' -- `node server/start.js`
        * In 'api.js', note how `module` (this specific file - i.e. module) is different from `require.main` because this is NOT the file we started in and `require.main` is the file we started in
          ~ To help compare these objects, reference each of their `id` attributes
  */

  const PORT = 1337

  const db = require('../db')
  const Student = require("../db/models/students").Student;
  const Campus = require("../db/models/campuses").Campus
  db.sync({force : true})
  .then(() => {
    console.log('db synced');
    // app.listen(PORT, () => console.log(`server listening on port ${PORT}`))
  })
  .then( ()=> {
    return Promise.all([
        Campus.create({name : "Luna"}),
        Campus.create({name: "Mars"}),
        Campus.create({name: "Terra"}),
        Campus.create({name: "Titan"})
      ])
  })
  .then( (campuses)=> {
       return Promise.all([
        Student.create({name : "Gabi", email: "Aung@gmail.com"}),
        Student.create({name : "Ash", email: "kyaw@gmail.com"}),
        Student.create({name : "Dan", email: "Dan@gmail.com"}),
        Student.create({name : "Marvin", email: "Marvin@gmail.com"}),
        Student.create({name : "Stinky", email: "Strinky@gmail.com"}),
        Student.create({name : "Stinky", email: "Strinky@gmail.com"}),
        Student.create({name : "Maru", email: "Maru@gmail.com"}),
        Student.create({name : "Maro", email: "Maro@gmail.com"}),

    ])
  })
  .then( (students)=> {

      return Campus.findAll()
        .then( campuses=> {
          return Promise.all([
          campuses[0].setStudents([students[0], students[1]]),
          campuses[1].setStudents([students[2], students[3]]),
          campuses[2].addStudent(students[3]),
          campuses[3].setStudents([students[4], students[5], students[6], students[7]])
          ])
         
        })

  })
  .then( result=> {
       return Campus.findOne(
         {where : {
           id : result[0].id
         },
         include: [{model : Student}]
        }
       )

  })
  .then( campus1st=> {
    // campus1st.students.forEach( student=> {
    //   console.log(student.get());
    // })
  })
  .then( ()=> {
     app.listen(PORT, () => console.log(`server listening on port ${PORT}`))
  })
}
