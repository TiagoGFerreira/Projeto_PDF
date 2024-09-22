export interface AppointmentSwitchRequest{
    receiverAppointmentId:number,
    senderAppointmentId:number,
    origin: string
}

export interface AcceptAppointmentSwitchRequest{
    accept:number
}