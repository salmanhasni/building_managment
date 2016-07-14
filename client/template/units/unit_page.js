Template.unitPage.helpers({
    buildingLink: function(){
       return Template.currentData().portfolioId;
    },
    viewArchiveUnits: function(){
        return Session.get('archive-mode-units');
    }
});