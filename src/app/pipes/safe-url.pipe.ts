import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Pipe({
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    const id = url.toString().substring(9, 20);
    console.log(id);
    url = 'https://www.youtube.com/embed/' + id;
    const videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    console.log(videoUrl);
    return videoUrl;
  }

}
