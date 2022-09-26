const { participant } = require('../database/init-db');

const getParticipants = async (req , res) => {
    try {
        const participants = await participant.findAll();
        res.status(200);
        return res.json({
            "message": "Data Fetched successfully!",
            "data": participants
        });
    } catch (err) {
        res.status(500);
        return res.json({
            "message": err
        })
    }
}

module.exports = {getParticipants}