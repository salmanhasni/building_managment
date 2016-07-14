Template.portfolioSubmit.events({
    'submit form': function(e) {
        e.preventDefault();

        var portfolio = {
            title: $(e.target).find('[name=title]').val()
        };

        var errors = validatePortfolio(portfolio);
        if(errors.title)
            return;

        Meteor.call('portfolioInsert', portfolio, function(error,result){
            //display the error to the user and abort
            if(error)
                return Errors.throw(error.reason);

            //show this result but route anyway
            if(result.portfolioExist)
                Errors.throw(PORTFOLIO_ALREADY_EXIST);
        });
    }
});

Template.portfolioSubmit.onRendered(function() {
    $('.ui.form')
        .form({
            fields: {
                title: {
                    identifier: 'title',
                    rules: [
                        {
                            type   : 'empty',
                            prompt : PORTFOLIO_TITLE_ERROR
                        },
                        //in case if user forcefully submit longer tile
                        {
                            type: 'maxLength[50]',
                            prompt: PORTFOLIO_TITLERANGE_ERROR
                        }
                    ]
                }
            }
        });
});