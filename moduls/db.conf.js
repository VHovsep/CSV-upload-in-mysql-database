let options = {
    mysql: {
        host: 'host',
        user: 'user',
        password : 'password',
        database: 'database',
    },
    csv: {
        comment: '#',
        quote: '"'
    },
    table: 'test_geo',
};

let db_config = {
    host: 'host',
    user: 'user',
    password : 'password',
    database: 'database',
};

module.exports.OPTIONS = options;
module.exports.DB_CONFIG = db_config;