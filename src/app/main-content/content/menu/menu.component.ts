import { AuthenticationService } from './../../../Shared/services/authentication.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FileService } from '../../../Shared/services/file.service';
import { Router } from '@angular/router';
import { SearchBehaviorService } from '../../../Shared/services/searchBehavior.service';
import { TranslateService } from '@ngx-translate/core';
declare var $: any;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  isOpenMenu = false;
  user = {
    name: 'Xuân Hưng',
  };
  user1 = {
    roleId: 1
  };

  constructor(
    private fileService: FileService, private route: Router,
    private searchBehavior: SearchBehaviorService,
    private translate: TranslateService,
    private authenService: AuthenticationService
  ) {
    if (localStorage.getItem('language') === 'vn') {
      translate.setDefaultLang('vn');
      this.isLanguage = 'vn';
    } else {
      translate.setDefaultLang('en');
      this.isLanguage = 'en';
    }

  }
  isDashboard: Boolean = false;
  isListMusic: Boolean = false;
  isManagerUser: Boolean = false;
  isUpdateUser: Boolean = false;
  isLanguage: String = 'vn';
  isYoutube: Boolean = false;
  isLocal: Boolean = true;
  typesearch: Boolean = false;
  inputSearch = new FormControl('');
  url: any;
  ngOnInit() {
    this.authenService.find_User_By_Token(localStorage.getItem('x')).subscribe(result => {
        this.user1 = result.result.obj;
    });
    this.url = this.route.url;
    if (this.url === '/home/dashboard') {
      this.isDashboard = true;
      this.isListMusic = false;
      this.isUpdateUser = false;
      this.isManagerUser = false;
    }
    if (this.url === '/home/listmusic') {
      this.isDashboard = false;
      this.isListMusic = true;
      this.isUpdateUser = false;
      this.isManagerUser = false;
    }
    if (this.url === '/home/manager') {
      this.isDashboard = false;
      this.isManagerUser = true;
      this.isListMusic = false;
      this.isUpdateUser = false;
    }
    if (this.url === '/home/register') {
      this.isDashboard = false;
      this.isUpdateUser = true;
      this.isListMusic = false;
      this.isManagerUser = false;
    }
    $('.dropdown-el').click(function (e) {
      e.preventDefault();
      e.stopPropagation();
      $(this).toggleClass('expanded');
      $('#' + $(e.target).attr('for')).prop('checked', true);
    });
  }
  open_Menu() {
    this.isOpenMenu = !this.isOpenMenu;
  }
  changeMenu(menu) {
    if (menu === 1) {
      this.isDashboard = true;
      this.isListMusic = false;
      this.isUpdateUser = false;
      this.isManagerUser = false;
    }
    if (menu === 2) {
      this.isDashboard = false;
      this.isListMusic = true;
      this.isUpdateUser = false;
      this.isManagerUser = false;
    }
    if (menu === 3) {
      this.isDashboard = false;
      this.isManagerUser = true;
      this.isListMusic = false;
      this.isUpdateUser = false;
    }
    if (menu === 4) {
      this.isDashboard = false;
      this.isUpdateUser = true;
      this.isListMusic = false;
      this.isManagerUser = false;
    }
  }
  fileChangeEvent(fileInput: any) {
    const formData: any = new FormData();
    const files: File = fileInput.target.files;
    console.log(files);
    this.fileService.uploadFile(formData, 'userId').subscribe(result => {
    });
  }
  logout() {
    localStorage.removeItem('x');
    this.route.navigate(['../login']);
  }
  searchAudio() {
    let type;
    if (this.isYoutube) {
      type = 'youtube';
    } else {
      type = 'local';
    }
    this.searchBehavior.sendKeySearch(this.inputSearch.value, type);
  }
  switchLanguage(language: string) {
    this.translate.use(language);
  }
  changedNhiemVu(value) {
    if (value !== this.isLanguage) {
      this.switchLanguage(value);
      localStorage.setItem('language', value);
      this.isLanguage = value;
    }
  }
  changeTypeSearch(value) {
    this.typesearch = true;
    if (value === 'youtube') {
      this.isYoutube = true;
      this.isLocal = false;
      this.typesearch = false;
    } else {
      this.isYoutube = false;
      this.isLocal = true;
      this.typesearch = false;
    }
  }

}
