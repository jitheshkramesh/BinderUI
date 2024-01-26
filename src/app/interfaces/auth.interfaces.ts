export interface loginInterface {
    userName: string,
    password: string
}

export interface registerInterface {
    userName: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string
}

export interface userInterface{
    userName: string, 
    email?: string,
    firstName?: string,
    lastName?: string
}