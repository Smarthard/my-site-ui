import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './routes/home/home.component';
import {NotFoundComponent} from './routes/notfound/notfound.component';
import {ProjectsComponent} from './routes/projects/projects.component';
import {LoginDialogComponent} from './shared/login-dialog/login-dialog.component';
import {RouterModule} from '@angular/router';
import {routes} from './routes/router';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {GithubService} from './services/GithubService';
import {CookieService} from 'ngx-cookie-service';
import {AuthService} from './services/api/auth/auth.service';
import {MatMenuModule} from '@angular/material/menu';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { RequestsComponent } from './routes/requests/requests.component';
import {NgxJsonViewModule} from 'ng-json-view';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NotFoundComponent,
        ProjectsComponent,
        LoginDialogComponent,
        RequestsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule.forRoot(routes),
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
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
        MatMenuModule,
        NgxJsonViewModule,
    ],
    providers: [GithubService, AuthService, CookieService],
    bootstrap: [AppComponent],
    entryComponents: [LoginDialogComponent]
})
export class AppModule {
}
