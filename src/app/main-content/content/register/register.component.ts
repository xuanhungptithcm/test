import { AuthenticationService } from './../../../Shared/services/authentication.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  firstName = new FormControl();
  lastName = new FormControl();
  email = new FormControl();
  password = new FormControl();
  phoneNumber = new FormControl();
  companyName = new FormControl();
  myCode = new FormControl();
  yourCode = new FormControl();
  isUpdate: Boolean = true;
  isAdmin: Boolean = false;
  isChangeAdmin: Boolean = false;
  isCode: Boolean = false;
  user;
  constructor(private toastr: ToastsManager,
    private vcr: ViewContainerRef,
    private authenService: AuthenticationService) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  ngOnInit() {
    this.authenService.find_User_By_Token(localStorage.getItem('x')).subscribe(result => {
      this.user = result.result.obj;
    });
  }

  changeAdmin() {
    // your code
    this.isUpdate = false;
    this.isChangeAdmin = true;
  }
  updateUser() {
    const formData = {
      lname: this.lastName.value,
      fname: this.firstName.value,
      numberPhone: this.phoneNumber.value,
      company: this.companyName.value,
      password: this.password.value
    };
  }
  send_Email_Update() {
    const formdata = {
      email_me: this.user.email,
      email_other: this.email.value
    };
    this.authenService.send_Mail_Change_Admin(formdata).subscribe(result => {
      const response = result.result;
      const message = result.message;
      if (message === 'USER_NOT_FOUND') {
        this.toastr.error(message, '404');
      }
      if (message === 'USER_NOT_ACTIVATE') {
        this.toastr.warning(message, 'ACTIVATE NOW!');
      }
      if (message === 'SYSTEM_ERROR') {
        this.toastr.error(message, 'ERROR!');
      }
      if (response === 'SEND_MAIL_TO_CHANGE_SUCCESS') {
        this.toastr.success(response, 'OK!');
        this.isChangeAdmin = false;
        this.isCode = true;
      }
    });
  }
  backToMenu() {
    this.isCode = false;
    this.isChangeAdmin = false;
    this.isUpdate = true;
  }
  verify_Code() {
    const formdata = {
      email_me: this.user.email,
      email_other: this.email.value,
      code_me: this.myCode.value,
      code_other: this.yourCode.value
    };
    this.authenService.verify_Change_Admin(formdata).subscribe(result => {
      const response = result.result;
      const message = result.message;
      if (message === 'INVALID_CODE_OTHER') {
        this.toastr.warning(message, 'Wrong');
      }
      if (message === 'INVALID_CODE_ME') {
        this.toastr.warning(message, 'Wrong');
      }
      if (message === 'SYSTEM_ERROR') {
        this.toastr.error(message, 'ERROR!');
      }
      if (response === 'CHANGE_ADMIN_SUCCESS') {
        this.authenService.refesh_Token_Change_Admin(formdata.email_me).subscribe(result => {
          localStorage.removeItem('x');
          localStorage.setItem('x', result.result);
          this.toastr.success(response, 'OK!');
        })
      }
    });
  }


}

