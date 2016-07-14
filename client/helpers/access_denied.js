Template.accessDenied.events({
    'click .toggleLoginButton': function(e){
        e.stopPropagation();
        $('#login-dropdown').click();
    }
});