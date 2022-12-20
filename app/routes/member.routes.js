module.exports = (app) => {
    const member = require('../controllers/member.controllers.js');
    var router = require('express').Router();

    router.get('/', member.session);
    router.get('/join', member.join);
    router.get('/logout', member.logout);

    
    //member.join
    router.post('/register_process', member.create);
    router.post('/register_login', member.login);
    
    app.use('/member', router);

}
