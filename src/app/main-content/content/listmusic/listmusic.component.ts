import { AudioModel } from './audio.model';
import { SearchBehaviorService } from './../../../Shared/services/searchBehavior.service';
import { Http } from '@angular/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AudioService } from '../../../Shared/services/audio.service';
import { Subscription } from 'rxjs/Subscription';

declare var $: any;
@Component({
  selector: 'app-listmusic',
  templateUrl: './listmusic.component.html',
  styleUrls: ['./listmusic.component.css']
})
export class ListmusicComponent implements OnInit, OnDestroy {


  constructor(private audioService: AudioService,
    private searchBehavior: SearchBehaviorService,
    private searchBehaviorService: SearchBehaviorService
  ) { }
  listAudio: any[];
  listSearch: any[];
  tam: any = 0;
  audioSearch: String;
  subcriber: Subscription[] = [];
  isShowIframe = false;
  idVideo1: String = '';
  listYoutube = [];
  idVideo: String;
  listVideo = [];
  ngOnInit() {
    this.get_List();
    this.subcriber.push(
      this.searchBehavior.currentMessage.subscribe(mess => {
        this.listVideo = [];
        console.log(mess);
        // console.log(mess);
        try {
          // console.log('oke');
          if (mess.type === 'local') {
            this.filterList(mess);
          }
          if (mess.type === 'youtube') {
            const text = mess.value.toString();
            const tap = text.split(' ').join('+');
            this.getVideoYoutube(tap);
          }
        } catch (error) {
        }
      })
    );

  }

  getVideoYoutube(key) {
    this.isShowIframe = true;
    this.searchBehaviorService.getData(key).subscribe((result) => {
      const data = JSON.parse(result._body);
      this.listVideo = data;
      console.log(this.listVideo);
    });
  }
  filterList(res) {
    // console.log(res);
    this.listSearch = this.listAudio.filter(audio => {
      this.isShowIframe = false;
      audio = audio.substr(audio, audio.length - 3);
      return audio.toString().toLowerCase().indexOf(res.value.toLowerCase()) !== -1;
    });
  }
  get_List() {
    this.audioService.get_List_Audio().subscribe((list) => {
      this.listAudio = list.files;
    });
  }
  trackByFn(index, item) {
    return item;
  }
  playMusic(audio, i) {
    // #\30 > div.weekly_left > div > div.w_tp_song_img > div.ms_play_icon
    // ms_active_play#\30 > div.weekly_left > div > div.w_tp_song_img > div.ms_play_icon
    $('#' + this.tam).removeClass('ms_active_play');
    $('#' + i).addClass('ms_active_play');
    $('#' + this.tam + ' .weekly_left .w_tp_song_img .ms_play_icon').html(`<img src="../../../../assets/images/svg/play.svg" alt="">`);
    $('#' + i + ' .weekly_left .w_tp_song_img .ms_play_icon').html(`<div class="ms_bars">
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div></div>`);
    this.tam = i;
    const filename = {
      filename: audio
    };
    this.audioService.play_Audio(filename).subscribe((result) => {
      // console.log(result);
    });

  }
  ngOnDestroy(): void {
    this.subcriber.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
