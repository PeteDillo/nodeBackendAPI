//imports
const express = require("express");
const app = express();


//Middleware
app.use(express.json());

//Endpoints
//http://localhost:5005
//http://localhost:5005
app.get("/api/products", (req, res)=>{
    console.log(req.headers);
res.send("response!");
});

//Server
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
    console.log(`Server is running! on Port: ${PORT}`);
});