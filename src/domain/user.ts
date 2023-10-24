interface User{
    id?:string,
    name:string,
    mobile:string,
    email?:string,
    password:string,
    isBlocked?:boolean
}

export default User