const express = require('express')
const cors = require('cors')
const app = express()
var corOptions = {
    origin:'https://localhost:3000'
}
const dbConfig = require('./config/db.Config.js');
const SDC = require('statsd-client');
const sdc = new SDC({host: dbConfig.METRICS_HOSTNAME, port: dbConfig.METRICS_PORT});
const router = require('./routes/userRoutes.js')
const ro = require('./routes/productRoutes.js');
//middleware
app.use(cors(corOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

var start = new Date();
app.get('/healthz', (req, res)=>{
    console.log("Is it hitting?")
    sdc.timing('health.timeout', start);
    sdc.increment('endpoint.health');
    res.status(200).send("Its healthy");
})

const PORT = process.env.PORT || 3000

app.use('/v2/user', router);
app.use('/v1/product', ro);


app.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`)
})

module.exports = app;
