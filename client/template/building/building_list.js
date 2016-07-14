Template.buildingList.helpers({
    building: function(){
        return Building.find({});
    },
    viewArchiveBuilding: function(){
        return Session.get('archive-mode-building');
    }
});

Template.buildingList.events({
    'click #view-archive': function(){
        Session.set('archive-mode-building', true);
    },
    'click #view-unarchive': function(){
        Session.set('archive-mode-building', false);
    },
});