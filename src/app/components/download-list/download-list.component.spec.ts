import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadListComponent } from './download-list.component';

describe('DownloadListComponent', () => {
  let component: DownloadListComponent;
  let fixture: ComponentFixture<DownloadListComponent>;
    let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadListComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    component.files = [
        { name: 'smss.exe', device: 'Stark', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe', status: 'scheduled', selected: false },
  
        { name: 'netsh.exe', device: 'Targaryen', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe', status: 'available', selected: false },
  
        { name: 'uxtheme.dll', device: 'Lannister', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll', status: 'available', selected: false },
  
        { name: 'cryptbase.dll', device: 'Martell', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll', status: 'scheduled', selected: false },
  
        { name: '7za.exe', device: 'Baratheon', path: '\\Device\\HarddiskVolume1\\temp\\7za.exe', status: 'scheduled', selected: false }]
    fixture.detectChanges();
  });

   
  it('should create download list', () => {
    expect(component).toBeTruthy();
  });

  it('isAllFilesSelected flag should be false', () => {
    expect(component.isAllFilesSelected).toBeFalsy();
  });

  it('toggle select file should assign correct value', () => {
    var file = component.files[0];
    expect(file.selected).toBeFalsy();
    component.selectFile(file);
    expect(file.selected).toBeTruthy();    
  });

  it('selectedFiles should only return the one selected', () => { 
    component.files[0].selected = true;   
    component.files[1].selected = true;
    expect(component.selectedFiles.filter(x => !x.selected).length === 0).toBeTruthy();    
    expect(component.numberOfSelectedFiles).toBe(2);    
  });

  it('selectAll should work when no files selected', () => { 
    component.selectAll();
    expect(component.selectedFiles.filter(x => x.selected).length === component.files.length).toBeTruthy();    
  });

  it('selectAll should work when some files selected', () => { 
    component.files[0].selected = true;   
    component.selectAll();
    expect(component.selectedFiles.filter(x => x.selected).length === component.files.length).toBeTruthy();    
  });

  it('selectAll should work when some files selected', () => { 
    component.files.forEach(eachFile => eachFile.selected = true);   
    component.selectAll();
    expect(component.selectedFiles.filter(x => x.selected).length === 0).toBeTruthy();    
  });

  it('should not download any files', () => { 
    spyOn(window, "alert");
    component.downloadSelected();
    expect(window.alert).toHaveBeenCalledWith("No Files have been selected.");    
  });

  it('should not download scheduled files', () => { 
    var scheduledFile = component.files[0];
    scheduledFile.selected = true;
    spyOn(window, "alert");
    component.downloadSelected();
    expect(window.alert).toHaveBeenCalledWith("Scheduled files are not ready to download yet.");    
  });

  it('should download available files', () => { 
    var available = component.files[1];
    available.selected = true;
    spyOn(window, "alert");
    component.downloadSelected();
    var alertText = "These are selected files: \r\n";
    component.selectedFiles.forEach((eachSelected) => {
      alertText += `Path: ${eachSelected.path}\r\n`;
      alertText += `Device: ${eachSelected.device}\r\n`
    });
    expect(window.alert).toHaveBeenCalledWith(alertText);    
  });
});

