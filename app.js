import express from "express";
import {getAllUsers, addUser, getAllCatalogs, addCatalog, addProduct, getAllProducts} from './database.js';
import cors from 'cors';

const app = express();

app.use(cors());


app.use(express.json());

app.use((err, req, res, next)=>{
    console.error(err);
    res.status(500).send("There is a problem, from our side try again")
})


app.get('/', (req, res)=>{
    res.status(200).send("This is the homepage")
})

//user routes
app.get('/all-users', async(req, res)=>{
    const users = await getAllUsers();
    res.status(200).send(users);
})

app.post('/add-user', async(req, res)=>{
    const {fbId, name, email, picture } = req.body;
    const newUser = await addUser(fbId, name, email, picture);
    res.send(newUser);
})

//catalog routes
app.get("/all-catalogs", async(req, res)=>{
    const catalogs = await getAllCatalogs();
    res.status(200).send(catalogs);
})

app.post('/add-catalog', async(req, res)=>{
    const {fbId, id, name } = req.body;
    const newCatalog = await addCatalog(fbId, id, name );
    res.send(newCatalog);
})

//product routes
app.get('/all-products', async(req, res)=>{
    const products = await getAllProducts();
    res.status(200).send(products);
})

app.post('/add-product', async(req, res)=>{
    try{
        const {id, name, description, availability, product_condition, image_url, price, fbId} = req.body;
        const newProduct = await addProduct(id, name, description, availability, product_condition, image_url, price, fbId);
        return res.send(newProduct)
    }catch(err){
        return res.send("An error occurred")
    }
})

app.listen(process.env.port || 3030, ()=>{
    console.log("The server is on niccur");
})