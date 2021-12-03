const sgMail=require('@sendgrid/mail')

const sendgridAPIKey ='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'

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail=(email,name)=>{
    sgMail.send({
        to: email, // Change to your recipient
        from: 'raghavrahulrm23@gmail.com', // Change to your verified sender
        subject: 'Welcome to Issue Tracker appliation! Let’s get started.',
        text: `Hii ${name} ,Happy to have you here . `,
        html: `<strong>Hii ${name} ,Happy to have you here .</strong`,
    })
}

module.exports={
    sendWelcomeEmail
}
