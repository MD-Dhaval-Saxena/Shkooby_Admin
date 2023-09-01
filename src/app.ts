import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import {connectToMongo} from './db.js'
const app = express();
const port = 3000;

connectToMongo()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

export {}



// require("dotenv").config();
// const express = require("express");
// const db = require("./db");

// const url = process.env.url || "http://localhost:";

// const app = express();
// const port = process.env.port || 2000;


// const cors = require("cors");
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// app.get("/", (req:any, res:any) => {
//     res.send("Hello World!");
//   });

//   app.listen(port, () => {
//     // console.log(`Backend http://localhost:${port}`);
//     console.log(`Backend ${url}${port}`);
//   });
  
