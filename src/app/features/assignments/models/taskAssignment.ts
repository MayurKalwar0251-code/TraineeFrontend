export interface TaskAssignment {
    id: number
    traineeId: number
    mentorId: number
    learningTaskId: number
    status: string
    remarks: string
    assignedDate: string
    dueDate: string
}