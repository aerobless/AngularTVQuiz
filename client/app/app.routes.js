"use strict";
var router_1 = require('@angular/router');
var quiz_component_1 = require('./quiz.component');
var television_component_1 = require('./television.component');
var start_component_1 = require('./start.component');
var routes = [
    {
        path: 'quiz/:id',
        component: quiz_component_1.QuizComponent
    },
    {
        path: 'tv/:id',
        component: television_component_1.TelevisionComponent
    },
    {
        path: 'start',
        component: start_component_1.StartComponent
    },
    {
        path: '',
        redirectTo: 'start',
        pathMatch: 'full'
    }
];
exports.appRouterProviders = [
    router_1.provideRouter(routes)
];
//# sourceMappingURL=app.routes.js.map