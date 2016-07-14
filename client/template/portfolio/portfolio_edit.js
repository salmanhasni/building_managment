Template.portfolioEdit.onRendered(function () {
    $('input[name="title"]').focus();
});

Template.portfolioEdit.events({
    'click #cancel': function(e, template){
        e.preventDefault();

        Router.go('buildingPage', {_id: template.data._id});
    },
    'submit form': function(e, template){
        e.preventDefault();
        var portfolioId = template.data._id;
        var portfolio = {
            title: $(e.target).find('[name=title]').val()
        };

        var errors = validatePortfolio(portfolio);
        if(errors.title)
            return;

        Portfolio.update({_id: portfolioId}, {$set: portfolio}, function(){
            Router.go('buildingPage', {_id: portfolioId});
        });
    }
});

Template.portfolioEdit.onRendered(function() {
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