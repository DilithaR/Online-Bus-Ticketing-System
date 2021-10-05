const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

const passengerRoute = require('./routes/passenger.route');
const paymentRoute = require('./routes/payment.route');
const inspectorRoute = require('./routes/inspector.route');
const busRouteRoute = require('./routes/busRoute.route');
const journeyRoute = require('./routes/journey.route');
const conductorRoute = require('./routes/conductor.route');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {}, (error) => {
    if (error) {
        console.log('Error occurred while connecting to the database: ', error.message);
    }
});

mongoose.connection.once('open', () => {
    console.log('Database Connected Successfully');
})

app.route('/').get((req, res) => {
    res.send('Test API call');
})

app.use('/passengers', passengerRoute());
app.use('/payments', paymentRoute());
app.use('/inspector', inspectorRoute());
app.use('/busroute', busRouteRoute());
app.use('/journey', journeyRoute());
app.use('/conductor', conductorRoute());

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
})
