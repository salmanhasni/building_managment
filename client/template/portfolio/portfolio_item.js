Template.portfolioItem.helpers({
    viewArchivePortfolio: function(){
        return Session.get('archive-mode-portfolio');
    }
});

Template.portfolioItem.events({
    'click .restore': function(e, template){
        var portfolioId = template.data._id;
        Portfolio.update({_id: portfolioId}, {$unset: {archive: ""}});
    }
});