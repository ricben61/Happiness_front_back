
const mongoose = require("mongoose");

const prestationSchema = new mongoose.Schema(
    {
       
        title :{
            type:String,
            require:true,
        },
        description: {
            type: String,
            require: true
        },
        
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Prestation", prestationSchema);

