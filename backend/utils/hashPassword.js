import bcrypt from "bcrypt"

const hashPassword = async (password ) => {
    try {
        const saltRounds = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        return hashedPassword 
    }
    catch(error) {
        throw new Error("Error hashing password")
    }
    
}
export default hashPassword