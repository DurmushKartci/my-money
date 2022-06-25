import dbConnect from "../../../utils/dbConnect"
import Gelir from "../../../models/Gelir"
import Gider from "../../../models/Gider"
import User from "../../../models/User"

dbConnect();

export default async (req,res)=>{
    let {method} = req

    switch(method) {
        case "GET":
            try {
                const gelirler = await Gelir.find({});

                const giderler = await Gider.find({});

                let user = await User.find({});
                
                user = user[0]

                res.status(200).json({
                    success: true,
                    message: "Gelir Giderler user başarılı bir şekilde çekildi.",
                    gelirler: gelirler,
                    giderler: giderler,   
                    user:user
                                     
                })
            } catch (error) {
                res.status(400).json({
                    success:false,
                    error:error
                })
            }
            break;
        default:             
            res.status(400).json({
                success:false
            })


    }
}