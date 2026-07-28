import { inject, Injectable } from "@angular/core";
import { ApiService } from "../../../core/services/api.service";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { ApiResponse } from "../../../shared/models/api-response";
import { Trainee } from "../models/trainee";
import { PagedResponse } from "../../../shared/models/paged-response";
import { CreateTraineeRequest } from "../models/create-trainee-request";
import { UpdateTraineeRequest } from "../models/update-trainee-request";

@Injectable({
    providedIn: 'root'
})
export class TraineeService {
    private readonly api = inject(ApiService);
    private readonly url = `${environment.apiBaseUrl}/trainee`;

    getAll(pageNumber: number,pageSize: number, search: string) {
        const data =  this.api.get<ApiResponse<PagedResponse<Trainee>>>(`${this.url}?pageSize=${pageSize}&pageNumber=${pageNumber}&search=${search}`);
        return data
    }

    getById(id: string): Observable<ApiResponse<Trainee>> {
        return this.api.get<ApiResponse<Trainee>>(`${this.url}/${id}`);
    }

    create(request: CreateTraineeRequest) {
        return this.api.post<ApiResponse<Trainee>>(this.url, request);
    }

    update(id: number, request: UpdateTraineeRequest) {
        return this.api.put<ApiResponse<Trainee>>(`${this.url}/${id}`, request);
    }

    delete(id: number) {
        return this.api.delete<ApiResponse<boolean>>(`${this.url}/${id}`);
    }
}