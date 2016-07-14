Template.unitItem.helpers({
    pidQuery: function(){
        return '_pid=' + Building.findOne().portfolioId;
    },
    viewArchiveUnits: function(){
        return Session.get('archive-mode-units');
    }
});


Template.unitItem.events({
    'click .restore': function(e, template){
        var unitId = template.data._id;
        Unit.update({_id: unitId}, {$unset: {archive: ""}});
    }
});
