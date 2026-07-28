import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    protected http = inject(HttpClient)

    get<T>(url: string) : Observable<T> {
            return this.http.get<T>(url)
        
    }

    post<T>(url: string, body: unknown) : Observable<T> {
        return this.http.post<T>(url,body)
    }

    put<T>(url: string, body: unknown) : Observable<T> {
        return this.http.put<T>(url,body)
    }

    delete<T>(url: string) : Observable<T> {
        return this.http.delete<T>(url)
    }

}