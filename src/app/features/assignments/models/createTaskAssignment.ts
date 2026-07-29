export interface CreateTaskAssignment {
    traineeId: number
    mentorId: number
    learningTaskId: number
    status: string
    remarks: string
    assignedDate: string
    dueDate: string
}