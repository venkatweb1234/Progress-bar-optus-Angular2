import { Component, OnInit } from '@angular/core';
import { BarService } from './components/service';
import { IResults } from './interface/results';

//Component Declarartion for Selector and Directives.
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BarService]
})
//Angular calls this method once it initializes child components and the current component implenets the OnInit.
export class AppComponent implements OnInit {
  Result: IResults[];
  width: number = 0;
  num_bars = 0;
  barLimit = 0;
  num_btn = 0;
  index = 0;
  constructor(private _barService: BarService) { }
  //A lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. 
  //Define an ngOnInit() method to handle any additional initialization tasks.
  ngOnInit() {
    //angular subscribe is used with Observable, here you can find all the information
    this._barService.getService()
      .subscribe(serviceData => {
        this.Result = serviceData;
        this.num_bars = this.Result['bars'].length;
        this.num_btn = this.Result['buttons'].length;
        this.barLimit = this.Result['limit'];
      });

  }

  // The following snippet shows how a component can implement this interface to define its own initialization method for extra Events
  public addincrementValues(event) {
    this.progreesBars(parseInt(event.target.attributes.value.nodeValue));

  }
  public progreesBars(value) {
    let limit=this.barLimit;
    var elem = this.byId('bar_' + this.index), max, type = 'inc';
    var lab = this.byId('label_' + this.index);
    var width = parseInt(lab.innerHTML);
    var timer = setInterval(frame, 10);

    if (isNaN(width))
      width = 0;
    max = width + value;

    if (max < width)
      type = 'dec';
    function frame() {

      if (type == 'inc')
        width++;
      else
        width--;
      if (width == max || max == 0)
        clearInterval(timer);
      if (width >= 0 && width <= limit) {
        lab.innerHTML = width + '%';
        elem.style.width = width + '%';
        elem.style.backgroundColor = 'green';
      }
      else if (width > limit) {
        lab.innerHTML = width + '%';
        elem.style.backgroundColor = 'red';
      }
    }
  }
  //The following snippet shows how a component can implement this interface to define its own initialization method for Events
  public addchangeprogressbar(event) {
    var val = event.value;
    this.index = val;
    for (var i = 0; i < this.num_bars; i++) {
      this.byId('myProgress_' + i).classList.remove("mystyle");
    }
    this.byId('myProgress_' + this.index).classList.add("mystyle");
  }

  public byId(id) {
    return document.getElementById(id);
  }
}
