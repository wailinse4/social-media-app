import crypto from "crypto"

const generateVerificationToken = () => {
    const verificationToken = crypto.randomBytes(32).toString("hex")
    const verificationTokenExpiresAt = new Date(Date.now() + 3600000)   

    return { verificationToken, verificationTokenExpiresAt }
}
export default generateVerificationToken