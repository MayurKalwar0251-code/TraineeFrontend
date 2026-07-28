import { CreateTraineeRequest } from "./create-trainee-request";

export interface UpdateTraineeRequest extends CreateTraineeRequest {
    id : number
}