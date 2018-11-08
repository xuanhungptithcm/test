import { Router } from '@angular/router';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../Shared/services/authentication.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.scss']
})
export class LoginComponent implements OnInit {

  firstName = new FormControl('', [Validators.required, Validators.maxLength(15)]);
  lastName = new FormControl();
  email = new FormControl('');
  code = new FormControl('');
  password = new FormControl('');
  phoneNumber = new FormControl();
  companyName = new FormControl();
  isLoginForm: Boolean = true;
  isSignUpForm: Boolean = false;
  isAdmin: Boolean = true;
  isForgot: Boolean = false;
  isActive: Boolean = false;
  isLanguage: String = 'vn';
  constructor(private route: Router,
    private authenService: AuthenticationService,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef,
    private translate: TranslateService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    if (localStorage.getItem('language') === 'vn') {
      translate.setDefaultLang('vn');
      this.isLanguage = 'vn';
    } else {
      translate.setDefaultLang('en');
      this.isLanguage = 'en';
    }
  }

  ngOnInit() {
    // if(localStorage.getItem('x')){
    //   this.route.
    // }
    this.route.navigate(['./home']);
  }
  resetForm() {
    this.firstName.setValue('');
    this.lastName.setValue('');
    this.email.setValue('');
    this.password.setValue('');
  }
  changeForm(value) {
    if (value === 'login') {
      this.isLoginForm = true;
      this.isSignUpForm = false;
      this.isForgot = false;
      this.isActive = false;
      this.resetForm();
    }
    if (value === 'signup') {
      this.isLoginForm = false;
      this.isSignUpForm = true;
      this.isForgot = false;
      this.isActive = false;
      this.resetForm();
    }
    if (value === 'forgot' && this.isAdmin) {
      this.isForgot = true;
      this.isLoginForm = false;
      this.isSignUpForm = false;
      this.isActive = false;
      this.resetForm();
    }
    if (value === 'active' && !this.isActive) {
      this.isForgot = false;
      this.isLoginForm = false;
      this.isSignUpForm = false;
      this.isActive = true;
      this.resetForm();
    }
  }
  register() {
    if (this.email.value === '' || this.password.value === '') {
      this.toastr.error('Email, Email is required', 'Error!');
    } else {
      const formData = {
        lname: this.lastName.value,
        fname: this.firstName.value,
        numberPhone: this.phoneNumber.value,
        company: this.companyName.value,
        email: this.email.value,
        password: this.password.value
      };
      this.authenService.register(formData).subscribe((result) => {
        console.log(result);
        this.changeForm('active');
      });
    }

  }
  login() {
    localStorage.setItem('x', 'x');
    if (this.email.value === '' || this.password.value === '') {
      this.toastr.error('Email, Email is required', 'Error!');
    } else {
      const formData = {
        email: this.email.value,
        password: this.password.value
      };
      this.authenService.login(formData).subscribe((result) => {
        if (result.message === 'PASS_WRONG') {
          this.toastr.error(result.message, 'ERRR');
        } else if (result.message === 'USER_NOT_ACTIVATE') {
          this.toastr.warning(result.message, 'PLease check email and active by code!');
        } else if (result.message === 'EMAIL_NOT_VALID') {
          this.toastr.warning(result.message, 'ERRR');
        } else {
          this.toastr.success('Login Success');
          localStorage.setItem('x', result.token);
          this.route.navigate(['./home']);
        }
      });
    }

  }

  active() {
    const formData = {
      email: this.email.value,
      code: this.code.value
    };
    if (this.email.value === '' || this.code.value === '') {
      this.toastr.error('Email, Code is required', 'Error!');
    } else {
      this.authenService.active(formData).subscribe((result) => {
        const response = result.message;
        if (response === 'USER_NOT_FOUND') {
          this.toastr.error(response, 'Error!');
        }
        if (response === 'INVALID_CODE') {
          this.toastr.error(response, 'Error');
        }
        if (response === 'ACTIVATE_SUCCESS') {
          this.toastr.success(response, 'OK!!');
          this.changeForm('login');
        }
      });
    }
  }

  forgot_Password() {
    this.authenService.forgot_Password({ email: this.email.value }).subscribe(result => {
      const response = result.message;
      if (response === 'USER_NOT_FOUND') {
        this.toastr.error(response, 'ERROR');
      } else if (response === 'SYSTEM_ERROR') {
        this.toastr.error(response, 'ERROR');
      } else {
        this.isLoginForm = true;
        this.isSignUpForm = false;
        this.isForgot = false;
        this.isActive = false;
        this.resetForm();
      }
    });
  }
  switchLanguage(language: string) {
    this.translate.use(language);
  }
  changedNhiemVu(value) {
    if (value.target.value !== '') {
      console.log('oke');
      this.switchLanguage(value.target.value);
      localStorage.setItem('language', value.target.value);
      this.isLanguage = value.target.value;
    }
  }

}
