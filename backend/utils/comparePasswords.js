import bcrypt from "bcrypt"

const comparePasswords = async (inputPassword, hashedPassword) => {
    try {
        const isValid = await bcrypt.compare(inputPassword, hashedPassword)
        return isValid
    }
    catch(error) {
        throw new Error("Error comparing passwords")
    }
}
export default comparePasswords