const express=require('express')
const cors=require('cors')
const app=new express;
const TodoModel = require("./model/todo_model")
app.use(cors());
require('dotenv').config();
app.use(express.json());

const tRoute=require('./routes/todos')
app.use('/api',tRoute);


const PORT=process.env.PORT;
require('./db/connection');
app.listen(PORT,()=>{console.log(`Server is initiated on PORT ${PORT}`);})

