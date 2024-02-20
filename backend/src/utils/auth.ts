import bcrypt from "bcryptjs";

const Hash = async(saltRounds: number, password: string): Promise<string> => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        console.log(hash);
        return hash;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const ValidateUser = async(password:string, hash:string) => {
    try {
        const valid = await bcrypt.compare(password, hash);
        console.log(valid);
        return valid;
    } catch (error) {
        console.log(error);
        return error;
    }
}

const isValidEmail = (email: string) => {
    if(!email) return false;
	return /^\S+@\S+\.\S+$/.test(email);
};

const isValidPassword = (password: string) => {
    if(!password) return false;
	return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);
};


export {Hash, ValidateUser, isValidEmail, isValidPassword}
