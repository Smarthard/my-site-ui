import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {NotFoundComponent} from './notfound/notfound.component';
import {ProjectsComponent} from './projects/projects.component';
import {RequestsComponent} from './requests/requests.component';
import {AdminGuard} from '../shared/guards/admin/admin.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent
    },
    {
        path: 'home',
        redirectTo: '/'
    },
    {
        path: 'projects',
        component: ProjectsComponent
    },
    {
        path: 'requests',
        component: RequestsComponent,
        canActivate: [AdminGuard]
    },
    {
        path: '404',
        component: NotFoundComponent
    },
    {
        path: '**',
        redirectTo: '/404'
    },
];
