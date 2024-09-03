
class TokenHelper {
    constructor(){
        this.key = "sustainable-token"
    }
    get = () => {
        return window.localStorage.getItem(this.key);
    }
    create = (token) => {
        return window.localStorage.setItem(this.key,token);
    }
    delete = () => {
        return window.localStorage.removeItem(this.key);
    }
   
}

export default new TokenHelper()