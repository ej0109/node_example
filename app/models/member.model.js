const sequelize = require('sequelize')
const Sequelize = require('Sequelize')
const Board = require('./board.model')

//postgreSQL에 만들어질 member 테이블
module.exports = (sequelize, Sequelize) => {
    const Member = sequelize.define("member", {
        uid : {
            type : Sequelize.STRING,
            primaryKey : true,
        },
        pw : {
            type : Sequelize.STRING
        },
        name : {
            type : Sequelize.STRING
        },
    },
    {
        charset: "utf8", // 한국어 설정
        collate: "utf8_general_ci", // 한국어 설정
        tableName: "member", // 테이블 이름
        timestamps: true, // createAt & updateAt 활성화
        paranoid: true, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
    });

    

    Member.associate = function(models) {
        Member.hasMany(models.board, {foreignKey : "user_id", targetKey : "uid"});
    }

    return Member
};