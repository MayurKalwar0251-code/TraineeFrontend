import { inject, Injectable } from "@angular/core";
import { ApiService } from "../../../core/services/api.service";
import { environment } from "../../../../environments/environment";
import { ApiResponse } from "../../../shared/models/api-response";
import { Submission } from "../models/submission";
import { CreateSubmissionRequest } from "../models/createSubmission";

@Injectable({
    providedIn: 'root'
})
export class SubmissionService {
    private readonly api = inject(ApiService);
    private readonly url = `${environment.apiBaseUrl}/submission`;

    getAll() {
        return this.api.get<ApiResponse<Submission[]>>(this.url)
    }

    getSubmissionOfTask(id : number) {
        return this.api.get<ApiResponse<Submission[]>>(`${this.url}/task/${id}`)
    }

    getById(id: string) {
        return this.api.get<ApiResponse<Submission>>(`${this.url}/${id}`);
    }

    create(request: CreateSubmissionRequest) {
        return this.api.post<ApiResponse<Submission>>(this.url, request);
    }

    delete(id: number) {
        return this.api.delete<ApiResponse<boolean>>(`${this.url}/${id}`);
    }
}