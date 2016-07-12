import { provideRouter, RouterConfig }  from '@angular/router';
import { QuizComponent } from './quiz.component';

const routes: RouterConfig = [
    {
        path: 'quiz',
        component: QuizComponent
    }
];

export const appRouterProviders = [
    provideRouter(routes)
];