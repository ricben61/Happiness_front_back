const mongoose = require("mongoose");

const AvisClientsSchema = new mongoose.Schema(
    {
        author:{
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        description: {
            type: String,
            require: true
        },
        
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model("avisclients", AvisClientsSchema);