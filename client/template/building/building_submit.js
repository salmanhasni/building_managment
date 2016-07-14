Template.buildingSubmit.events({
    'submit form': function(e) {
        e.preventDefault();

        var portfolio = Portfolio.findOne();

        var building = {
            portfolioId: portfolio._id,
            address: $(e.target).find('[name=address]').val(),
            owner: $(e.target).find('[name=owner]').val()
        };

        var errors = validateBuilding(building);
        if(errors.address || errors.owner)
            return;

        Meteor.call('buildingInsert', building, function(error,result){
            //display the error to the user and abort
            if(error)
                return Errors.throw(error.reason);
            
            if(result.buildingExist)
                Errors.throw(BUILDING_ALREADY_EXIST);
        });
    },
    'click #delete': function(e) {
        e.preventDefault();

        var portfolio = Portfolio.findOne();

        $('.small.modal')
            .modal({
                allowMultiple: false,
                onApprove : function() {
                    Meteor.call('portfolioRemove', portfolio._id, function(){
                        Router.go('portfolioPage');
                    });
                }
            })
            .modal('show');
    },
    'click #archive': function(e) {

        e.preventDefault();

        var portfolio = Portfolio.findOne();

       Portfolio.update({_id: portfolio._id}, {$set: {archive: true}}, function(){
           Router.go('portfolioPage');
       });
    },
    'click #edit': function(e) {
        e.preventDefault();

        var portfolio = Portfolio.findOne();

        Router.go('portfolioEdit', {_id: portfolio._id});

    }
});

Template.buildingSubmit.onRendered(function() {
    $('.ui.form')
        .form({
            fields: {
                address: {
                    identifier: 'address',
                    rules: [
                        {
                            type   : 'empty',
                            prompt : BUILDING_ADDRESS_ERROR
                        },
                        {
                            type: 'maxLength[100]',
                            prompt: BUILDING_ADDRESSRANGE_ERROR
                        }
                    ]
                },
                owner: {
                    identifier: 'owner',
                    rules: [
                        {
                            type   : 'empty',
                            prompt : BUILDING_OWNER_ERROR
                        },
                        {
                            type: 'maxLength[50]',
                            prompt: BUILDING_OWNERRANGE_ERROR
                        }
                    ]
                }
            }
        });
});