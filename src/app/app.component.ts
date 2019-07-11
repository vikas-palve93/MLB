import { Component, HostListener, TemplateRef, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Major League Baseball';
  deferredPrompt: any;
  showButton = false;
  newVariable: any = window.navigator;
  standalone = this.newVariable.standalone
  userAgent = window.navigator.userAgent.toLocaleUpperCase();
  isAndroid = this.userAgent.indexOf("android") > -1;
  modalRef: BsModalRef;
  constructor(
    private deviceService: DeviceDetectorService,
    private modalService: BsModalService
  ){}

  ngOnInit() {
    // Checks if should display install popup notification:
    if (this.deviceService.isMobile() && this.deviceService.os != "Android" && !this.isInStandaloneMode() && !this.deviceService.isDesktop()) {
      $("#modal-btn").click();
    }
  }

  isInStandaloneMode = () => ('standalone' in window.navigator) && (this.newVariable.standalone);

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
    e.preventDefault();
    this.deferredPrompt = e;
    if (this.deviceService.isMobile() && this.deviceService.os === "Android" && !this.isInStandaloneMode() && !this.deviceService.isDesktop()) {
      this.showButton = true;
    }
  }

  addToHomeScreen() {
    // hide our user interface that shows our A2HS button
    this.showButton = false;
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.deferredPrompt = null;
      });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
