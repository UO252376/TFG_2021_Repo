const bcrypt = require('bcrypt');

const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'pi',
    host: 'localhost',
    database: 'tfg_2021',
    password: '!TFG2021',
    port: 5432,
  });

function checkUserExists(params, response) {
    const username = params.username;
    //response.status(200).json({user: username});
    
    pool.connect().then(client => {
        client.query('SELECT username FROM users WHERE username = $1', [username]).then(results => {
            client.release();
            response.status(200).send(results);
        }).catch(err => {
            client.release();
            console.log(err.stack);
        });
        //response.status(200).json({user: username});
        /*
        client.query('SELECT username FROM users WHERE username=$1', username, (error,results) => {
            if (error){throw error;}
            if(results.rows > 0){
                response.status(200).json({resp : results});
                // checkCorrectPassword(params, response, results.rows);
            } else {
                response.status(403).send("Credenciales no válidas")
            }
        })
        */
    });
}

function checkCorrectPassword(request, response, results) {
    pool.query('SELECT password FROM users WHERE username=$1', username, (error,results) => {
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
    checkUserExists
}