const bcrypt = require('bcrypt');

const Pool = require('pg').Pool;
const pool = new Pool({
                user:'pi',
                host:'localhost',
                database:'tfg_2021',
                password:'!TFG2021',
                posr:5432
            });
            
function hash(request, response) {
    const saltRounds = 12;
    bcrypt.hash(request.body.password, saltRounds, (err, hash) => {
        response.status(200).json({hashedPassword: hash});
    });


}
function checkUserExists(request, response) {
    const username = request.body.username;
    this.pool.query('SELECT username FROM users WHERE username=$1', username, (error,results) => {
        if (error){throw error;}
        //response.status(200).json(results.rows);
        if(results.rows > 0){
            checkCorrectPassword(request, response, results.rows);
        } else {
            response.status(403).send("Credenciales no válidas")
        }
    } );
}

function checkCorrectPassword(request, response, results) {
    this.pool.query('SELECT password FROM users WHERE username=$1', username, (error,results) => {
        if (error){throw error;}
        bcrypt.compare(request.body.password, results.rows[0].password, (err, result) => {
            if(err){throw err;}
            if (result == false) {
                response.status(403).send("Credenciales no válidas")
            }
            if (result == true) {
                response.status(200).json({userToken: "sasdas"});
            }
        });
    } );
}

module.exports = {
    checkUserExists,
    hash
}