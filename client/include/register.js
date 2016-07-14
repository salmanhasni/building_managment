Template.register.events({
    'click .toggleLoginButton': function(e){
        e.stopPropagation();
        $('#login-dropdown').click();
    }
});