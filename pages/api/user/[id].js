import dbConnect from "../../../utils/dbConnect"
import User from "../../../models/User"

dbConnect();

export default async (req,res)=>{

    const {
        query: { id },
        method
    } = req

    switch(method) {
        case "GET":
            try {
                
                const user = await User.findById(id)

                if(!user){
                    return res.status(400).json({
                        success:false,
                        message: "Kullanıcı mevcut değil."
                    })
                }

                res.status(200).json({
                    success:true, 
                    message: "Kullanıcı bulundu",
                    data: user
                })

            } catch (error) {
                res.status(400).json({
                    success:false,
                })
            }
            break;
        case "PUT":
            try {
                const user = await User.findByIdAndUpdate(id,req.body,{
                    new:true,
                    runValidator:true
                })
                if(!user){
                    return res.status(400).json({
                        success:false,
                        message: "Kullanıcı mevcut değil."
                    })
                }

                res.status(200).json({
                    success:true, 
                    message: "Kullanıcı güncellendi",
                    data: user
                })
            } catch (error) {
                res.status(400).json({
                    success:false
                })
            }
            break;
        case "DELETE":
            try {
                const deletedUser = await User.deleteOne({_id:id})

                if(!deletedUser){
                    return res.status(400).json({
                        success:false,
                        message: "Kullanıcı mevcut değil."
                    })
                }

                res.status(200).json({
                    success:true, 
                    message: "Kullanıcı silindi",
                    user: deletedUser
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