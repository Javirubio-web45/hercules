import dotenv from 'dotenv';
import connectToDatabase from './database.js';
import express from 'express';

//Nuestras Rutas
import productRoutes from './routes/productRoutes.js';

//var path = require('path')

dotenv.config();
connectToDatabase();
const app = express();

app.use(express.json());
//app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 5000

app.use('/api/products', productRoutes);

app.listen(port, () => {
    console.log(`Server runs on port ${port}.`);
});