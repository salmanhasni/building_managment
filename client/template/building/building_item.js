Template.buildingItem.helpers({
    viewArchiveBuilding: function(){
        return Session.get('archive-mode-building');
    }
});

Template.buildingItem.events({
    'click .restore': function(e, template){
        var buildingId = template.data._id;
        Building.update({_id: buildingId}, {$unset: {archive: ""}});
    }
});