require('dotenv').config();
const { info } = require('autoprefixer');
const { text } = require('express');
const express = require('express');
const app = express();


var server = app.listen(3000, 'localhost', function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});

const nodemailer = require("nodemailer");


//middleware
app.use(express.static('public'));
app.use(express.json())

app.get('/', (req, res)=>{
	res.sendFile(__dirname + '/public/index.html')
})

app.post('/', (req, res)=>{
    console.log(req.body)



    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: req.body.email,
        to: process.env.EMAIL_ID,
        subject: `Message from ${req.body.firstname} ${req.body.email} ${req.body.lastname}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
            res.send('error');
        }else{
            console.log('Email sent: ' + info.response);
            res.send('success')
        }
    })
})

