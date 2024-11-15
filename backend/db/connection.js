const mongoose=require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL)

.then(()=>{   
    console.log("Connection established with Cloud Atlas");
})
.catch(()=>{
    console.log("Error in connection");
})