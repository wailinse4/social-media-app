import { mailtrapClient, sender } from "../config/mailtrap.js";

const sendVerificationEmail = async (recipientEmail, verificationToken) => {
    const recipients = [{ email: recipientEmail }]
    const verificationLink = `http://localhost:3000/api/auth/verify-email?verificationToken=${verificationToken}`

    const emailContent = `
                <p>Thank you for registering! Please click the link below to verify your email address:</p>
                <a href="${verificationLink}">${verificationLink}</a>
                <p>If you did not register, please ignore this email.</p>
                `   
    try {
        const response = await mailtrapClient.send({
            from: sender, 
            to: recipients, 
            subject: "Please Verify Your Email Address", 
            html: emailContent, 
            category: "Email Verification"
        })
        console.log("Verification Email Sent Successfully", response)
    }
    catch(error) {
        console.error("Error in Send Verification Email", error)
        return false 
    } 
}
export default sendVerificationEmail

