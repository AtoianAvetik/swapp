import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

class ApiError {
    constructor(public status: number, public type: string, public message: string, public body: any) {
    }
}

@Injectable()
export class ApiService {
    private url = environment.api;
    private headers = new HttpHeaders({'Content-type': 'application/json'});
    private options = {
        headers: this.headers,
        params: new HttpParams()
    };

    constructor(private http: HttpClient, private $toastr: ToastrService) {

    }

    get(path, absolutePath = false) {
        return this.http.get(absolutePath ? path : `${this.url + path}`, this.options)
            .pipe(
                catchError(err => this.handleErrors(err))
            );
    }

    handleErrors(err) {
        switch (err.status) {
            case 400: {
                this.$toastr.error('Bad Request', 'Error!');
                break;
            }
            case 401: {
                this.$toastr.error('You are not authorized', 'Unauthorized error!');
                break;
            }
            case 403 : {
                this.$toastr.error('You are not allowed to perform this action', 'Permission error!');
                break;
            }
            case 500: {
                this.$toastr.error('Server Error', 'Error!');
                break;
            }
        }
        return throwError(
            new ApiError(
                err.status,
                err.error && err.error.type || err.name,
                err.error && err.error.message || err.statusText,
                err.error.errors
            )
        );
    }
}
