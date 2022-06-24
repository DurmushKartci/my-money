import dbConnect from "../../../utils/dbConnect"
import Gider from "../../../models/Gider"

dbConnect();

export default async (req,res)=>{

    const {
        query: { id },
        method
    } = req

    switch(method) {
        case "GET":
            try {
                
                const gider = await Gider.findById(id)

                if(!gider){
                    return res.status(400).json({
                        success:false,
                        message: "Gider mevcut değil."
                    })
                }

                res.status(200).json({
                    success:true, 
                    message: "Gider bulundu",
                    data: gider
                })

            } catch (error) {
                res.status(400).json({
                    success:false,
                })
            }
            break;
        case "PUT":
            try {
                const gider = await Gider.findByIdAndUpdate(id,req.body,{
                    new:true,
                    runValidator:true
                })
                if(!gider){
                    return res.status(400).json({
                        success:false,
                        message: "Gider mevcut değil."
                    })
                }

                res.status(200).json({
                    success:true, 
                    message: "Gider güncellendi",
                    data: gider
                })
            } catch (error) {
                res.status(400).json({
                    success:false
                })
            }
            break;
        case "DELETE":
            try {
                const deletedGider = await Gider.deleteOne({_id:id})

                if(!deletedGider){
                    return res.status(400).json({
                        success:false,
                        message: "Gider mevcut değil."
                    })
                }

                res.status(200).json({
                    success:true, 
                    message: "Gider silindi",
                    gider: deletedGider
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