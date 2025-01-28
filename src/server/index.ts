import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import petshopRouter from "../routes/petshopRouter";
import petRouter from "../routes/petRouter";

//env properties
dotenv.config();

const app = express();

//default configuration
app.use(express.json());
app.use(cors());

//set routes
app.use('/petshop', petshopRouter);
app.use('/pet', petRouter);

//server start
app.listen(process.env.PORT, () => {
    console.log(`petshop server running in http://${process.env.HOST}:${process.env.PORT}`);
})