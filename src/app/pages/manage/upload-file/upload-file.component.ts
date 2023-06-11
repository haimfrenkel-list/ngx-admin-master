import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable, observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { FormControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { DomSanitizer } from '@angular/platform-browser';
import { ServerTokenService } from '../../../services/server-token.service';


export interface FileElement {
  name: string;
  index: number;
  weight: number;
  upload: boolean;
  position: number;
}



@Component({
  selector: 'ngx-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {


  imageToUpload: File = null;
  selectedImage: string = 'https://dummyimage.com/318x200/000/fff';
  selectedPdf: string = 'https://dummyimage.com/318x200/000/fff';

  caption = 'Choose an image';

  captionPdf = 'Choose a PDF';




  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.imageToUpload = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.imageToUpload);
      reader.onload = e => this.selectedImage = reader.result.toString();
      this.caption = event.target.files[0].name;
    }
  }

  onSelectPdfFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.imageToUpload = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.imageToUpload);
      reader.onload = e => this.selectedPdf = reader.result.toString();
      this.captionPdf = event.target.files[0].name;
    }
  }


  uploadForm: FormGroup;

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private toastr: NbToastrService,
    private changeDetectorRefs: ChangeDetectorRef,
    //protected windowRef: NbWindowRef,
    private _formBuilder: FormBuilder, public sanitizer: DomSanitizer,
    private server: ServerTokenService) {


  }

  fileToUpload: FileList = null;
  FILES_DATA: FileElement[] = null;
  displayedColumns: string[] = ['name', 'index', 'weight', 'upload', 'position'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  dataSource = new MatTableDataSource<FileElement>(this.FILES_DATA);
  selection = new SelectionModel<FileElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected ? this.selection.selected.length : 0;
    const numRows = this.dataSource.data ? this.dataSource.data.length : 0;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: FileElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }


  uploadFilesSubmit() {
    console.log(this.fileToUpload);

    const headers = new HttpHeaders({ 'Content-Type': "multipart/form-data" });

    for (let i = 0; i < this.fileToUpload.length; i++) {
      let file = this.fileToUpload[i];
      const data = {
        filename: file.name,
        content_type: file.type
      }

      this.server.postFileToAws('getUrl', data, file, file.name).subscribe(res => {
        this.toastr.success('Good for you :)\nFile ' + file.name + ' successfully uploaded!');
      });

    }
    return true;
  }
  // this.toastr.warning('There was issue \nuploading file:'+ file.name +'\n Please try again');

  /*minimize() {
    this.windowRef.minimize();
  }
  


  
  close() {
    this.windowRef.close();
  }*/
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
  handleFileInput(files: FileList) {
    console.debug();
    if (this.fileToUpload != null) {
      for (let i = 0; i < this.fileToUpload.length; i++) {
        this.dataSource.data.pop();

      }
    }
    this.fileToUpload = files;
    delete this.dataSource;
    this.dataSource = new MatTableDataSource<FileElement>();
    for (let i = 0; i < files.length; i++) {
      let tmp = i;
      tmp++;
      let file = {
        "name": files[i].name,
        "index": tmp,
        "weight": files[i].size,
        "upload": true,
        "position": tmp
      }
        ;
      this.dataSource.data.push(file);
    }

    console.log("sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss");

    console.log(this.fileToUpload);
    console.log(this.dataSource.data);
    console.log(this.dataSource);
    console.log("sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss");
    /*const index = this.dataSource.data.pop();
    this.dataSource.data.splice(0, 1);*/
    this.dataSource._updateChangeSubscription(); // <-- Refresh the datasource
    this.changeDetectorRefs.detectChanges();
  }

  uploadSubmit() {
    console.log("submit");
    this.uploadFilesSubmit();
  }
  uploadFileToActivity() {
    console.log("uploadFileToActivity");
    this.postFile(this.fileToUpload[0]);
  }

  postFile(fileToUpload: File) {

    console.log("postFile");

    return true;
  };





  addColumn() {
    console.log("addColumn");
    const randomColumn = Math.floor(Math.random() * this.displayedColumns.length);
    this.columnsToDisplay.push(this.displayedColumns[randomColumn]);

  }

  removeColumn() {
    console.log("removeColumn");
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.pop();
    }
  }

  shuffle() {
    console.log("shuffle");
    let currentIndex = this.columnsToDisplay.length;
    while (0 !== currentIndex) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // Swap
      let temp = this.columnsToDisplay[currentIndex];
      this.columnsToDisplay[currentIndex] = this.columnsToDisplay[randomIndex];
      this.columnsToDisplay[randomIndex] = temp;
    }
  }






  ngOnInit() {
    this.uploadForm = this.fb.group({
      document: [null, null],
      type: [null, Validators.compose([Validators.required])]
    });
  }
}






