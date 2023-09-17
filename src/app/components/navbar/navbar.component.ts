import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { navLinks } from 'src/app/constants';
import { Title } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [SharedModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnDestroy {
  favIcon: HTMLLinkElement | null = document.querySelector('#appIcon');

  constructor(private titleService: Title) {
    this.titleService.setTitle('Dima | Portfolio');
    if (this.favIcon) this.favIcon.href = 'assets/logo.svg';
  }
  ngOnDestroy(): void {
    if (this.favIcon) this.favIcon.href = 'src/favicon.ico';
  }

  navLinks = navLinks;
  toogleMenu = false;

  onLinkClick() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
