const conn = require("./db/conn")
const express = require("express")
const app = express()

const UserRoutes = require("./routes/UserRoutes")
const CarRoutes = require("./routes/CarRoutes")


app.use(express.json())



app.use("/users", UserRoutes)
app.use("/cars", CarRoutes)



conn.sync()
.then(
    ()=>{
        app.listen(5000)
    }
).catch((error)=>{
    
        console.log(error)
})
