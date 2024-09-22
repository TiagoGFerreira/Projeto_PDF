export interface Appointment {
    dateTime: number;
    serviceId: number;
    employeeId: number;
    clientId: number;
    origin: string;
}

export interface EditAppointment {
    dateTime: number,
}

export interface FreeTimeslots{
    dateTime: number,
    serviceId: number,
    employeeId: number,
    clientId: number
}