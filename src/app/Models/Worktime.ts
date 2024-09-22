export interface GetWorktime{
    id: number,
    employeeId: number,
    dayOfWeekId: number,
    startTime: number,
    endTime: number
}

export interface AddWorktime{
    employeeId: number,
    dayOfWeekId: number,
    startTime: number,
    endTime: number
}