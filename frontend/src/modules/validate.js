

export function ValidateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
export function ValidatePassword(password) {
    const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
    return re.test(password);
}

export function ValidateFirstName(name) {
    if(name.length < 3) {
        console.log(name.length)
        return false;}
    if(name.length > 50) {return false;}
    return true;
}
export function ValidateLastName(name) {
    if(name.length < 3) return false;
    if(name.length > 100) return false;
    return true;
}

export function ValidatePostTitle(title) {
    if(title.length < 3) return false;
    if(title.length > 100) return false;
    return true;
}

export function ValidatePostContent(content) {
    if(content.length < 3) return false;
    if(content.length > 1000) return false;
    return true;
}