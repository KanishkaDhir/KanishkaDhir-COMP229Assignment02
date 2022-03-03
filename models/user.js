let mongoose = require('mongoose');
let crypto = require('crypto');//crypto is from node.js

// Create a model class
let UserSchema = mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: {
            type: String,
            match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
        },
        username: {
            type: String,
            unique: true,//username should be unique, shouldn't match with anyothers
            required: 'username is required',
            trim: true
        },
        password: {
            type: String,
            validate: [(password) => {
                return password && password.length > 6;
            }, 'Password should be longer']
        },
        salt: String,
        created: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: "user"//give name of collection in database that you want to associate ur model to
        //if collection is not present in db, then mongodb will automatically create new collection
    }
);

UserSchema.virtual('fullName')//this is a virtual attribute. this is not present in db.created virtually
    .get(function() {
        return this.firstName + ' ' + this.lastName;
    })
    .set(function(fullName) {
        let splitName = fullName.split(' '); //split returns an array 
        this.firstName = splitName[0] || '';
        this.lastName = splitName[1] || '';
});

// Middleware pre, to runn before action save
//every password will be saved in encrypted version in db and every password will be different as value of salt is different

UserSchema.pre('save', function(next) {
    if (this.password) {
        //randomly add 16 characters to password and get back as 64 bytes and using buffer will save it to salt
        //we use random characters just to have different combination of password
        this.salt = Buffer.from(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);//this is to store the encrypted version of password
    }
    next();
});

// Middleware post to run after action save
UserSchema.post('save', function(next){
    console.log('The user "' + this.username +  '" details were saved.');
});

//these are instance methods, so we need to create object inorder to use them
UserSchema.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');//to encrypt using algorithm sha512
};

UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

//exports inventory collection as inventoryModel. this model func comes with create,upadte,search methods for mongodb, to manipulate data    
module.exports = mongoose.model('user', UserSchema);