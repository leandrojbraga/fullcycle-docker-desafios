const express = require('express')
const app = express()
const port = 3000
const dbconfig = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql')

const connection = mysql.createConnection(dbconfig)
const sqlInsert = `INSERT INTO person(name) values('Leandro Braga')`
connection.query(sqlInsert)
connection.end()

function getName(callback) {
    const connection = mysql.createConnection(dbconfig)
    const sqlSeletc = `SELECT name FROM person ORDER BY id DESC LIMIT 1`
    connection.query(sqlSeletc, function(err,result){
        connection.end();
        if (!err)
            return callback(result[0].name);
        else
            return callback('Desconhecido');
    })
    
}

app.get('/', (req,res) => {
    getName(function(name) {
        res.send(`<center>
                    <div>
                        <h1>FullCylce</h1>
                    </div>
                    <div>
                        <h3>Módulo Docker - Desafio Nginx com Node.js</h3>
                    </div>
                    <div>
                        <h4>by <i>${name}</i></h4>
                    </div>
                <center>`);
        });
});

app.listen(port, () => {
    console.log('Rodando na porta '+ port)
})