Template.buildingEdit.onRendered(function () {
    $('input[name="address"]').focus();
});

Template.buildingEdit.events({
    'click #cancel': function(e, template){
        e.preventDefault();

        Router.go('unitPage', {_id: template.data._id});
    },
    'submit form': function(e, template){
        e.preventDefault();
        var buildingId = template.data._id;

        var building = {
            address: $(e.target).find('[name=address]').val(),
            owner: $(e.target).find('[name=owner]').val()
        };

        var errors = validateBuilding(building);
        if(errors.address || errors.owner)
            return;

        Building.update({_id: buildingId}, {$set: building}, function(){
            Router.go('unitPage', {_id: buildingId});
        });
    }
});

Template.buildingEdit.onRendered(function() {
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