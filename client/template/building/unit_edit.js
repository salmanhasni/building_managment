Template.unitEdit.onRendered(function () {
    $('input[name="alias"]').focus();
});

Template.unitEdit.events({
    'click #cancel': function(e, template){
        e.preventDefault();

        Router.go('tenantPage', {_id: template.data._id});
    },
    'submit form': function(e, template){
        e.preventDefault();
        var unitId = template.data._id;

        var unit = {
            alias: $(e.target).find('[name=alias]').val(),
            sqrfootage: $(e.target).find('[name=sqrfootage]').val(),
            residents: $(e.target).find('[name=residents]').val()
        };

        Unit.update({_id: unitId}, {$set: unit}, function(){
            Router.go('tenantPage', {_id: unitId});
        });
    }
});


Template.unitEdit.onRendered(function() {
    $('.ui.form')
        .form({
            fields: {
                alias: {
                    identifier  : 'alias',
                    rules: [
                        {
                            type   : 'empty',
                            prompt : UNIT_ERROR_ALIAS
                        }
                    ]
                },
                sqrfootage: {
                    identifier  : 'sqrfootage',
                    rules: [
                        {
                            type   : 'number',
                            prompt : UNIT_ERROR_NUMBER
                        },
                        {
                            type   : 'empty',
                            prompt : UNIT_ERROR_VALUE
                        }
                    ]
                },
                residents: {
                    identifier: 'residents',
                    rules: [
                        {
                            type   : 'number',
                            prompt : UNIT_ERROR_NUMBER
                        },
                        {
                            type   : 'empty',
                            prompt : UNIT_ERROR_VALUE
                        }
                    ]
                }
            }
        });
});