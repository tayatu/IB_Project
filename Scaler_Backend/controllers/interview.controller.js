const { interview, participant} = require('../database/init-db');

const timingClashVerdict = async (participants_list , start_time , end_time) => {
    var flag = 0;
    // console.log(participants_list);
    for (let participant_id in participants_list){
        // console.log(participant_id);
        const participant_interviews = await participant.findOne({where: {id: participants_list[participant_id]} , include: interview});
        var interviews_list = participant_interviews.dataValues.Interviews;
        for (let interview_id in interviews_list){
            const scheduled_start_time = interviews_list[interview_id].dataValues.start_time;
            const scheduled_end_time = interviews_list[interview_id].dataValues.end_time;
            if (start_time >= scheduled_start_time && start_time < scheduled_end_time){
                flag = 1;
                break;
            } else if (end_time > scheduled_start_time && end_time < scheduled_end_time){
                flag = 1;
                break;
            } else if (start_time <= scheduled_start_time && end_time >= scheduled_end_time){
                flag = 1;
                break;
            }
        }
        if(flag === 1){
            return false;
        }
    }
    if(flag === 0) {
        return true;
    }
}

const getInterviews = async (req , res) => {
    // console.log(req.params.id);
    if(req.params.id === undefined){
        try {
            const interviews = await interview.findAll({include: participant});
            res.status(200);
            return res.json({
                "message": "Data Fetched successfully!",
                "data": interviews
            });
        } catch (err) {
            res.status(500);
            return res.json({
                "message": err
            });
        }
    } else {
        try {
            const interview_id = req.params.id;
            const required_interview = await interview.findOne({where: {id: interview_id}} , {include: participant});
            const participants = await required_interview.getParticipants();
            res.status(200);
            return res.json({
                "message": "Data Fetched successfully!",
                "data": required_interview,
                "participants": participants
            });
        } catch (err) {
            res.status(500);
            return res.json({
                "message": err
            });
        }
    }
}

const scheduleInterview = async (req , res) => {
    try {
        const title = req.body.title;
        const start_time = new Date(req.body.start_time).getTime();
        const end_time = new Date(req.body.end_time).getTime();
        const participants = req.body.participants;
        if (participants.length < 2){
            res.status(400);
            return res.json({
                "message": "Number of participants should be atleast 2!"
            })
        }
        const verdict = await timingClashVerdict(participants , start_time , end_time);
        if (!verdict){
            res.status(400);
            return res.json({
                "message": "Interview Timing Clash"
            })
        }
        const interview_created = await interview.create({ title: title , start_time: start_time , end_time: end_time});
        participants.forEach( async (participant_id) => {
            // console.log(participant_id)
            const interviewee = await participant.findOne({where: {id: participant_id}});
            await interview_created.addParticipant(interviewee);
        });
        res.status(200);
        return res.json({
            "message": "Interview created successfully!"
        })
    } catch (err) {
        console.log(err);
        res.status(500);
        return res.json({
            "error": err
        })
    }
}

const editInterview = async (req , res) => {
    try {
        const interview_id = req.params.id;
        const title = req.body.title;
        const start_time = new Date(req.body.start_time).getTime();
        const end_time = new Date(req.body.end_time).getTime();
        const participants = req.body.participants;
        // console.log(req.body);
        if (participants.length < 2){
            res.status(400);
            return res.json({
                "message": "Number of participants should be atleast 2!"
            })
        }
        const verdict= await timingClashVerdict(participants , start_time , end_time);
        if (!verdict){
            res.status(400);
            return res.json({
                "message": "Interview Timing Clash"
            })
        }
        await interview.update({title: title , start_time: start_time , end_time: end_time} , {where: {id: interview_id}});
        const interview_edited = await interview.findOne({where: {id: interview_id}} , {include: participant})
        // console.log(await interview_edited.getParticipants())
        participants.forEach( async (participant_id) => {
            const interviewee = await participant.findOne({where: {id: participant_id}});
            // console.log(interviewee);
            await interview_edited.setParticipants(interviewee);
            await interview_edited.addParticipants(interviewee);
        });
        res.status(200);
        return res.json({
            "message": "Interview edited successfully!"
        })
    } catch (err) {
        console.log(err);
        res.status(500);
        return res.json({
            "error": err
        })
    }
}

module.exports = {getInterviews, scheduleInterview, editInterview}