require('dotenv').config();

const productsData = require('./data/products');
const connectDB = require('./config/db');
const Product = require('./models/Product');

connectDB();

const importData = async () => {
    try{
        await Product.deleteMany({});

        await Product.insertMany(productsData);

        console.log("Data Import SUCCESS");

        process.exit();
    } catch (error) {
        console.error("Error with data import");
        process.exit(1);
    }
};

importData(); 