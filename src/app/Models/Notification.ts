export interface GetNotification{
    id: number,
    message: string,
    read: number,
    type: string,
    clientRequestId: number,
    appointmentSwitchRequestId: number
}
