Template.tenantEdit.helpers({
   tenant: function(){
       var unit = Unit.findOne();

       return Meteor.users.findOne({_id: unit.tenantId}).profile;
   }
});

Template.tenantEdit.events({
    'click #cancel': function(e, template){
        e.preventDefault();

        Router.go('tenantPage', {_id: template.data._id});
    },
    'submit form': function(e, template){
        e.preventDefault();
        var unit = template.data;
        var credentials = {
            email : $(e.target).find('[name=email]').val(),
            password : $(e.target).find('[name=password]').val()
        };

        var tenant = {
            first_name: $(e.target).find('[name=fname]').val(),
            last_name: $(e.target).find('[name=lname]').val(),
            phone: $(e.target).find('[name=phone]').val(),
            email: $(e.target).find('[name=email]').val()
        };

        Meteor.call('tenantUpdate', unit, tenant, credentials, function(error, result){
            if(error){
                if(Meteor.isClient) {
                    return Errors.throw(error.message);
                }
            }
            Router.go('tenantPage', {_id: unit._id});
        });
    }
});

Template.tenantEdit.onRendered(function() {
    $('.ui.form')
        .form({
            fields: {
                fname: {
                    identifier  : 'fname',
                    rules: [
                        {
                            type   : 'empty',
                            prompt : TENANT_EMPTY_FIRST_NAME
                        }
                    ]
                },
                lname: {
                    identifier  : 'lname',
                    rules: [
                        {
                            type   : 'empty',
                            prompt : TENANT_EMPTY_LAST_NAME
                        }
                    ]
                },
                phone: {
                    identifier: 'phone',
                    rules: [
                        {
                            type   : 'number',
                            prompt : TENANT_VALID_PHONE
                        },
                        {
                            type   : 'empty',
                            prompt : TENANT_EMPTY_PHONE
                        }
                    ]
                },
                email: {
                    identifier: 'email',
                    rules: [
                        {
                            type   : 'email',
                            prompt : TENANT_VALID_EMAIL
                        },
                        {
                            type   : 'empty',
                            prompt : TENANT_VALID_EMAIL
                        }
                    ]
                },
                password: {
                    identifier: 'password',
                    rules: [
                        {
                            type   : 'minLength[6]',
                            prompt : TENANT_VALID_PASSWORD
                        }
                    ]
                }
            }
        });
});