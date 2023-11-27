import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { User } from './users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.URL + '/user').pipe(
      catchError((error) => {
        return throwError(() =>
          this.toastr.error('Error: ' + error.message, 'Error', {
            timeOut: 3000,
            closeButton: true,
          })
        );
      })
    );
  }
}
