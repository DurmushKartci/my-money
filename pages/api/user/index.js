import dbConnect from "../../../utils/dbConnect"
import User from "../../../models/User"

dbConnect();

export default async (req,res)=>{
    let {method} = req

    switch(method) {
        case "GET":
            try {
                const users = await User.find({});

                res.status(200).json({
                    success: true,
                    message: "Kullanıcılar başarılı bir şekilde çekildi.",
                    data: users                    
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
                const user = await User.create(req.body);

                req.status(201).json({
                    success: true,
                    message: "Yeni kullanıcı başarılı bir şekilde oluşturuldu",
                    data: user
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