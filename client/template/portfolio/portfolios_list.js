Template.portfoliosList.helpers({
    portfolio: function(){
        return Portfolio.find({})
    },
    viewArchivePortfolio: function(){
        return Session.get('archive-mode-portfolio');
    }
});

Template.portfoliosList.events({
   'click #view-archive': function(){
        Session.set('archive-mode-portfolio', true);
   },
    'click #view-unarchive': function(){
        Session.set('archive-mode-portfolio', false);
    },
});