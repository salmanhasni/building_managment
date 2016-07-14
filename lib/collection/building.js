Building = new Mongo.Collection("building");

Building.allow({
    remove: function(userId, building) {
        return ownDocument(userId, building);
    },
    update: function(userId, building){
        return ownDocument(userId, building);
    }
});

validateBuilding = function(building) {
    var errors = {};
    if(!building.address) {
        errors.address = BUILDING_ADDRESS_ERROR;
    }
    if(building.address.length > 100 ){
        errors.address = BUILDING_ADDRESSRANGE_ERROR;
    }
    if(!building.owner) {
        errors.owner = BUILDING_OWNER_ERROR;
    }
    if(building.owner.length > 50 ){
        errors.owner = BUILDING_OWNERRANGE_ERROR;
    }

    return errors;
};

Meteor.methods({
    buildingInsert: function(buildingAttributes) {
        check(Meteor.userId(), String);
        check(buildingAttributes, {
            address: String,
            owner: String,
            portfolioId: String,
        });

        var errors = validateBuilding(buildingAttributes);
        if(errors.address)
            throw new Meteor.Error(BUILDING_INVALID, errors.address);

        if(errors.owner)
            throw new Meteor.Error(BUILDING_INVALID, errors.owner);

        var portfolioExist = Portfolio.findOne({_id: buildingAttributes.portfolioId});

        if(!portfolioExist)
            throw new Meteor.Error(SECURITY_IMPERSONATION_TITLE, SECURITY_IMPERSONATION_TITLE);

        var buildingWithSameAddress = Building.findOne({address: buildingAttributes.address});
        if(buildingWithSameAddress) {
            return {
                buildingExist: true,
                _id: buildingWithSameAddress._id
            };
        }

        var user = Meteor.user();
        var building = _.extend(buildingAttributes, {
            userId: user._id
        });
        var buildingId = Building.insert(building);
        return {
            _id: buildingId
        };
    },
    buildingRemove: function(buildingId){
        check(buildingId, String);
        check(Meteor.userId(), String);

        Unit.remove({buildingId: buildingId});
        Building.remove({_id: buildingId});
    },
});