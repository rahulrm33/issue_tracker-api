const sgMail=require('@sendgrid/mail')

const sendgridAPIKey ='' // your customzed key

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail=(email,name)=>{
    sgMail.send({
        to: email, // Change to your recipient
        from: '', // Email from which id it should send!
        subject: 'Welcome to Issue Tracker appliation! Let’s get started.',
        text: `Hii ${name} ,Happy to have you here . `,
        html: `<strong>Hii ${name} ,Happy to have you here .</strong`,
    })
}

module.exports={
    sendWelcomeEmail
}
