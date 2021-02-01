const express = require('express')
const app = express();
const server = require("http").createServer(app);
var BodyParser = require('body-parser')
var mysql = require('mysql')
const cors = require('cors');
const userRoute = require('./routes/user')
const cookieParser = require('cookie-parser');
const io = require("socket.io")(server);
const matchRoute = require('./routes/match')
const centreRoute = require('./routes/centre')


//Index du serveur nodeJS en express ainsi que le lien avec les routes et le controller


io.on("connection", socket=> {


    console.log("a user is connected !");
    socket.on("Chat message", msg=> {
        console.log(msg);
        io.emit("chat message", msg)
    })

})




app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: false}))

const db = mysql.createPool ({
    host: "localhost",
    user: "root",
    password : "",
    database : "datafive"
});




app.use(express.urlencoded({ extended: false})); 
app.use(express.json());




const PORT = 3002;





app.use('/', userRoute);
app.use('/', matchRoute);
app.use('/', centreRoute);


server.listen(PORT, () => console.log("Server is running on port" + PORT));

module.exports = app;