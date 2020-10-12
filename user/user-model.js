const db = require("../database/dbConfig");

module.exports ={
add,
find,
findBy,
findById
}
function find(){
    return db('user').select('id','username', 'password')
}
function findBy(filter){
    return db('users').where(filter).then(user => {return user})
}
async function add(user){
    return db('users')
    .insert(user).then(id => {
        return db('users').where({id: id[0]})
    })
}
function findById(id){
    return db('users').where({id}).first();
}