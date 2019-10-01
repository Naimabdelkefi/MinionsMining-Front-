import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-minions',
  templateUrl: './minions.component.html',
  styleUrls: ['./minions.component.css']
})
export class MinionsComponent implements OnInit, OnChanges {

  constructor() { }
  @Input()
  cas: string = 'start';
  ngOnInit() {
    console.log(this.cas);
  }
  ngOnChanges(changes: SimpleChanges) {
   console.log(this.cas);
  }
}
