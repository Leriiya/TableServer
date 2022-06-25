const Pool = require("pg").Pool;

const pool = new Pool ({
    user: "postgres",
    password: "lera",
    host: "localhost",
    port: 5432,
    database: "perntable"
});

module.exports = pool;