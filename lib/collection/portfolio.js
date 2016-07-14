Portfolio = new Mongo.Collection("portfolio");

Portfolio.allow({
    remove: function(userId, portfolio) {
        return ownDocument(userId, portfolio);
    },
    update: function(userId, portfolio){
        return ownDocument(userId, portfolio);
    }
});
validatePortfolio = function(portfolio) {
    var errors = {};
    if(!portfolio.title) {
        errors.title = PORTFOLIO_TITLE_ERROR;
    }
    if(portfolio.title.length > 50 ){
        errors.title = PORTFOLIO_TITLERANGE_ERROR;
    }

    return errors;
};

Meteor.methods({
    portfolioInsert: function(portfolioAttributes) {
        check(Meteor.userId(), String);
        check(portfolioAttributes, {
            title: String
        });

        var errors = validatePortfolio(portfolioAttributes);
        if(errors.title)
            throw new Meteor.Error(PORTFOLIO_INVALID_TITLE, errors.title);

        var portfolioWithSameTitle = Portfolio.findOne({title: portfolioAttributes.title});
        if(portfolioWithSameTitle) {
            return {
                portfolioExist: true,
                _id: portfolioWithSameTitle._id
            };
        }

        var user = Meteor.user();
        var portfolio = _.extend(portfolioAttributes, {
            userId: user._id,
        });
        var portfolio = Portfolio.insert(portfolio);
        return {
            _id: portfolio
        };
    },
    portfolioRemove: function(portfolioId){
        check(Meteor.userId(), String);
        check(portfolioId, String);

        var allbuildings = Building.find({portfolioId: portfolioId}).fetch();

        for (var i = 0; i < allbuildings.length; i++) {
            Unit.remove({buildingId: allbuildings[i]._id});
        }

        Building.remove({portfolioId: portfolioId});
        Portfolio.remove({_id: portfolioId});
    }
});