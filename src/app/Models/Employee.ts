import { GetService } from "./Service"

export interface GetEmployee{
    id: number,
    firstName: string,
    lastName: string,
    services: GetService[]
}

export interface AddEmployee{
    email: string,
    organizationId: number
}