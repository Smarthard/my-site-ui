import {Component} from '@angular/core';
import {Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";
import {AuthService} from "./services/api/auth/auth.service";
import {MatDialog} from "@angular/material";
import {LoginDialogComponent} from "./shared/login-dialog/login-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-site-ui';
  loading = false;

  constructor(
      private router: Router,
      private auth: AuthService,
      private dialog: MatDialog
  ) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }

        default: break;
      }
    })
  }

  public openLoginDialog() {
    const loginDialogRef = this.dialog.open(LoginDialogComponent);

    loginDialogRef.afterClosed()
        .subscribe(result => {
          console.log(result);
        })
  }
}
