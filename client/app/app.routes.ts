import {provideRouter, RouterConfig}  from '@angular/router';
import {QuizComponent} from './quiz.component';
import {TelevisionComponent} from './television.component';
import {StartComponent} from './start.component';

const routes:RouterConfig = [
    {
        path: 'quiz/:id',
        component: QuizComponent
    },
    {
        path: 'tv/:id',
        component: TelevisionComponent
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