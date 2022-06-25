import dbConnect from "../../../utils/dbConnect"
import Gelir from "../../../models/Gelir"

dbConnect();

export default async (req,res)=>{
    let {method} = req

    switch(method) {
        case "GET":
            try {
                const gelirler = await Gelir.find({});

                res.status(200).json({
                    success: true,
                    message: "Gelirler başarılı bir şekilde çekildi.",
                    data: gelirler                    
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
                const gelir = await Gelir.create(req.body);

                req.status(201).json({
                    success: true,
                    message: "Yeni gelir başarılı bir şekilde oluşturuldu",
                    data: gelir
                })
            } catch (error) {                
                res.status(400).json({
                    success:false,
                    error:await error
                })
            }
            break;
        default:             
            res.status(400).json({
                success:false
            })


    }
}