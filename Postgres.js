const bcrypt = require('bcrypt');

const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'pi',
    host: 'localhost',
    database: 'tfg_2021',
    password: '!TFG2021',
    port: 5432,
  });

function checkUserExists(params, response, securityPhrase) {
    pool.connect().then(client => {
        client.query('SELECT username FROM users WHERE username = $1', [params.username]).then(results => {
            client.release();
            if(results.rows.length > 0){
                checkCorrectPassword(params, response, securityPhrase);
            } else {
                response.status(403).send("Credenciales no válidas")
            }
        }).catch(err => {
            client.release();
            console.log(err.stack);
        });
    });
}

function checkCorrectPassword(params, response, securityPhrase) {
    pool.connect().then(client => {
        client.query('SELECT password FROM users WHERE username = $1', [params.username]).then(results => {
            client.release();
            bcrypt.compare(params.password, results.rows[0].password).then(result => {
                if (result) {
                    bcrypt.hash(securityPhrase,12).then(hash=> response.status(200).json({userToken: hash}));
                } else {
                    response.status(403).send("Invalid credentials 2");
                }
            });

        });
    });
}

module.exports = {
    checkUserExists
}