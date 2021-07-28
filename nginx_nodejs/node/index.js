const express = require('express');
const app = express();
const port = 3000;
const dbconfig = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const tbPeople = 'people';
const mysql = require('mysql');

function insertPeople() {
    const connection = mysql.createConnection(dbconfig)
    const sqlInsert = `INSERT INTO ${tbPeople}
                            (name) 
                        VALUES
                            ('Ítalo Ferreira'),
                            ('Rayssa Leal'),
                            ('Kelvin Hoefler'),
                            ('Fernando Scheffer'),
                            ('Daniel Cargnin')
                            `;
    connection.query(sqlInsert);
    connection.end();
}

function validadePeopleIsEmpty() {
    const connection = mysql.createConnection(dbconfig);
    const sqlSeletc = `SELECT COUNT(id) as qtde FROM ${tbPeople}`;
    connection.query(sqlSeletc, function (err, result) {
        connection.end();
        console.log()
        if (parseInt(result[0].qtde) == 0) {
            insertPeople();
        }
    });
}

function getName(callback) {
    const connection = mysql.createConnection(dbconfig);
    const sqlSeletc = `SELECT name FROM ${tbPeople} ORDER BY name`;
    connection.query(sqlSeletc, function(err,result){
        connection.end();
        if (!err) {
            return callback(null, result);
        } else {
            return callback(err, null);
        }
    });
}

validadePeopleIsEmpty();

app.get('/', (req,res) => {
    getName(function(err, results) {
        if (err != null) {
            res.send(`Falha ao buscar nomes. Erro: ${err}`);
        } else {
            res.send(`<center>
                        <div>
                            <h1>Full Cycle Rocks!</h1>
                        </div>
                        <div>
                            <h3>Lista de nomes</h3>
                            <ul style="list-style-type: none; margin: 0; padding: 0;">
                            ${results.map(
                                result => {
                                    return `<li>${result.name}</li>`;
                                }
                            ).join('')}
                            </ul>
                        </div>
                    <center>`);
        }
    });
});

app.listen(port, () => {
    console.log('Rodando na porta '+ port);
})