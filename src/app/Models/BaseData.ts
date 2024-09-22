export interface DaysOfWeek{
    id: number,
    name: string
}

export interface Country{
    id: number,
    name: string,
    code: string,
    phoneIndicative: number
}

export interface PostalCode{
    code: number,
    place: string
}

export interface NotificationType{
    id: number,
    type: string
}