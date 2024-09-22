import { AddOrganization } from "./Organization";

export interface GetService{
    id: number,
    name: string,
    duration: number,
    categoryId:number,
    organizationId: number,
    organization: AddOrganization
}

export interface AddService{
    name: string,
    duration: number,
    categoryId:number,
    organizationId: number,
}

export interface UpdateService{
    name: string | null,
    duration: number | null,
    categoryId:number | null
}