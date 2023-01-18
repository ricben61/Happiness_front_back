const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const auth = require("../midldlewares/auth")


router.post("/new-comment",auth , async(req, res)=>{

    try{
        const comment = new Comment(req.body);
        const newComment= await comment.save();
       return res.status(201).json({status:201, message:`le commentaire ${newComment.title} a bien été créé`, post:newComment})

        }
    catch (error){
      return  res.status(500).json(error.message)
    }    
        
    });



router.get("/", async ( req , res ) => {
    try {
        const CommentList = await Comment.find().sort("-createdAt");
       return res.status(200).json({status:200, result:CommentList});
    } 
    catch (error) {
       return res.status(500).json(error.message)
    }
})


router.get("/:id", async (req,res) => {
    try {
        const commentId = await Comment.findById(req.params.id)
        if (!commentId) {
            return res.status(400).json({ message: "ce commentaire n'existe pas", statut: 400 })
         }
         else {
            return res.status(200).json({status:200, result:commentId})
         }
    } 
    catch (error) {
      return  res.json(error.message)
    }
})

router.put("/update/:id", auth,async (req,res) =>{
    try {
        const comment = await Comment.findById(req.params.id)
       if (!comment) {
       return res.status(404).json({status:400 , message: "ce commentaire n'existe pas", statut: 400 })
     }
        
        await comment.updateOne(req.body);
        return res.status(200).json({message:" le commentaire à bien été modifié "})
     
    }
    catch (error) {
        res.json(error.message)
    }

} )




router.delete("/delete/:id", async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: " le commentaire à bien été supprimé " })

    }
    catch (error) {
        res.json(error.message)

    }

})



module.exports = router;


