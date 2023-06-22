import { Component, OnInit } from '@angular/core';
import { writeFileXLSX } from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'xlsxDemo';
  finalData: Array<any> = [];
  currentIteration: number = 1500000;

  ngOnInit(): void {
    if (typeof Worker !== 'undefined') {
      // Create a new
      for(let i = 1; i <= Math.ceil(this.currentIteration / 10000); i++) {
      const worker = new Worker(new URL('./workers/getdata.worker', import.meta.url));
      worker.onmessage = ({ data }) => {
        this.finalData.push(...(data as Array<any>));
        console.log('final: ', this.finalData);
      };
      worker.postMessage(Math.ceil(this.currentIteration / 10000) === 1 ? this.currentIteration : i * 10000);
     }
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }

  downloadFile() {
    console.log('Download Starting:');
    if (typeof Worker !== 'undefined') {
      const worker = new Worker(new URL('./workers/download.worker', import.meta.url));
      worker.onmessage = (e: any) => {
        console.log('e.data: ', e);
        writeFileXLSX(e.data, "SheetJSAngularAoO.xlsx")

        /* this mantra is the standard HTML5 download attribute technique */

      };
      worker.postMessage(this.finalData);
    }
  }
}



