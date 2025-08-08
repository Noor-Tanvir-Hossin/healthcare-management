import nodemailer from 'nodemailer'
import config from '../../../config';

// Create a test account or replace with real credentials.
const emailSender = async(email:string, html:string)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: config.emailSender.email,
          pass: config.emailSender.app_pass,
        },
      });
      
      // Wrap in an async IIFE so we can use await.
      const info = await transporter.sendMail({
        from: '"healthcare management" <noortanvirhossain1@gmail.com>',
        to: email,
        subject: "reset pass link",
        // text: "Hello world?", // plain‑text body
        html, // HTML body
      });
    
      console.log("Message sent:", info.messageId);
}

export default emailSender