const db = require('../models');
const Board = db.board;
const Member = db.member;
const Op = db.Sequelize.Op;
const sequelize = require('sequelize')


exports.list = async (req, res) => {
    const list = await Board.findAll({
        include : [{
            model : Member,
            attributes : ['name']
        }]
    });

    console.log(JSON.stringify(list, null, 2));

    res.render("board/list", {list : list, title : '리스트'});
}

exports.write = (req, res) => {
    res.render("board/write", {title : '글쓰기'});
}

exports.writeInsert = async (req, res) => {
    try {

       /* 
        Board.max("board_id").then(max => {
            console.log("max"  + max);
        }) */

        var id = req.session.user ;
        id = id["id"];

        console.log("id : " + id);
        
        let seq = await Board.findAll({
            attributes: [
                [sequelize.fn('MAX', sequelize.col('board_id')), "board_id"]
             ],
            raw : true, 
        });

        if (seq[0].board_id == null) 
            seq = 1;
        else 
            seq  = seq[0].board_id + 1;


        
       await Board.create({
            board_id : seq,
            user_id : id,
            title : req.body.title,
            comment : req.body.comment,
        });
 
    } catch(err) {
        console.log(err);
    }

    res.render("board/write", {title : '글쓰기'});
}

