Unit = new Mongo.Collection("unit");

Unit.allow({
    remove: function(userId, unit) {
        return ownDocument(userId, unit);
    },
    update: function(userId, unit){
        return ownDocument(userId, unit);
    }
});

Meteor.methods({
    unitInsert: function(unitAttributes) {
        check(Meteor.userId(), String);
        check(unitAttributes, {
            alias: String,
            sqrfootage: String,
            residents: String,
            buildingId: String,
        });

        var buildingExist = Building.findOne({_id: unitAttributes.buildingId});

        if(!buildingExist)
            throw new Meteor.Error(SECURITY_IMPERSONATION_TITLE, SECURITY_IMPERSONATION_TITLE);

        var unitWithSameAlias = Unit.findOne({alias: unitAttributes.alias});
        if(unitWithSameAlias) {
            return {
                unitExist: true,
                _id: unitWithSameAlias._id
            };
        }
        
        var user = Meteor.user();
        var unit = _.extend(unitAttributes, {
            userId: user._id,
        });
        var unitId = Unit.insert(unit);
        return {
            _id: unitId
        };
    },
    unitUpdate: function(unitId, tenant, password){
        try{
            var userId = Accounts.createUser({
                email: tenant.email,
                password: password,
                profile: tenant
            });
            if(!Roles.userIsInRole(userId, ['tenant'])){
                Roles.addUsersToRoles(userId, 'tenant')
            }
            Unit.update({_id: unitId}, {$set: {tenantId: userId}});
            if(Meteor.isServer){
                Meteor.users.update({_id: userId}, {$set: {createdBy: Meteor.userId()}});
            }
        }
        catch(err) {
            throw new Meteor.Error('Email address already exist');
        }
    },
    unitRemove: function(unit){
        check(Meteor.userId(), String);

        Unit.remove({_id: unit._id}, function(){
            Meteor.users.remove({_id: unit.tenantId});
        });
    },
    tenantUpdate: function(unit, tenant, credentials){
        check(Meteor.userId(), String);
        try{
            if(Meteor.isServer){
                Accounts.removeEmail(unit.tenantId, Meteor.users.findOne({_id: unit.tenantId}).profile.email);
                Accounts.addEmail(unit.tenantId, credentials.email, false);
                Accounts.setPassword(unit.tenantId, credentials.password);
                Meteor.users.update({_id: unit.tenantId}, {$set: {profile: tenant}});
            }
        }
        catch(err) {
            throw new Meteor.Error('Email address already exist');
        }
    }
});

validateTenant = function(tenant){
    var errors = {};
    if(!tenant.first_name) {
        errors.first_name = TENANT_EMPTY_FIELD;
    }
    if(!tenant.last_name) {
        errors.last_name = TENANT_EMPTY_FIELD;
    }
    if(!tenant.phone) {
        errors.phone = TENANT_EMPTY_FIELD;
    }
    if(!tenant.email) {
        errors.email = TENANT_EMPTY_FIELD;
    }
    
    return errors;

};
