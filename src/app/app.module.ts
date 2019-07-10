import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatChipsModule,
    MatDividerModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
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
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    ProjectsComponent
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
        FormsModule,
        MatSelectModule,
        MatInputModule,
        MatPaginatorModule,
        MatIconModule
    ],
  providers: [GithubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
