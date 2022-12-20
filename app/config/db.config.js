//host, user, password, db, dialect는 PostgreSQL과 연결을 위한 정보

module.exports = {
    HOST : 'localhost',
    USER : 'postgres',
    PASSWORD : '1234', //설치할때 설정한 비밀번호
    DB : 'my_DB',
    dialect : 'postgres',
    pool : {
        max : 5,
        min : 0,
        acquire: 30000,
  		idle: 10000
    }
};
