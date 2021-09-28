import { Component, Input, OnInit } from '@angular/core';
import { FileInfo } from 'src/app/models/models';

@Component({
  selector: 'app-download-list',
  templateUrl: './download-list.component.html',
  styleUrls: ['./download-list.component.css']
})
export class DownloadListComponent implements OnInit {
  @Input()files: Array<FileInfo> = [];
  allFilesSelected = false;
  constructor() { }

  ngOnInit(): void {
    
  }
  
  get selectedFiles(){
    return this.files.filter(x => x.selected);
  }
  get numberOfSelectedFiles(){
    return this.selectedFiles.length;
  }

  selectFile(file: FileInfo){
    file.selected = !file.selected;
  }

  downloadSelected(){
    var selectedFiles = this.selectedFiles;
    if(selectedFiles.length === 0){
      alert('No Files have been selected.');
    }else if(selectedFiles.filter(x => x.status === 'scheduled').length > 0){
      alert('Scheduled files are not ready to download yet.')
    }else{
      var alertText = "These are selected files: \r\n";
      selectedFiles.forEach((eachSelected) => {
        alertText += `Path: ${eachSelected.path}\r\n`;
        alertText += `Device: ${eachSelected.device}\r\n`
      });
      alert(alertText);
    }
  }

  getAriaLabel(file: FileInfo){
    return `The file is ${file.name} on Device ${file.device} with the path ${file.path} and status ${file.status}`;
  }

  get isAllFilesSelected(){
    return this.numberOfSelectedFiles === this.files.length;
  }

  selectAll(){
    if(this.numberOfSelectedFiles === 0 || (this.numberOfSelectedFiles > 0 && this.numberOfSelectedFiles < this.files.length)){
      this.files.forEach(eachFile => eachFile.selected = true);
    }else{
      this.files.forEach(eachFile => eachFile.selected = false);
    }
  }
}
