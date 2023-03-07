const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema(
    {
        name: {
                type: String,lowercase: true, required: [true, "ne peut être vide"], match: [/^[a-zA-Z0-9]+$/, 'incorrect'], index: true,
           
        },
        email: {
            
            type: String, lowercase: true, required: [true, "ne peut être vide"],match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/], index: true
        },
        password: {
            type: String,
            required: [true, "ne peut être vide"],
            // match:[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+,\-.={}[\]:";'<>,.?\/]).{8,15}$/],
            validate: {
                validator: function(v) {
                  return  /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\|,.<>\/?])(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\|,.<>\/?]{8,}$/.test(v);
                },
                message: props => `${props.value} n'est pas un mot de passe valide! Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un chiffre, doit avoir au moins 8 caractères et doit contenir au moins un caractère spécial !@#$%^&*(),.?":{}|.`
              }
             
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