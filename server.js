//import express
const express = require("express");
const app = express();
const port = 3000;

const postsRouter = require('./routers/posts');

app.use(express.json());

app.use('/posts', postsRouter)


// first route 
app.get('/', (req, res) =>{
    res.send('Hello World')
});
//midleware serve static files from the "public" folder
app.use(express.static('public'));


// app listening on port: 3000
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`)
})