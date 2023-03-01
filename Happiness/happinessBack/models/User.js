const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema(
    {
        name: {
                type: String,lowercase: true, required: [true, "ne peut être vide"], match: [/^[a-zA-Z0-9]+$/, 'incorrect'], index: true,
           
        },
        email: {
            
            type: String, lowercase: true, required: [true, "ne peut être vide"], index: true
        },
        password: {
            type: String,
            require: true,
        },
        isAdmin: {
            type: Boolean,
            default:false,
        },
    }, 
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function(){
    if(this.isModified("password"))
    {
        this.password = await bcrypt.hash(this.password,10) 
    }

})

module.exports = mongoose.model("User", userSchema);