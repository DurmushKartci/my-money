import dbConnect from "../../../utils/dbConnect"
import Gelir from "../../../models/Gelir"
import Gider from "../../../models/Gider"

dbConnect();

export default async (req,res)=>{
    let {method} = req

    switch(method) {
        case "GET":
            try {
                const gelirler = await Gelir.find({});

                const giderler = await Gider.find({});

                res.status(200).json({
                    success: true,
                    message: "Gelir Giderler başarılı bir şekilde çekildi.",
                    gelirler: gelirler,
                    giderler: giderler,                    
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