export interface SignIn{
    email: string,
    password: string
}
export interface SignUp{
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: number,
    countryId: number,
    street: string,
    doorNumber: number,
    postalCode: number
}

export interface RecoverPassword{
    email: string,
    mfa: string,
    newPassword: string
}

export interface Me{
    id: number,
    email: string,
    roles: Roles
}

export interface Roles{
    isMaster: number,
    admin: GetRoles[],
    employee: GetRoles[],
    client: GetRoles[]
}

export interface GetRoles{
    id: number,
    organizationId: number
}