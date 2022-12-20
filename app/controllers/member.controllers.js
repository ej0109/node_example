const db = require('../models');
const Member = db.member;
const Op = db.Sequelize.Op;


exports.session = async (req, res) => {
    try{
        if(req.session.user) {
            res.render("board/write", {title : '글쓰기'});
        }
        else {
            res.render("member/login", {title : '로그인'});
        }

    } catch(err) {
        console.log(err);
    }
}

exports.login = async (req, res) => {
    try {
        console.log("으아아아ㅏ아아앆") ;

        
        if(req && req.session && req.session.user) {
            console.log('이미 로그인 돼있음');
            res.render("board/write", {title : '글쓰기'});
        }
        else {

            console.log('req.body.userid : ' + req.body.userid);
            const idCheck = await Member.findOne ({
                where : {
                    uid : req.body.userid,
                    pw : req.body.pw,
                },
            });

            console.log(JSON.stringify(idCheck, null, 2));

            if (idCheck?.uid == req.body.userid) {
                req.session.user = {
                    id : req.body.userid,
                    pw : req.body.pw,
                    name : idCheck.name,
                    authorized : true,
                };

                res.render("board/write", {title : '글쓰기'});
            }
            else {
                res.send('아이디가 없음');
            }

        }
    } catch(err) {
        console.log(err)
    }
}

exports.logout = async (req, res) => {
    try {
        console.log('로그아웃');
        if (req.session.user) {
            console.log('로그아웃중...');

            req.session.destroy((err) => {
                if (err) {
                    console.log('세션 삭제시에 에러 발생');
                    return;
                }

                console.log('세션 삭제완료');
                res.render("member/login", {title : '로그인'});
                
            })


        } else {
            console.log('로그인 안돼있음');
            res.render("member/login", {title : '로그인'});
        }
        
    } catch(err) {
        console.log(err);
    }
}



exports.create = async (req, res) => {
    try {
        const idCheck = await Member.findOne ({
            where : {
                uid : req.body.userid,
            },
        });


        if (idCheck?.uid == req.body.userid) {
            res.send('중복된 아이디');
        }
        else {
            Member.create({
                uid : req.body.userid,
                pw : req.body.pw,
                name : req.body.name,
            });

            res.send('등록했음!');
        }

    } catch(err) {
        console.log(err);
    }
}


exports.join = (req, res) => {
    res.render("member/join", {title : '로그인'});
}
