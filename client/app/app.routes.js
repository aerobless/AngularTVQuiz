"use strict";
var router_1 = require('@angular/router');
var quiz_component_1 = require('./quiz.component');
var start_component_1 = require('./start.component');
var routes = [
    {
        path: 'quiz',
        component: quiz_component_1.QuizComponent
    },
    {
        path: 'start',
        component: start_component_1.StartComponent
    },
    {
        path: '',
        redirectTo: '/start',
        pathMatch: 'full'
    },
];
exports.appRouterProviders = [
    router_1.provideRouter(routes)
];
//# sourceMappingURL=app.routes.js.map