import { Component, OnInit } from '@angular/core';
import { Task, WorkerServiceService } from '../../services/worker-service.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ServerTokenService } from '../../services/server-token.service';
import { CustomAuthServiceService } from '../../auth/custom-auth-service.service';
import { environment } from '../../environment/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss'],
})
export class UploadFilesComponent implements OnInit {
  overview: any;
  general: any;
  LE: any;
  optimization: any;
  risk: any;
  overviewF: any;
  generalF: any;
  LEF: any;
  optimizationF: any;
  riskF: any;
  jobs: string
  showTable: boolean;
  arrayBuffer: any;
  file: File;
  files: any[];
  showExistngFiles: boolean = false
  arr = { b: [1, 2, 3, 4] };
  existingFiles

  constructor(public dataService: WorkerServiceService, private http: HttpClient,
    private server: ServerTokenService, private route: Router) {
    this.showTable = false;
    this.files = dataService.files;

    setTimeout(() => {
      this.arr = { b: [10, 10, 10] };
    }, 5 * 1000);
  }

  incomingfile(event) {
    this.file = event.target.files[0];
    this.files.push(this.file);
  }

  showFiles() {
    this.server.getWithToken('files/fileData').subscribe(data => {
      if (data) {
        this.showExistngFiles = true
        this.existingFiles = data
        console.log(this.existingFiles);


      }
    })
  }

  userAnswersClick(event, job: string, i?: number, j?: number) {
    this.dataService.jobs.push(job)

    this.existingFiles[j].fileArray[i].process = job

  }

  Upload() {
    const formData = new FormData();
    for (let i = 0; i < this.files.length; i++) {
      formData.append('uploads[]', this.files[i], this.files[i].name);
    }
    this.http.post('http://localhost:3000/api/upload', formData, {
      reportProgress: true,
      observe: 'events',
    }).subscribe(resp => {
      if (resp.type === HttpEventType.Response) {
        // tslint:disable-next-line:no-console
      }
      if (resp.type === HttpEventType.UploadProgress) {
        const percentDone = Math.round(100 * resp.loaded / resp.total);
        // tslint:disable-next-line:no-console
      }
    });
  }
  remove(file) {
    this.files.splice(this.files.indexOf(file), 1);
    // const fileArray = Array.from(this.files);

    // for (let i = 0; i < fileArray.length; i++) {
    //   if (fileArray[i].name === fileName) {
    //     fileArray.splice(i, 1);
    //     break;
    //   }

    // }
    // this.files = fileArray;
  }




  readTableFile(e) {


    /* create workbook */
    // Data will be logged in array format containing objects


    // const binarystr: string = e.target.result;
    // const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
    //
    /// * selected the first sheet */
    // const wsname: string = wb.SheetNames[0];
    // const ws: XLSX.WorkSheet = wb.Sheets[wsname];
    //
    /// * save data */
    // const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}

    // this.files = e.target.files;
    // for (let index = 0; index < e.target.files.length; index++) {
    //   const element = e.target.files[index];
    //   this.files.push(element);
    // }

    let numOfFiles = e.target.files.length
    let done = 0
    let files = []
    for (let i = 0; i < e.target.files.length; i++) {
      const reader = new FileReader();
      console.log('dddd');

      const fileInfo = e.target.files[i];
      if (fileInfo) {
        reader.readAsBinaryString(e.target.files[i]);
        reader.onload = () => {
          const count = reader.result.toString().match(/\/Type[\s]*\/Page[^s]/g).length
          if (count >= 500) {
            alert('Files containing more than 500 pages cannot be uploaded. The problematic file has been removed.')
          } else {
            files.push(e.target.files[i])
          }
          done++
          if (numOfFiles == done && files.length > 0) {
            this.dataService.updateListFiles(files);
          }
        }
      }
    }
  }


  uploadImage(e) {
    const file = e.target.files[0];
    const data = {
      filename: Date.now() + '_' + file.name,
      content_type: file.type,
      filepath: 'graphs',
    };
    /*
        this.viewGraph = true;
        this.tokenService.postFileToAws('getUrl', data, file, file.name).subscribe(res =>{
          this.graphSrc = res.baseUrl + '/' + res.fileName

        })*/
  }



  goToDocument() {
    /*   if(!this.bgImage)
       {
         this.bgImage = 	"https://list-angular.s3.us-east-2.amazonaws.com/public-images/headerImage";
         this.bgImage += 	Math.floor(Math.random() * Math.floor(24))+1;
         this.bgImage += 	".jpg";
       }
       this.data['bgImage'] = this.bgImage;
       this.data['graphImageUrl'] = this.graphSrc;

       this.route.navigate(['/manage/policy-document'], {
         state: { localDocument: true, data: this.data }
       });*/

  }


  csvJSON(csvText): Array<object> {
    const lines = [];
    const linesArray = csvText.split('\n');
    // for trimming and deleting extra space
    linesArray.forEach((e: any) => {
      const row = e.replace(/[\s]+[,]+|[,]+[\s]+/g, ',').trim();
      lines.push(row);
    });
    // for removing empty record
    lines.splice(lines.length - 1, 1);
    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {

      const obj = {};
      const currentline = lines[i].split(',');

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    // return result; //JavaScript object
    // return JSON.stringify(result); //JSON
    return result;
  }

  csv2JSON(csv): any {
    const lines = csv.split('\n');
    const result = {};
    const headers = lines[0].split(',');
    const linesObj = this.getLines(lines);
    for (let index = 0; index < headers.length; index++) {
      const element = headers[index];
      if (linesObj[1] && linesObj[1][index]) {
        const arr = [];
        for (let index2 = 0; index2 < linesObj.length; index2++) {
          const element2 = linesObj[index2];
          if (element2[index]) {
            arr.push(element2[index].replace('nl', '\n'));
          }
        }
        result[headers[index]] = arr;
      } else {
        result[headers[index]] = linesObj[0][index].replace('nl', '\n');
      }
    }

    // return result; //JavaScript object
    return result; // JSON
  }

  getLines(lines) {
    const array = [];
    for (let index = 1/* skeep headers */; index < lines.length; index++) {
      const element = lines[index];
      array.push(element.split(','));
    }
    return array;

  }

  process() {
    if (this.dataService.demo) {
      this.processDemo()
      return
    }

    let dirIndex = prompt("Enter file index")
    let pacientName = prompt("Enter patient name");
    let dirName = dirIndex + '_' + pacientName
    if (this.dataService.isFileUpkoadProccess) {
      return;
    }
    // return;
    // tslint:disable-next-line:no-console
    console.log(this.files.length);
    
    const fileArray = Array.from(this.files);
    let index = 0;
    this.dataService.dirIndex = dirIndex;
    this.dataService.pacientName = pacientName;
    this.dataService.dirName = dirIndex + '_' + pacientName;
    this.dataService.jobs.push('full')



    fileArray.map((item, ind) => {
      item['fileProgress'] = 0;
      item['listName'] = pacientName + (ind + 1) + '.pdf';
      // new Task().start('Uploading data', item, Math.random() * 10 * 1000, 'fileProgress', () => {
      //   index ++;
      //   if (index === fileArray.length) {
      //     // this.dataService.proccess();
      //     this.dataService.isFileUpkoadProccessDone = true;
      //   }
      // });
      new UploadFileTask().start(this.server, item, 'fileProgress', dirName, item['listName'], () => {
        index++;
        if (index === fileArray.length) {
          // this.dataService.proccess();
          this.dataService.isFileUpkoadProccessDone = true;
        }
      });

    });
    this.dataService.files = fileArray;
    this.dataService.isFileUpkoadProccess = true;
    // this.Upload();
    // alert(this.isProcessed );
    let fileData = {
      dirIndex: dirIndex,
      pacientName: pacientName,
      dirName: dirIndex + '_' + pacientName,
      numOfFiles: fileArray.length,
      fileArray: fileArray,
      jobStatus: null
    }
    this.server.postWithToken('files/fileData', fileData).subscribe(data => {
    })

  }

  getJobs() {
    this.server.getWithToken('workflow/getJobs').subscribe(data => {
      let jobs = Object.keys(data)
     console.log(jobs);
     
    })

  }


  processDemo() {
    let dirIndex = prompt("Enter file index")
    let pacientName = prompt("Enter patient name");
    let dirName = dirIndex + '_' + pacientName
    if (this.dataService.isFileUpkoadProccess) {
      return;
    }
    // return;
    // tslint:disable-next-line:no-console
    const fileArray = Array.from(this.files);
    let index = 0;
    this.dataService.dirIndex = dirIndex;
    this.dataService.pacientName = pacientName;
    this.dataService.dirName = dirIndex + '_' + pacientName;


    fileArray.map((item, ind) => {
      item['fileProgress'] = 0;
      item['listName'] = pacientName + (ind + 1) + '.pdf';
      new Task().start('Uploading data', item, Math.random() * 10 * 1000, 'fileProgress', () => {
        index++;
        if (index === fileArray.length) {
          this.dataService.proccess();
          this.dataService.isFileUpkoadProccessDone = true;
        }
      });
      // new UploadFileTask().start(this.server, item, 'fileProgress', dirName, item['listName'],  () => {
      //   index ++;
      //   if (index === fileArray.length) {
      //     this.dataService.proccess();
      //     this.dataService.isFileUpkoadProccessDone = true;
      //   }
      // });

    });
    this.dataService.files = fileArray;
    this.dataService.isFileUpkoadProccess = true;
    // this.Upload();
    // alert(this.isProcessed );
  }

  processExistingFile(dirIndex: string, pacientName: string, fileArray: any[]) {
    if (this.dataService.isFileUpkoadProccess) {
      return;
    }
    // return;
    // tslint:disable-next-line:no-console
    // const fileArray = Array.from(this.files);
    this.dataService.dirIndex = dirIndex;
    this.dataService.pacientName = pacientName;
    this.dataService.dirName = dirIndex + '_' + pacientName;

    this.dataService.files = fileArray;
    this.dataService.isFileUpkoadProccessDone = true;
    this.dataService.isFileUpkoadProccess = true;
    console.log(dirIndex, pacientName, fileArray);

    // this.Upload();
    // alert(this.isProcessed );
  }

  ngOnInit() {
    this.getJobs()
  }

  addUser() {
    this.route.navigateByUrl('/manage/add')
  }

}

class UploadFileTask {
  start(server: ServerTokenService, file, progressFeildName, dirName, fileName, callback) {
    const data = {
      filename: dirName + '/' + fileName,
      content_type: file.type
    }

    server.postFileToAws('getUrl', data, file, dirName).subscribe(res => {
      file[progressFeildName] = res.progress;

      if (res.done) {
        callback()
      }
    });

  }
}
