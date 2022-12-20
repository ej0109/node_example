const sequelize = require('sequelize')
const Sequelize = require('Sequelize')
const Member = require('./member.model')

module.exports = (sequelize, Sequelize) => {
    const Board = sequelize.define("board", {
        board_id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
        },
        user_id : {
            type : Sequelize.STRING
        },
        title : {
            type : Sequelize.STRING
        },
        comment : {
            type : Sequelize.STRING
        },        
    },
    {
        charset: "utf8", // 한국어 설정
        collate: "utf8_general_ci", // 한국어 설정
        tableName: "board", // 테이블 이름
        timestamps: true, // createAt & updateAt 활성화
        paranoid: true, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
    }
    );

    Board.associate = function(models) {
        Board.belongsTo(models.member, {foreignKey : "user_id", targetKey : "uid"})
    };

    return Board
};