import dotenv from 'dotenv';
import connectToDatabase from './database.js';
import express from 'express';

//Nuestras Rutas
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

//var path = require('path')

dotenv.config();
connectToDatabase();
const app = express();

app.use(express.json());

const port = process.env.PORT || 5000

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', userRoutes);

app.listen(port, () => {
    console.log(`Server runs on port ${port}.`);
});