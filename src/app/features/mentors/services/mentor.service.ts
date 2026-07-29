import { inject, Injectable } from "@angular/core";
import { ApiService } from "../../../core/services/api.service";
import { environment } from "../../../../environments/environment";
import { ApiResponse } from "../../../shared/models/api-response";
import { CreateMentorRequest } from "../models/create-mentor-request";
import { UpdateMentorRequest } from "../models/update-mentor-request";
import { Mentor } from "../models/mentor";

@Injectable({
    providedIn: 'root'
})
export class MentorService {
    private readonly api = inject(ApiService);
    private readonly url = `${environment.apiBaseUrl}/mentor`;

    getAll() {
        return  this.api.get<ApiResponse<Mentor[]>>(this.url)
    }

    getById(id: string) {
        return this.api.get<ApiResponse<Mentor>>(`${this.url}/${id}`);
    }

    create(request: CreateMentorRequest) {
        return this.api.post<ApiResponse<Mentor>>(this.url, request);
    }

    update(id: number, request: UpdateMentorRequest) {
        return this.api.put<ApiResponse<Mentor>>(`${this.url}/${id}`, request);
    }

    delete(id: number) {
        return this.api.delete<ApiResponse<boolean>>(`${this.url}/${id}`);
    }
}