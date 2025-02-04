import { jwtDecode } from "jwt-decode"

const jwtDecodedUtils = (token)=>{
    const decoded = jwtDecode(token)
    return decoded
}

export default jwtDecodedUtils