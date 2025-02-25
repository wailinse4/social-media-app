import crypto from "crypto"

const generateVerificationToken = () => {
    try {
        const verificationToken = crypto.randomBytes(32).toString("hex")
        const verificationTokenExpiresAt = new Date(Date.now() + 3600000)   
    
        return { verificationToken, verificationTokenExpiresAt }
    }
    catch(error) {
        throw new Error("Error generating verification token")
    }

}
export default generateVerificationToken