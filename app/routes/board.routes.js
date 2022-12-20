module.exports = (app) => {
    const board = require('../controllers/board.controllers.js');
    var router = require('express').Router();

    router.get('/', board.list);
    router.get('/write', board.write);
    router.post('/write', board.writeInsert);



    app.use('/board', router);

}