Template.tenantDetails.helpers({
   tenant: function(){
      var unit = Unit.findOne();

      return Meteor.users.findOne({_id: unit.tenantId}).profile;
   }
});


Template.tenantDetails.events({
    'click #archive': function(e, template){
        e.preventDefault();

        Unit.update({_id: template.data._id}, {$set: {archive: true}}, function(){
            Router.go('unitPage', {_id: template.data.buildingId});
        });
    },
    'click #delete': function(e) {
        e.preventDefault();

        var unit = Unit.findOne();

        $('.small.modal')
            .modal({
                allowMultiple: false,
                onApprove : function() {
                    Meteor.call('unitRemove', unit, function(){
                        Router.go('unitPage', {_id: unit.buildingId});
                    });
                }
            })
            .modal('show');
    },
    'click #edit-unit': function(e){
        e.preventDefault();

        var unit = Unit.findOne();

        Router.go('unitEdit', {_id: unit._id});
    },
    'click #edit-tenant': function(e){
        e.preventDefault();

        var unit = Unit.findOne();

        Router.go('tenantEdit', {_id: unit._id});
    }
});