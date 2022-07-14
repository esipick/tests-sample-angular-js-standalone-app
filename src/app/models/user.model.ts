export interface resp {
    data?: {
        token: string,
        user: User
    }
}
export interface RegisterReqObj {
    email: string | any
    username: string | any
    firstName: string | any
    lastName: string | any
    password: string | any
    passwordConfirmation: string | any
}
export interface userData {
    email: string | any
    username: string | any
    lastName: string | any
    firstName: string | any
}


export interface User {
    email: string
    username: string
    firstName: string
    lastName: string
}

export interface userEmails {
    id: number
    email: string
    isPrimary: boolean
    isVerified: boolean
}

export interface changePassword {
    newPassword: string | null | undefined
    oldPassword: string | null | undefined
    confirmNewPassword: string | null | undefined
}
export interface userEmail {
    id: number | null | undefined | any 
    email: string | null | undefined
    isVerified: boolean | null | undefined
    isPrimary:  boolean | null | undefined
}