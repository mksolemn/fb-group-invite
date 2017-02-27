'use strict';

(function ($) {
    $(document).ready(function () {

        var enjoyModule = {
            //settings
            baseUrl: 'http://127.0.0.1:8080/api/enjoyer/',
            // get current profile ID
            currentProfile: function () {
                return $('img[id^=profile_pic_header_]').attr('id').replace(/profile_pic_header_/i, '');
            }(),
            apiPath: '',
            userData: {},
            loggedUser: {},
            currentUrl: window.location.href,

            getAllData: function getAllData(root) {
                function ajax(options) {
                    return new Promise(function (resolve, reject) {
                        $.ajax(options).done(resolve).fail(reject);
                    });
                };

                ajax({
                    url: enjoyModule.baseUrl,
                    type: 'get'
                }).then(function fulfillHandler(data) {
                    enjoyModule.userData = data;
                    enjoyModule.urlTracker();
                    enjoyModule.navigateState();
                });
            },

            // check current URL and select function app should perform
            urlTracker: function urlTracker() {
                var currentUrl = window.location.href;
                var facebookBaseUrl = 'https://www.facebook.com';

                //check baseUrl
                if (currentUrl.startsWith(facebookBaseUrl)) {
                    enjoyModule.checkIfLoggedIn();
                }

                // check trailing url, so there is no need to mess with switch before it's necessary
                // switch statement
            },

            // read loaded UI
            uiTracker: function uiTracker() {

                // check if add member field exists
                var addToGroupInput = $('.uiGroupsAddTypeaheadView input');

                // init functions
                if (addToGroupInput.length > 0) {
                    enjoyModule.inviteToGroup(addToGroupInput);
                }
            },

            inviteToGroup: function inviteToGroup(selector) {
                console.log('Inviting to group');
                console.log(selector);

                var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

                // set timeout
                function timeoutInput(i) {
                    setTimeout(function () {
                        selector.val(alphabet[i]);
                        selector.select();
                    }, 5000 * i);
                }
                // cycle through letters
                for (var i = 0; alphabet.length > i; i += 1) {
                    timeoutInput(i);
                }
            },

            // get current user
            checkIfLoggedIn: function checkIfLoggedIn() {
                $.each(enjoyModule.userData, function () {
                    //check if user has nameID
                    if (this.user_details.nameID == enjoyModule.currentProfile) {
                        console.log('found profile');
                        enjoyModule.loggedUser = this;
                    }
                });
                enjoyModule.updateData({ active: true }, enjoyModule.loggedUser._id);
                // send all user data object
            },

            watchForLogout: function watchForLogout() {
                $("#logoutMenu>a>div").on('click', function () {
                    enjoyModule.updateData({ active: false }, enjoyModule.loggedUser._id);
                });
            },

            //navigate based on userState
            navigateState: function navigateState() {
                // navigate to promoted page
                if (enjoyModule.loggedUser.userState == 'promoting_group' && enjoyModule.currentUrl != enjoyModule.loggedUser.promoPage) {
                    window.location.replace(enjoyModule.loggedUser.promoPage);
                }
            },

            // ajax request handling
            updateData: function updateData(passedData, trailUrl) {
                console.log(passedData);
                $.ajax({
                    type: "PUT",
                    url: enjoyModule.baseUrl + trailUrl,
                    data: passedData,
                    success: console.log('Data posted succesfully'),
                    contentType: 'application/x-www-form-urlencoded',
                    dataType: "json"
                });
            }

        };

        enjoyModule.getAllData();
        enjoyModule.uiTracker();
    });
})(jQuery);