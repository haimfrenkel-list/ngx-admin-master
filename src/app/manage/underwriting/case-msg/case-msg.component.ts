import { Component, Directive, ElementRef, HostListener, Inject, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ServerTokenService } from '../../../services/server-token.service';
import { UnderwritingDataService } from '../underwriting-data.service';
import { NB_WINDOW_CONTEXT, NbDialogRef, NbWindowRef } from '@nebular/theme';




@Component({
  selector: 'ngx-case-msg',
  templateUrl: './case-msg.component.html',
  styleUrls: ['./case-msg.component.scss']
})
export class CaseMsgComponent implements OnInit {
  @ViewChild('commentBox', { static: true }) commentBoxRef!: ElementRef;
  @ViewChild('fileDisplay', { static: true }) fileDisplayRef!: ElementRef;
  fileDisplay: HTMLDivElement | undefined;
  files: string
  generalMessages = []
  messages = []
  replayMessages = []
  name = 'angular-mentions';
  items: string[] = ["Noah", "Liam", "Mason", "Jacob"];
  caseID: number
  data: any
  constructor(private service: ServerTokenService, public serviceData: UnderwritingDataService, public windowRef: NbWindowRef, @Inject(NB_WINDOW_CONTEXT) private context: any) { }

  textForMsg
  userForMsg

  ngOnInit() {
    this.data = this.context
    this.serviceData.messages = []
    this.generalMessages = []
    this.nestedMessages()
    this.serviceData.getMsg(this.data.id).subscribe(() => {
      this.generalMessages = this.serviceData.messages
      this.nestedMessages()
    })
    this.serviceData.subject$.subscribe(() => {
      this.generalMessages = this.serviceData.messages
      this.nestedMessages()
    })
  }


  ngAfterViewInit() {
    const commentBox = this.commentBoxRef.nativeElement;
    commentBox.addEventListener('dragover', this.handleDragOver.bind(this));
    commentBox.addEventListener('drop', this.handleFileDrop.bind(this));
    this.fileDisplay = this.fileDisplayRef.nativeElement;
  }

  handleDragOver(event: DragEvent) {
    event.preventDefault();
  }

  handleFileDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    this.displayFile(file);
  }

  displayFile(file: File) {
    const fileType = file.type.startsWith('image/') ? 'image' : 'pdf';
    const fileContainer = document.createElement('div');
    const fileElement = document.createElement(fileType === 'image' ? 'img' : 'embed');
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const url = (event.target as FileReader).result as string;
      const removeBtn = document.createElement('button');
      removeBtn.innerText = 'Remove';
      removeBtn.addEventListener('click', () => {
        this.fileDisplay!.removeChild(fileContainer);
        if(this.files.includes(file.name)){
          let arrConvert = this.files.split('|')          
         arrConvert.splice( arrConvert.findIndex((item: any)=> item.includes(file.name) ), 1) 
         this.files = arrConvert.toString().replace('},', '}|')         
        }
      });
      if (fileType === 'image') {
        fileElement.src = url;
        fileElement.style.maxWidth = '100%'; // Set maximum width for the image
        fileElement.style.maxHeight = '200px'; // Set maximum height for the image

        fileContainer.appendChild(fileElement);
        fileContainer.appendChild(removeBtn);
      } else {
        fileElement.src = url;
        fileContainer.appendChild(fileElement);
        fileContainer.appendChild(removeBtn);

      }
      this.fileDisplay!.appendChild(fileContainer);
    };
    fileReader.readAsDataURL(file);
    const data = {
      filename: file.name,
      content_type: file.type
    }

    this.service.postFileToAws('getUrl', data, file, file.name).subscribe(res => {
      if (res.progress === 100 && res.done) {
        if(!this.files){
          this.files = ''
        }
        let fileData = {
          type: fileType,
          url: res.baseUrl + '/' + res.fileName
        }
        this.files = this.files + `${JSON.stringify(fileData)}|`
      }
    })
  
    
  }

  close() {
    this.windowRef.close();
  }

  ngOnChanges(changes: SimpleChanges) {
  }



  nestedMessages() {
    this.generalMessages.forEach((element, index) => {
      if (element.parentId) {
        let i = this.generalMessages.findIndex((msg) => msg.id === element.parentId)
        if (!this.generalMessages[i].Replayed) {
          this.generalMessages[i].Replayed = []
        }
        this.generalMessages[i].Replayed.push(element)
      }
      if(element.files){
        let filesString: string = element.files
        this.generalMessages[index].files = []
        this.generalMessages[index].files = filesString.split('|')
        for (let i = 0; i <this.generalMessages[index].files.length; i++) {
          let cehck: string = this.generalMessages[index].files[i]
          let obj = cehck.includes('type') ? JSON.parse(this.generalMessages[index].files[i]) : {}
          if(obj.type){
            this.generalMessages[index].files[i] = obj
          } else {
            this.generalMessages[index].files.splice(i)
          }
        }
      }
    })
    let processedMessages = []
    this.generalMessages.forEach(element => {
      if (!element.parentId) {
        processedMessages.push(element)
      }
    })
    this.generalMessages = processedMessages
  }

  convertFilseToArr(){

  }

  send() {
    let message = {
      authorName: JSON.parse(localStorage.getItem('currentUser'))['fullName'],
      caseID: this.data.id,
      date: new Date(),
      body: this.textForMsg,
      Type: null,
      parentId: null,
      ReplayTo: this.userForMsg,
      files: this.files
    }
    this.serviceData.createMsg(message).subscribe(() => {
      // if (message.To) {
      //   let ntf = {
      //     User: message.To,
      //     Case: message.Case,
      //     Date: new Date().toLocaleString(),
      //     Text: `${message.From} sent you a message in ${message.Case} case`,
      //     Type: null,
      //     Accepted: false
      //   }
      //   this.serviceData.createNote(ntf)
      // }
      this.textForMsg = null
      this.userForMsg = null
      this.files = null
      this.serviceData.getMsg(this.data.id).subscribe(() => {
        this.serviceData.subject$.next()
      })

    })
  }

}
