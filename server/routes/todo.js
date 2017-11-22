var express = require('express');
var router = express.Router();

var pool = require('../modules/pool');

router.post('/', function(req, res){
    pool.connect(function (errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`INSERT INTO tasks (task)
            VALUES ($1);`, [req.body.task], function(errorMakingQuery, result){
                done();
                if(errorMakingQuery){
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            })
        }
    })
})

module.exports = router;