(function () {
    'use strict';

    angular
        .module('app')
        .controller('EditProfileCtrl', ['$scope', 'SpinnerService', 'UserService', 'toastr', function ($scope, SpinnerService, UserService, toastr) {
            $scope.onSubmit = onSubmit;

            getProfile();

            function getProfile() {
                SpinnerService.showSpinner();
                UserService
                    .me()
                    .then(data => {
                        $scope.profile = data;
                        SpinnerService.hideSpinner();
                    });
            }

            function onSubmit() {
                const {name, birthday} = $scope.profile;
                const body = {
                    name,
                    birthday
                };

                UserService
                    .updateProfile(body)
                    .then(() => {
                        $scope.$emit('changeTab');
                        toastr.success('Updated Successfully.', 'Success!');
                    });
            }
        }])
        .component('editProfile', {
            templateUrl: './src/app/components/edit-profile/edit-profile.component.html',
            controller: 'EditProfileCtrl'
        });
})();