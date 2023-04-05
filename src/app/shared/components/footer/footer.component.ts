import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'w-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public isMobile: boolean = window.innerWidth < 768 ? true : false;

  public desktopItems = [
    {
      alt: 'App Store',
      src: '../../../../assets/icons/app-store.png',
    },
    {
      alt: 'Android',
      src: '../../../../assets/icons/android.png',
    },
    {
      alt: 'Play Store',
      src: '../../../../assets/icons/play-store.png',
    },
    {
      alt: 'Apple',
      src: '../../../../assets/icons/apple.png',
    },
    {
      alt: 'PC',
      src: '../../../../assets/icons/pc.png',
    },
    {
      alt: 'Linux',
      src: '../../../../assets/icons/linux.png',
    },
  ];

  public mobileItems = [
    {
      alt: 'App Store',
      src: '../../../../assets/icons/app-store-highlighted.png',
    },
    {
      alt: 'Android',
      src: '../../../../assets/icons/android-highlighted.png',
    },
    {
      alt: 'Apple',
      src: '../../../../assets/icons/apple-highlighted.png',
    },
    {
      alt: 'PC',
      src: '../../../../assets/icons/pc-highlighted.png',
    }
  ];

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth < 768 ? true : false;
  }
}
