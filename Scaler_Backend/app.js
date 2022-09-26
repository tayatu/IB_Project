const express = require('express');
const app = express();
const database = require('./database/init-db')
const cors = require('cors');
const interviewRoutes = require('./routes/interviews.route');
const participantRoutes = require('./routes/participant.route');

app.use(express.json());
app.use(cors());

database.sequelize.sync({force: false}).then(() => {
    console.log('Database is up!');
});

app.get('/' , (req , res) => {
    res.status(200).json({
        "message": 'Hello World'
    })

});

app.use('/interviews' , interviewRoutes);
app.use('/participants' , participantRoutes);

app.listen(8000 , () => {
    console.log('Server running on localhost post 8000');
});