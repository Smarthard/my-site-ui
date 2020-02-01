import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatChipsModule, MatDialogModule,
    MatDividerModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule, MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSelectModule,
    MatToolbarModule,
} from "@angular/material";
import {MatCardModule} from "@angular/material/card";

import {routes} from "./routes/router";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './routes/home/home.component';
import {NotFoundComponent} from './routes/notfound/notfound.component';
import {ProjectsComponent} from './routes/projects/projects.component';
import {GithubService} from "./services/GithubService";
import {HttpClientModule, HttpClientXsrfModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {AuthService} from "./services/api/auth/auth.service";
import {CookieService} from "ngx-cookie-service";
import {LoginDialogComponent} from './shared/login-dialog/login-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NotFoundComponent,
        ProjectsComponent,
        LoginDialogComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule.forRoot(routes),
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatProgressBarModule,
        MatCardModule,
        MatDividerModule,
        MatGridListModule,
        MatChipsModule,
        HttpClientModule,
        HttpClientXsrfModule,
        FormsModule,
        MatSelectModule,
        MatInputModule,
        MatPaginatorModule,
        MatIconModule,
        MatDialogModule,
        MatMenuModule
    ],
    providers: [GithubService, AuthService, CookieService],
    bootstrap: [AppComponent],
    entryComponents: [LoginDialogComponent]
})
export class AppModule {
}
