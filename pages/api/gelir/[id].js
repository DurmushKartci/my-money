import dbConnect from "../../../utils/dbConnect"
import Gelir from "../../../models/Gelir"

dbConnect();

export default async (req,res)=>{

    const {
        query: { id },
        method
    } = req

    switch(method) {
        case "GET":
            try {
                
                const gelir = await Gelir.findById(id)

                if(!gelir){
                    return res.status(400).json({
                        success:false,
                        message: "Gelir mevcut değil."
                    })
                }

                res.status(200).json({
                    success:true, 
                    message: "Gelir bulundu",
                    data: gelir
                })

            } catch (error) {
                res.status(400).json({
                    success:false,
                })
            }
            break;
        case "PUT":
            try {
                const gelir = await Gelir.findByIdAndUpdate(id,req.body,{
                    new:true,
                    runValidator:true
                })
                if(!gelir){
                    return res.status(400).json({
                        success:false,
                        message: "Gelir mevcut değil."
                    })
                }

                res.status(200).json({
                    success:true, 
                    message: "Gelir güncellendi",
                    data: gelir
                })
            } catch (error) {
                res.status(400).json({
                    success:false
                })
            }
            break;
        case "DELETE":
            try {
                const deletedGelir = await Gelir.deleteOne({_id:id})

                if(!deletedGelir){
                    return res.status(400).json({
                        success:false,
                        message: "Gelir mevcut değil."
                    })
                }

                res.status(200).json({
                    success:true, 
                    message: "Gelir silindi",
                    gelir: deletedGelir
                })

            } catch (error) {
                res.status(400).json({
                    success:false,
                })
                
            }
            break;
        default:
            res.status(400).json({
                success:false,
            })
    }

}