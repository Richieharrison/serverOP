// add & fetch users - done;
// add & fetch catalogs - done;
// add & fetch products -done;
// add & fetch payments(later)
// add & fetch orders(later)
import {createPool} from 'mysql2';

const pool = createPool({
    host: '173.249.60.35',
    user: 'orderpa1_orderpay',
    database: 'orderpa1_orderpay',
    password: '10richharry10',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0
}).promise()

//users
export const addUser = async (fbId, name, email, picture) => {
    await pool.query(
      'INSERT IGNORE INTO users (fbId, name, email, picture) ' +
      'SELECT * FROM (SELECT ?, ?, ?, ?) AS tmp ' +
      'WHERE NOT EXISTS (SELECT fbId FROM users WHERE fbId= ? AND name = ? AND email = ? AND picture = ?)',
      [fbId, name, email, picture, fbId, name, email, picture]
    );
    return getOneUser(name)
}

export const getAllUsers = async()=>{
    const [rows] = await pool.query("select * from users");
    return rows;
}

export const getOneUser = async(id)=>{
    const [rows] = await pool.query(`SELECT * FROM users WHERE name = ?`, [id]);
    return rows;
}


//catalogs
export const addCatalog = async (fbId, id, name ) => {
    await pool.query(
      'INSERT IGNORE INTO catalogs (fbId, id, name) ' +
      'SELECT * FROM (SELECT ?, ?, ?) AS tmp ' +
      'WHERE NOT EXISTS (SELECT fbId FROM catalogs WHERE fbId= ? AND id = ? AND name = ? )',
      [fbId, id, name, fbId, id, name]
    );
    return getOneCatalog(id)
}

export const getAllCatalogs = async()=>{
    const [rows] = await pool.query("select * from catalogs");
    return rows;
}

export const getOneCatalog = async(id)=>{
    const [rows] = await pool.query(`SELECT * FROM catalogs WHERE id = ?`, [id]);
    return rows;
}
//id,name,description,availability,condition,brand,category,image_url,additional_image_urls,url,price
//id, name, description, availability, product_condition, image_url, price

//products
export const addProduct = async (id, name, description, availability, product_condition, image_url, price, fbId) => {
    await pool.query(
      'INSERT IGNORE INTO products (id, name, description, availability, product_condition, image_url, price, fbId) ' +
      'SELECT * FROM (SELECT ?, ?, ?,?,?,?,?, ?) AS tmp ' +
      'WHERE NOT EXISTS (SELECT id FROM products WHERE id =? and name =? and description=? and availability =? and product_condition =? and image_url =? and price=? and fbId=? )',
      [id, name, description, availability, product_condition, image_url, price, fbId, id, name, description, availability, product_condition, image_url, price, fbId]
    );
    console.log(id)
    return getOneProduct(id)
}

export const getAllProducts = async()=>{
    const [rows] = await pool.query("select * from products");
    return rows;
}

export const getOneProduct = async(id)=>{
    const [rows] = await pool.query(`SELECT * FROM products WHERE id = ?`, [id]);
    return rows;
}

const ngatia = async() => {const [rows] = await pool.query('select * from products'); return rows};
console.log(await ngatia())