Template._loginButtonsAdditionalLoggedInDropdownActions.events({
    'click #update-profile': function(){
        $('.ui.modal.profile').modal('show');
    }
});

Template.profileSettings.onRendered(function() {
    $("#profile-change").click(function () {

        var profileData = {
            phone: $("input[name='phone']").val()
        };

        if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
            profileData['first_name'] = $("input[name='fname']").val();
            profileData['last_name'] = $("input[name='lname']").val();

        } else {
            profileData['first_name'] = Meteor.user().profile.first_name;
            profileData['last_name'] = Meteor.user().profile.last_name;
            profileData['email'] = Meteor.user().profile.email;
        }

        Meteor.users.update(Meteor.userId(), {$set: {profile: profileData}});
    });
});

Template.profileSettings.helpers({
    fname: function(){
        return Meteor.user().profile.first_name;
    },
    lname: function(){
        return Meteor.user().profile.last_name;
    },
    phone: function(){
        return Meteor.user().profile.phone;
    }
});