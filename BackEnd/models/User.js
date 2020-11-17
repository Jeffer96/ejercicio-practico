const mongObj = require('mongoose');
const SchemaObj = mongObj.Schema;
var objId = SchemaObj.ObjectId;

//We will define the Schema of the user type data
let User = new SchemaObj(
    {
        _id: { type: objId, auto: true },
        cc: { type: Number, required: true },
        lastNames: { type: String, required: true},
        firstNames: { type: String, required: true},
        age: { type: Number, required: true},
        email: {type: String},
        cellPhone: {type: Number},
        address: {type: String},
        urlPhoto: {type: String}
    }, {
        collection: 'users'
    });

mongObj.set('useFindAndModify', false);

module.exports = mongObj.model('User', User);