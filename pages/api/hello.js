import dbConnect from "../../utils/dbConnect.js"

dbConnect();

export default async (req,res)=> {

  res.json(
    {
      hello:"Hello"
    }
  );

}