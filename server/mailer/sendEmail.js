const nodemailer = require('nodemailer');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const sendEmail = (userEmail) => {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'liordevgm@gmail.com',
                pass: 'psvsevkydzmypnhk'
            }
        })
        const mail_configs ={
            from:'liordevgm@gmail.com',
            to:userEmail,
            subject:"testing our nodemailer",
            // text:`This is the Verify code : ${verifyCode}`,
            html: "<b>Hello world?</b>"
        }
        transporter.sendMail(mail_configs, (error)=>{
            if(error){
                console.log(error.message);
                
                return reject({message:"an error has occurred"})
            };
            return reject({message:"Email Sent successfully"})
        } )
    })
}

module.exports={sendEmail}