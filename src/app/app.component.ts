import { Component } from '@angular/core';
import { FileInfo } from './models/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'download-list';
  files: Array<FileInfo>;
  constructor(){
    this.files = [

      { name: 'smss.exe', device: 'Stark', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe', status: 'scheduled', selected: false },

      { name: 'netsh.exe', device: 'Targaryen', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe', status: 'available', selected: false },

      { name: 'uxtheme.dll', device: 'Lannister', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll', status: 'available', selected: false },

      { name: 'cryptbase.dll', device: 'Martell', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll', status: 'scheduled', selected: false },

      { name: '7za.exe', device: 'Baratheon', path: '\\Device\\HarddiskVolume1\\temp\\7za.exe', status: 'scheduled', selected: false }
    ]
  }
}
