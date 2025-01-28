const express = require('express');
// const cors = require('cors')
const app = express();
const port = 8080;

// CORS 허용
// app.use(cors());

app.listen(port, function() {
    console.log(`listening on ${port}`);
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
