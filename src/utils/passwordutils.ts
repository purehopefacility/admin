import bcrypt from 'bcryptjs'

export async function comparePassword(password:string, hash:string):Promise<boolean> {
    if(password == hash){
        return true
    }else {
        return false
    }
}