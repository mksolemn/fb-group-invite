Automatically invite people to join facebook group.

Main files:

1. /plugin/scripts/es/app.js;
2. /server/app/models/enjoyer.js;
3. /server/server.js

How to use ?

1. Run mongoDB;
2. Run nodejs server: /server/server.js;

How it works ?

1. First user is created using POSTMAN, since UI for registration is not setup;
To register user post username, password and id to '/enjoyer';
2. Chrome plugin checks if opened tab is facebook.com. If it's new user it's current userState will be set to 'registered'.
App scrapes some basic info and sends it to database;
3. Using POSTMAN, update user information. Change userState to 'promoting_group' and set promoPage to page that you'd like to promote.
4. After user login it's userState is checked again. If user state is 'promoting_group', you will be automatically redirected to group page.
5. Next program will select ADD MEMBERS input and go through alphabet in the search bar. This functionality is still under development, because this should be implement with my another plugin that scrapes all friend data. This way plugin would scan through friend data and invite friends, who are not members of the group.

To simply test out API functionality, use these paths:

1. '/enjoyer' - post/get;
2. '/enjoyer/:_id' - get/put/delete;
3. '/enjoyer_clear' - delete - clears database, useful for testing;


Sample of data object:

  {
    "_id": "5888c555ffe2f939d4af20c6",
    "__v": 1,
    "loggedIn": true,
    "active": true,
    "promoPage": "https://www.facebook.com/groups/374195812932493/",
    "groupsToRepost": [],
    "friendStats": [],
    "userState": "promoting_group",
    "lastActionTime": "2017-01-25T15:33:41.403Z",
    "user_details": {
      "userImg": "https://scontent.fmla1-2.fna.fbcdn.net/v/t1.0-1/p24x24/15826824_145736522585369_5191911380030018088_n.jpg?oh=3e41224020b7fd058cefd820d71b858a&amp;oe=5914F292",
      "nameID": "100014470655181",
      "password": "****",
      "username": "****"
    }
  }

