import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Configs } from '../../app.config';
@Injectable()
export class SearchBehaviorService {
    private messageSource = new BehaviorSubject<any>('');
    currentMessage = this.messageSource.asObservable();
    constructor(private http: Http) { }

    sendKeySearch(value, type) {
        const request = {
            value: value,
            type: type
        };
        this.messageSource.next(request);
    }
    getData(key): Observable<any> {
        const url = Configs.YOUTUBE.youtube;
        const link = {
            url: 'https://www.youtube.com/results?search_query=' + key
        };
        return this.http.post(url, link).map((result) => {
            return result;
        });
    }
}
