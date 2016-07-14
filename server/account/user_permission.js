Accounts.onLogin(function() {
    if (Meteor.userId()) {
        if(!Roles.userIsInRole(Meteor.userId(), ['admin', 'tenant'])){
            Roles.addUsersToRoles(Meteor.userId(), 'admin', Roles.GLOBAL_GROUP);
        }
    }
});