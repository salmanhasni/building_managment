Template.tenantSubmit.events({
    'submit form': function (e, template) {
        e.preventDefault();

        var unitId = this._id;
        var password =  $(e.target).find('[name=password]').val()
        var tenant = {
            first_name: $(e.target).find('[name=fname]').val(),
            last_name: $(e.target).find('[name=lname]').val(),
            phone: $(e.target).find('[name=phone]').val(),
            email: $(e.target).find('[name=email]').val()
        };

        var errors = validateTenant(tenant);

        if(errors.first_name || errors.last_name || errors.phone || errors.email){
            return false;
        }

        Meteor.call('unitUpdate', unitId, tenant, password, function(error, result){
            if(error){
                if(Meteor.isClient) {
                    Errors.throw(error.message);
                }
            }
        });
    }
});

Template.tenantSubmit.onRendered(function() {
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