Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

Router.route('/', {
    name: 'portfolioPage',
    waitOn: function() {
        return Meteor.subscribe('portfolios', {userId: Meteor.userId()});
    }
});

Router.route('/portfolios/:_id', {
    name: 'buildingPage',
    notFoundTemplate: 'itemNotFound',
    waitOn: function() {
        return [Meteor.subscribe('buildings', {portfolioId: this.params._id, userId: Meteor.userId()}),
                Meteor.subscribe('portfolios', {_id: this.params._id, userId: Meteor.userId()})];
    },
    data: function() {return Portfolio.findOne({_id: this.params._id, archive: {'$exists': false}});}
});

Router.route('/portfoliosEdit/:_id', {
    name: 'portfolioEdit',
    notFoundTemplate: 'itemNotFound',
    waitOn: function() {
        return Meteor.subscribe('portfolios', {_id: this.params._id, userId: Meteor.userId()});
    },
    data: function() {
        return Portfolio.findOne({_id: this.params._id, archive: {'$exists': false}});
    }
});

Router.route('/building/:_id', {
    name: 'unitPage',
    notFoundTemplate: 'itemNotFound',
    waitOn: function() {
        return [Meteor.subscribe('units', {buildingId: this.params._id, userId: Meteor.userId()}),
                Meteor.subscribe('buildings', {_id: this.params._id, userId: Meteor.userId()})];
    },
    data: function() {return Building.findOne({_id: this.params._id, archive: {'$exists': false}});}
});

Router.route('/buildingEdit/:_id', {
    name: 'buildingEdit',
    notFoundTemplate: 'itemNotFound',
    waitOn: function() {
        return Meteor.subscribe('buildings', {_id: this.params._id, userId: Meteor.userId()});
    },
    data: function() {
        return Building.findOne({_id: this.params._id, archive: {'$exists': false}});
    }
});

Router.route('/unit/:_id', {
    name: 'tenantPage',
    notFoundTemplate: 'itemNotFound',
    waitOn: function() {
        return [Meteor.subscribe('units', {_id: this.params._id, userId: Meteor.userId()}),
                Meteor.subscribe('tenants', {userId: Meteor.userId()})];
    },
    data: function() {
        return Unit.findOne({_id: this.params._id, archive: {'$exists': false}});
    }
});

Router.route('/unitEdit/:_id', {
    name: 'unitEdit',
    notFoundTemplate: 'itemNotFound',
    waitOn: function() {
        return Meteor.subscribe('units', {_id: this.params._id, userId: Meteor.userId()});
    },
    data: function() {
        return Unit.findOne({_id: this.params._id, archive: {'$exists': false}});
    }
});

Router.route('/tenantEdit/:_id', {
    name: 'tenantEdit',
    notFoundTemplate: 'itemNotFound',
    waitOn: function() {
        return [Meteor.subscribe('units', {_id: this.params._id, userId: Meteor.userId()}),
            Meteor.subscribe('tenants', {userId: Meteor.userId()})];
    },
    data: function() {
        return Unit.findOne({_id: this.params._id, archive: {'$exists': false}});
    }
});
var requiredLoginAndPermission = function() {
    if (!Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        }
        else {
            this.render('accessDenied');
        }
    }
    else {
        if(Roles.userIsInRole(Meteor.userId(), ['tenant'])){
            this.render('tenantView');
        }
        else {
            this.next();
        }
    }
};

var register = function() {
    if (!Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        }
        else {
            this.render('register');
        }
    }
    else {
        this.next();
    }
};

Router.onBeforeAction(requiredLoginAndPermission, {
    only: ['buildingPage', 'unitPage', 'tenantPage', 'portfolioEdit', 'buildingEdit', 'unitEdit', 'tenantEdit']
});

Router.onBeforeAction('dataNotFound', {
    only: ['buildingPage', 'unitPage', 'tenantPage', 'portfolioEdit', 'buildingEdit', 'unitEdit', 'tenantEdit']
});

Router.onBeforeAction(register, {
    only: ['portfolioPage']
});

Router.onBeforeAction(requiredLoginAndPermission, {
    only: ['portfolioPage']
});