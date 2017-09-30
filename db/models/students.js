const db = require("../index.js");
const Student = db.define("student", {
    name : db.Sequelize.STRING,
    email : db.Sequelize.STRING
});

// const seedStudents = ()=> {
//     // once db synced
//     return Promise.all([
//         Student.create({name : "Aung", email: "aung@gmail.com"}),
//         Student.create({name : "Kyaw", email: "kyaw@gmail.com"}),
//         Student.create({name : "Ching", email: "ching@gmail.com"}),

//     ]);
// }

module.exports = {
    Student
}