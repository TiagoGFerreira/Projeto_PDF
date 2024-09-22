export interface GetClientRequest{
    organizationId: number,
    userId: number,
    notificationId: number,
    accepted: number
}

export interface AddClientRequest{
    organizationId: number
}

export interface AcceptClientRequest{
    accepted: number
}