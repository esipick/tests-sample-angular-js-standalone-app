export interface UserAuthResponseObject {
    login?: {
        token: string,
        user: User
    },
    
}


export interface User {
    email: string
    username: string
    firstName: string
    lastName: string
}