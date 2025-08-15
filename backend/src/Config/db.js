//database configuration
const {Pool} = require('pg');

const pool = new Pool({
    user:"litratoAdmin",
    host:"localhost",
    database:"litratoDatabase",
    password:"litrato321",
    port:"5432",
}); 

module.exports = {pool};