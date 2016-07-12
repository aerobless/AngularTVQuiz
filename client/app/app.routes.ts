import { provideRouter, RouterConfig }  from '@angular/router';
import { QuizComponent } from './quiz.component';
import { StartComponent } from './start.component';

const routes: RouterConfig = [
    {
        path: 'quiz',
        component: QuizComponent
    },
    {
        path: 'start',
        component: StartComponent
    },
    {
        path: '',
        redirectTo: 'start',
        pathMatch: 'full'
    }
];

export const appRouterProviders = [
    provideRouter(routes)
];