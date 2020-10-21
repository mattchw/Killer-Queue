const express = require('express');
const appointmentModel = require('../models/appointment');
const shopModel = require('../models/shop');
const authRouter = require('../routes/authRoute');
const authUtil = require('../oauth/auth');
const app = express();

// get all appointments
app.get('/appointments', async (req, res) => {
    try {
        let result = {};
        const appointments = await appointmentModel.find({});

        result.count = appointments.length;
        result.appointments = appointments;

        res.sendRes.successRes(res, null, result);
    } catch (err) {
        res.sendRes.internalServerErrRes(res, err.message || "Error occurred while searching the appointments.", null);
    }
});

// get appointments by appointment id
app.get('/appointments/:id', async (req, res) => {
    const appointment = await appointmentModel.findById(req.params.id);

    try {
        res.json(appointment);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error occurred while searching the appointment."
        });
    }
});

// get appointments by shop id
app.get('/appointment/shop/:shop', async (req, res) => {
    const appointments = await appointmentModel.find({ shop: req.params.shop });

    try {
        res.json(appointments);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error occurred while searching the appointments."
        });
    }
});

// get appointments by shop id
app.get('/appointmentAvailability/:shop/', async (req, res) => {

    const shop = await shopModel.findById(req.params.shop );
    
    if (!req.query.appointmentDate || !req.query.peopleNum) {
        return res.status(400).send({
            message: "Missing mandatory fields"
        });
    }
    let pplNum = req.query.peopleNum;
    let maxTableNo = 0;
    if(pplNum<=2){
        pplNum = 2;
        maxTableNo = shop.tableFor2;
    }else if(pplNum>2 && pplNum<=4){
        pplNum = 4;
        maxTableNo = shop.tableFor4;
    }else if(pplNum>4 && pplNum<=6){
        pplNum = 6;
        maxTableNo = shop.tableFor6;
    }else if(pplNum>6){
        pplNum = 8;
        maxTableNo = shop.tableForMore;
    }
    let averageTimeInHalfHour = shop.averageTimeInHalfHour;
    let isfull = false;
    let appDate = new Date(req.query.appointmentDate);
    appDate = new Date(appDate.setMinutes(appDate.getMinutes()-(averageTimeInHalfHour*30)));
    let appEndDate = new Date(req.query.appointmentDate);
    appEndDate = new Date(appEndDate.setMinutes(appEndDate.getMinutes()+(averageTimeInHalfHour*30)));
    console.log('checking')

    await appointmentModel.find({ 
        shop: req.params.shop, 
        appointmentDate:{
            $gt:appDate,
            $lt:appEndDate
        },
        status:{$in:['Confirmed','Fulfilled']},
        peopleNum:pplNum
    }).countDocuments(async function(err, count){
        // console.log(`check count: `+count+` maxTableNo:`+maxTableNo);
        // console.log(`checktime ${appDate}: `);
        // console.log(`checkendtime ${appEndDate}: `);
        if(count>=maxTableNo){
            isfull = true;
        }
        
    });

    console.log('checking end')
        

    

    //console.log();
    
    let returnData = {
        isfull:isfull,
        // appointments:appointments
    }
    try {
        res.json(returnData);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error occurred while searching the appointments."
        });
    }
});

// get appointments by shop id , status
app.get('/appointments/shop/:shop/:status', async (req, res) => {
    let status;
    switch (req.params.status) {
        case '1':
            status = 'Valid';
            break;
        case '2':
            status = 'Confirmed';
            break;
        case '3':
            status = 'Fulfilled';
            break;
        case '4':
            status = 'Cancelled';
            break;
        case '5':
            status = 'Expired';
            break;
        default:
    }
    const appointments = await appointmentModel.find({ shop: req.params.shop, status: status }).sort('createdTime');

    try {
        res.json(appointments);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error occurred while searching the appointments."
        });
    }
});


app.post('/appointments', async (req, res) => {
    // Validate request
    if (!req.body.shop || !req.body.peopleNum || !req.body.client || !req.body.appointmentDate) {
        return res.status(400).send({
            message: "Missing mandatory fields"
        });
    }

    let appointmentNum = "0001";

    const appointments = await appointmentModel.find({ shop: req.body.shop }).sort('-createdTime');
    const shop = await shopModel.findById(req.body.shop );
    try {
        if (appointments[0] != null) {
            let tmp = Number(appointments[0].appointmentNum) + 1;
            appointmentNum = ("000" + tmp).slice(-4);
        }
        let appDate = new Date(req.body.appointmentDate);
        
        // Create a appointment
        const appointment = new appointmentModel({
            appointmentNum: appointmentNum,
            peopleNum: req.body.peopleNum,
            status: "Valid",
            shop: req.body.shop,
            client: req.body.client,
            appointmentDate: appDate,
        });

        // Save appointment into db

        const data = await appointment.save();
        const doc = await shopModel.populate(data, {
            path: "shop",
            select: [
                'name',
                'type',
                'district',
                'thumbnail'
            ]
        });
        res.send(doc);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error occurred while creating the appointment."
        });
    }
});

// change appointment status
app.put('/appointments/:id', authRouter.authenticateRequest, authUtil.authorize('ShopOwner'), async (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "appointment cannot be empty"
        });
    }

    // Save appointment into db
    try {
        const appointment = await appointmentModel.findById(req.params.id);
        if (appointment.shop != null) {
            if (appointment.shop.toString() == res.locals.token.user.shop.toString()) {
                const data = await appointmentModel.findByIdAndUpdate(req.params.id, req.body, { upsert: true });
                res.send(data);
            }
            else {
                res.status(500).send({
                    message: "You don't have access."
                });
            }
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error occurred while updating the appointment."
        });
    }
});

app.delete('/appointments/:id', authRouter.authenticateRequest, authUtil.authorize('ShopOwner'), async (req, res) => {
    try {
        const data = await appointmentModel.findByIdAndDelete(req.params.id);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error occurred while creating the appointment."
        });
    }
});

module.exports = app