const mongoose = require('mongoose');
const bcrypt = require ("bcryptjs");

const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        trim:true,
        require:[true, 'First name is required'],
        maxlength:32,

    },
    LastName: {
        type:String,
        trim:true,
        require:[true, 'Last name is required'],
        maxlength: 32,
        
    },
    email: {
        type:String,
        trim:true,
        require:[true, 'email is required'],
        unique :true,
        match:  [ /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/, 
                    `plese add a valid email`
                ],
        maxlength: 120,
        
    },
    password: {
        type:String,
        trim:false,
        require:[true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
        maxlength: 120,
        
    },
    role :{
        type: Number,
        default:0
    }
    

},{timestamps:true}
)

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

module.exports = mongoose.model ("User", userSchema);