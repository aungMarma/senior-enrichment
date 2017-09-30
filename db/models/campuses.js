const db = require("../index.js");
const Student = require("./students.js");
const Campus = db.define("campus", {
    name : db.Sequelize.STRING,
    image : db.Sequelize.STRING
});

Campus.getAllStudents = (campusId)=> {
    return Campus.findOne({
        where : {
            id : campusId
        },
        include : [
            {model: Student}
        ]
    })
}

module.exports = {
    Campus
}