Template.unitSubmit.events({
    'submit form': function(e) {
        e.preventDefault();

        var building = Building.findOne();

        var unit = {
            buildingId: building._id,
            alias: $(e.target).find('[name=alias]').val(),
            sqrfootage: $(e.target).find('[name=sqrfootage]').val(),
            residents: $(e.target).find('[name=residents]').val()
        };

        Meteor.call('unitInsert', unit, function(error,result){
            //display the error to the user and abort
            if(error)
                return Errors.throw(error.reason);

            if(result.unitExist)
                Errors.throw(UNIT_ALREADY_EXIST);
            
        });
    },
    'click #delete': function(e) {
        e.preventDefault();

        var building = Building.findOne();

        $('.small.modal')
            .modal({
                allowMultiple: false,
                onApprove : function() {
                    Meteor.call('buildingRemove', building._id, function(){
                        Router.go('buildingPage', {_id: building.portfolioId});
                    })
                }
            })
            .modal('show');
    },
    'click #archive': function(e) {
        e.preventDefault();

        var building = Building.findOne();

        Building.update({_id: building._id}, {$set: {archive: true}}, function(){
            Router.go('buildingPage', {_id: building.portfolioId});
        });
    },
    'click #edit': function(e){
        e.preventDefault();

        var building = Building.findOne();

        Router.go('buildingEdit', {_id: building._id});
    }
});

Template.unitSubmit.onRendered(function() {
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