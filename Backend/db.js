const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://snehamenat029:sneha_029@cluster0.5domade.mongodb.net/iNotebook?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("connection succesfull...");
}).catch((e)=>{
    console.log("no successfull connection...")
})

