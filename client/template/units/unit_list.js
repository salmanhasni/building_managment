Template.unitList.helpers({
    unit: function(){
        return Unit.find({});
    },
    viewArchiveUnits: function(){
        return Session.get('archive-mode-units');
    }
});

Template.unitList.events({
    'click #view-archive': function(){
        Session.set('archive-mode-units', true);
    },
    'click #view-unarchive': function(){
        Session.set('archive-mode-units', false);
    },
});