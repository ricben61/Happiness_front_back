const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        author:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
        prestation:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Prestation',
            require: true
        },
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

module.exports = mongoose.model("Comment", commentSchema);