Meteor.publish('portfolios', function(options){
    if (this.userId === options.userId)
        return Portfolio.find(options);
    else
        throw new Meteor.Error(SECURITY_IMPERSONATION_TITLE, SECURITY_IMPERSONATION_MESSAGE);
});

Meteor.publish('buildings', function(options){
    if (this.userId === options.userId)
        return Building.find(options);
    else
        throw new Meteor.Error(SECURITY_IMPERSONATION_TITLE, SECURITY_IMPERSONATION_MESSAGE);
});

Meteor.publish('units', function(options){
    if (this.userId === options.userId)
        return Unit.find(options);
    else
        throw new Meteor.Error(SECURITY_IMPERSONATION_TITLE, SECURITY_IMPERSONATION_MESSAGE);
});

Meteor.publish('tenants', function(options){
    return Meteor.users.find({roles : {$in: ['tenant']}, createdBy: options.userId});
});

