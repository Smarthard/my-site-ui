import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

import {AuthService} from '../../services/api/auth/auth.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  username: string;
  password: string;

  constructor(
      private auth: AuthService,
      public dialogRef: MatDialogRef<LoginDialogComponent>
  ) { }

  public login() {
    this.auth.login(this.username, this.password);
    this.dialogRef.close();
  }

  public onCancel() {
    this.dialogRef.close();
  }

  ngOnInit() {}
}
