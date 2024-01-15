import { Component } from '@angular/core';
import { Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm= this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',Validators.required]
  })
  constructor(private fb: FormBuilder,private authService:AuthService,private router:Router,private msgService:MessageService) {}
  get email(){
    return this.loginForm.controls['email'];
  }
  get password(){
    return this.loginForm.controls['password'];
  }
  loginUser(){
    const {email, password}=this.loginForm.value;
    this.authService.getUserByEmail(email as string ).subscribe(
      response=>{
        if(response.length>0 && response[0].password ===password){
          sessionStorage.setItem('email',email as string);
          this.router.navigate(['home']);
        }else{
          this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Email or password is wrong' });
        }
      },
      error=>{
        this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      }
    )
  }
  // loginUser() {
  //   const { email, password } = this.loginForm.value;
    
  //   this.authService.getUserByEmail(email as string).subscribe(
  //     (response) => {
  //       if (response && response.length > 0 && response[0].password === password) {
  //         sessionStorage.setItem('email', email as string);
  //         this.router.navigate(['home']);
  //       } else {
  //         this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Email or password is wrong' });
  //       }
  //     },
  //     (error) => {
  //       console.error('Error during login:', error);
  //       this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
  //     }
  //   );
  // }
  // loginUser() {
  //   const { email, password } = this.loginForm.value;
  //   console.log('Login user with email:', email);
  
  //   this.authService.getUserByEmail(email as string).subscribe(
  //     (response) => {
  //       console.log('API response:', response);
  
  //       if (response && response.length > 0 && response[0].password === password) {
  //         console.log('Login successful!');
  //         sessionStorage.setItem('email', email as string);
  //         this.router.navigate(['home']);
  //       } else {
  //         console.log('Login failed: Email or password is wrong');
  //         this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Email or password is wrong' });
  //       }
  //     },
  //     (error) => {
  //       console.error('Error during login:', error);
  //       this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
  //     }
  //   );
  // }
  
}
