import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login, signUp } from 'data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  invaliduserAuth = new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(user: signUp) {
    this.http.post(`http://localhost:3000/users`, user, { observe: 'response' })
      .subscribe((result) => {
        console.warn(result);
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body))
          this.router.navigate(['/']);
        }
      })
  }

  userLogin(data:Login){
    this.http.get<signUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
    {observe:'response'}
    ).subscribe((result)=>{
      if(result && result.body?.length){
        localStorage.setItem('user',JSON.stringify(result.body[0]));
        this.router.navigate(['/']);
        this.invaliduserAuth.emit(false)
      }else{
        this.invaliduserAuth.emit(true)
      }
    })
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
}
