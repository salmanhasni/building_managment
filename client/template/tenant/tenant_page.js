Template.tenantPage.helpers({
    buildingLink: function(){
        return Router.current().params.query._pid;
    },
    unitLink: function(){
        return this.buildingId;
    },
    tenant: function(){
        var unit = Unit.findOne();

        return Meteor.users.findOne({_id: unit.tenantId}).profile;
    }
});