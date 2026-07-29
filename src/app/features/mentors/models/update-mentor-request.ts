import { CreateMentorRequest } from "./create-mentor-request";

export interface UpdateMentorRequest extends CreateMentorRequest {
    id: number
}