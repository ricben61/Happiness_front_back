const jwt = require('jsonwebtoken');
require("dotenv").config();


const PRIVATE_KEY = process.env.PRIVATE_KEY

const auth = (req, res, next) => { 
  
   
//    try {
//         // console.log("coucou");

//         const token = req.headers.authorization.split(' ')[1];
//         // const token = req.headers["authorization"];
//         // console.log(token);
//         const decodedToken = jwt.verify(token, PRIVATE_KEY);
//         // console.log(decodedToken);
//         const userId = decodedToken.userId;
//     //   console.log(userId);
//         req.auth = {
//             userId: userId
//         }
       
//      next();
     
//     } catch(error) {
//         res.status(401).json({ error });
//     }


    try{
        //--extraire le token du header "autorization"
        const token= req.headers.authorization.split(" ")[1];
        //---on verifie la validité du token
        jwt.verify(token, process.env.PRIVATE_KEY, (err,payload)=>{
            if(err) { 
                console.log(err);
                return res.status(401)
                .json({statut:401, message:"vous devez étre connecté"})
               
            } 
            req.payload = payload;
            next();  
        })

    }catch(error){
        res.status(500).json(error.message)
    }
};
 
module.exports = auth;
