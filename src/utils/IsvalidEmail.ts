export default function isValidEmail(email: string) {
    const regA = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]"
    const regB = "(?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])"
    const regC = "?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
    const reg = new RegExp(regA + regB + regC);
        
    return reg.test(email);
}