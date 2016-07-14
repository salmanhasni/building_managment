Accounts.ui.config({
    extraSignupFields: [
        {
            fieldName: 'first_name',
            fieldLabel: 'First name',
            inputType: 'text',
            visible: true,
            saveToProfile: true,
            validate: function(value, errorFunction) {
                if (value.trim() == '') {
                    errorFunction('First name cannot be blank');
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            fieldName: 'last_name',
            fieldLabel: 'Last name',
            inputType: 'text',
            visible: true,
            saveToProfile: true,
            validate: function(value, errorFunction) {
                if (value.trim() == '') {
                    errorFunction('Last name cannot be blank');
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            fieldName: 'phone',
            fieldLabel: 'Phone Number',
            inputType: 'text',
            visible: true,
            saveToProfile: true,
            validate: function(value, errorFunction) {
                if (value.trim() == '') {
                    errorFunction('Phone number cannot be blank');
                    return false;
                } else {
                    if(isNaN(value) || value < 0)
                    {
                        errorFunction('Please enter valid Phone number');
                        return false;
                    }
                    return true;
                }
            }
        }
    ]
});