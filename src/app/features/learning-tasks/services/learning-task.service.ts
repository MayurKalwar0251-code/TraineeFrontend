import { inject, Injectable } from "@angular/core";
import { ApiService } from "../../../core/services/api.service";
import { environment } from "../../../../environments/environment";
import { ApiResponse } from "../../../shared/models/api-response";
import { LearningTask } from "../models/learningTask";
import { CreateLearningTask } from "../models/create-learningTask";
import { UpdateLearningTask } from "../models/update-learningTask";

@Injectable({
    providedIn: 'root'
})
export class LearningTaskService {
    private readonly api = inject(ApiService);
    private readonly url = `${environment.apiBaseUrl}/learningtask`;

    getAll() {
        return  this.api.get<ApiResponse<LearningTask[]>>(this.url)
    }

    getById(id: string) {
        return this.api.get<ApiResponse<LearningTask>>(`${this.url}/${id}`);
    }

    create(request: CreateLearningTask) {
        return this.api.post<ApiResponse<LearningTask>>(this.url, request);
    }

    update(id: number, request: UpdateLearningTask) {
        return this.api.put<ApiResponse<LearningTask>>(`${this.url}/${id}`, request);
    }

    delete(id: number) {
        return this.api.delete<ApiResponse<boolean>>(`${this.url}/${id}`);
    }
}