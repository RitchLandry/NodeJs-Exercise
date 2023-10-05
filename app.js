const express = require("express")
const app = express()

// routes to access the api
app.get("/api",(req,res)=>{
    res.json({
        success:1,
        message:"This is rest api working"
    })
})

app.listen(3000,()=>{
    console.log("Server running");
})