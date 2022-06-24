import dbConnect from "../../../utils/dbConnect"
import Gider from "../../../models/Gider"

dbConnect();

export default async (req,res)=>{
    let {method} = req

    switch(method) {
        case "GET":
            try {
                const giderler = await Gider.find({});

                res.status(200).json({
                    success: true,
                    message: "Giderler başarılı bir şekilde çekildi.",
                    data: giderler                    
                })
            } catch (error) {
                res.status(400).json({
                    success:false,
                    error:error
                })
            }
            break;
        case "POST":
            try {
                const gider = await Gider.create(req.body);

                req.status(201).json({
                    success: true,
                    message: "Yeni gider başarılı bir şekilde oluşturuldu",
                    data: gider
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