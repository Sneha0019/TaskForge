require("../Backend/db");
const express = require("express");
var cors = require('cors')


const app = express();
const PORT = process.env.PORT ||  5000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, auth-token"
    );
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE"); 
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(express.json())
//routing
app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))


app.get("/", (req, res)=>{
    res.send("hello");
});

app.get("/login", (req, res)=>{
    res.send("hello this is login");
});

app.get("/signup", (req, res)=>{
    res.send("hello this is signup page");
});


//port listening
app.listen(PORT, ()=>{
    console.log(`iNotebook backend listening to port number ${PORT}`);
})
