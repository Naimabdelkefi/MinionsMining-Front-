import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import swal from 'sweetalert2';
import {Http, RequestOptions, Headers} from "@angular/http";
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.css']
})
export class InputsComponent implements OnInit {
  @Output()
  sentiment = new EventEmitter();
  str: string;
  data: any = null;
  public headers = new Headers({'Accept': '*/*', 'X-Requested-With': 'XMLHttpRequest'})
  public options = new RequestOptions({headers: this.headers});
  constructor(public http: Http) { }

  ngOnInit() {
    this.sentiment.emit({value: 'start'});
  }
  onSubmitGo() {
    this.http.post("http://127.0.0.1:4200/api/upload/message", {message: this.str}, this.options).pipe(map(resp=>resp.json())).subscribe(
      (res:any) => {
        this.sentiment.emit({value: res.sentiment});
        let str1 = 'Lang:' + res.lang;
        let str2 = 'Lang Id Match: '+ parseFloat(res.match).toFixed(3) * 100 + '%';
        let html1 = '<p>'+ str2 + '</p><br>' + '<p>Sentiment: '+ res.sentiment+'</p><br><p>Sentiment Match:'+ parseFloat(res.sentimentmatch).toFixed(3)*100 +'%';+'</p>';
        swal({
          width: 600,
          type: 'success',
          background: '#fff url(/assets/images/check.png) no-repeat left  / 15em ',
          title: str1,
          html: html1,
          position: 'center-right'
        });
        console.log(res);
      },
      err => {
        console.log("Error occured");
      }
    );
   // window.location.reload();
  }
  onFileChange(event) {
    let file = event.target.files[0];
    let fileName = file.name;
    let html = "";
    console.log(fileName);
    this.http.get('http://127.0.0.1:4200/api/upload/file/' + fileName).pipe(map(resp => resp.json())).subscribe(
      (res: any) => {
        console.log(res);
        for (let entry of res) {
          html = html + '<tr>\n' +
            '<td>' + entry.message + '</td>\n' +
            '<td>' + entry.lang + '</td>\n' +
            '<td>' + parseFloat(entry.match).toFixed(3) * 100 + '%' + '</td>\n' +
            '<td>' + entry.sentiment + '</td>\n' +
            '<td>' + parseFloat(entry.sentimentmatch).toFixed(3) * 100 + '%' + '</td>\n' +
            '</tr>';
        }
        let swal_html = '<table class="table table-sm ">\n' +
          '  <thead>\n' +
          '    <tr class="table-primary">\n' +
          '      <th scope="col">Message</th>\n' +
          '      <th scope="col">Lang</th>\n' +
          '      <th scope="col">Match</th>\n' +
          '      <th scope="col">Sentiment</th>\n' +
          '      <th scope="col">Sentiment Match</th>\n' +
          '    </tr>\n' +
          '  </thead>\n' +
          '  <tbody>\n' +
          html +
          '  </tbody>\n' +
          '</table>';

        swal({
          width: 800,
          html: swal_html,
          position: 'center',
          function () {
            window.location.reload();
          }
        });
      },
      err => {
        console.log("Error occured");
      }
    );

  }}

}
