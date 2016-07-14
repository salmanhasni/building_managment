/**
 * Created by Salman Hasni on 2/21/2016.
 */
Template.alertBox.helpers({
    alertHeaderContent: function(){
        var alert = Session.get('alert');
        return alert.alertHeaderContent;
    },
    alertContent:   function(){
        var alert = Session.get('alert');
        return alert.alertContent;
    }
}
);