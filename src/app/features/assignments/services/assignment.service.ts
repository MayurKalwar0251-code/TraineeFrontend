import { inject, Injectable } from "@angular/core";
import { ApiService } from "../../../core/services/api.service";
import { environment } from "../../../../environments/environment";
import { ApiResponse } from "../../../shared/models/api-response";
import { TaskAssignment } from "../models/taskAssignment";
import { CreateTaskAssignment } from "../models/createTaskAssignment";
import { UpdateTaskAssignment } from "../models/updateTaskAssignment";

@Injectable({
    providedIn: 'root'
})
export class AssignmentService {
    private readonly api = inject(ApiService);
    private readonly url = `${environment.apiBaseUrl}/taskassignment`;

    getAll() {
        return  this.api.get<ApiResponse<TaskAssignment[]>>(this.url)
    }

    getById(id: string) {
        return this.api.get<ApiResponse<TaskAssignment>>(`${this.url}/${id}`);
    }

    create(request: CreateTaskAssignment) {
        return this.api.post<ApiResponse<TaskAssignment>>(this.url, request);
    }

    update(id: number, request: UpdateTaskAssignment) {
        return this.api.put<ApiResponse<TaskAssignment>>(`${this.url}/${id}`, request);
    }

    delete(id: number) {
        return this.api.delete<ApiResponse<boolean>>(`${this.url}/${id}`);
    }
}