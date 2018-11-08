import { AuthenticationService } from './../../../Shared/services/authentication.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-manager-user',
  templateUrl: './manager-user.component.html',
  styleUrls: ['./manager-user.component.css']
})
export class ManagerUserComponent implements OnInit {
  private users;

  constructor(private authenService: AuthenticationService,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  user1: Boolean = false;
  ngOnInit() {
    this.authenService.get_All_User_User().subscribe(result => {
      this.users = result.result;
    });
  }


  block_User(id) {
    this.authenService.block_User(id).subscribe(result => {
      const message = result.message;
      if (message === 'SYSTEM_ERROR') {
        this.toastr.error(message, 'ERROR!');
      }
      if (message === 'BLOCK_SUCCESS') {
        this.toastr.success(message, 'OK!');
        this.user1 = !this.user1;
      }
    });
  }

  Unblock_User(id) {
    this.authenService.unblock_User(id).subscribe(result => {
      const message = result.message;
      if (message === 'SYSTEM_ERROR') {
        this.toastr.error(message, 'ERROR!');
      }
      if (message === 'UNBLOCK_SUCCESS') {
        this.toastr.success(message, 'OK!');
        this.user1 = !this.user1;
      }
    });
  }
}
