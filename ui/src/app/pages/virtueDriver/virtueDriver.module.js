(function () {
    'use strict';

    angular.module('BlurAdmin.pages.virtueDriver', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider.state('virtueDriver', {
            url: '/virtueDriver',
            templateUrl: 'app/pages/virtueDriver/virtue-driver.html',
            title: 'Virtue Driver',
            sidebarMeta: {
                icon: 'ion-android-car',
                order: 99,
            },
        });
    }

})();