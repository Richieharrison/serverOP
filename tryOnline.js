import {createPool} from 'mysql2';

const pool = createPool({
    host: '173.249.26.135',
    user: 'orderpa1_orderpay',
    database: 'orderpa1_orderpay',
    password: '10richharry10',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0
}).promise()

export const getAllUsers = async()=>{
    const [rows] = await pool.query("select * from users");
    return rows;
}

console.log(await getAllUsers());