import Link from "next/link"
import {useState,useEffect} from "react"
import fetch from "isomorphic-unfetch"
import {Button,Form,Loader} from "semantic-ui-react"
import {useRouter} from "next/router"

const newGelir = () => {
    const [form,setForm] = useState({
        user_id:"62b6487d53724f7226d5129b",
        title:"",
        description:"",
        date:"",
        amount:0
    })

    const [isSubmitting,setIsSubmitting] = useState(false)
    const [error,setErrors] = useState({})
    const router = useRouter()

    useEffect(()=>{
        if(isSubmitting){
            if(Object.keys(error).length == 0){
                createGelir()
                
            }else{
                setIsSubmitting(false)
            }
        }
    })

    const createGelir = async () => {
        try {
            const res =  await fetch('http://localhost:3000/api/gelir',{
                method: "POST",
                header:{
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(form)                
            })
            console.log(await res.json())
            // router.push("/")
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        let err = validate();
        setErrors(err);
        setIsSubmitting(true)
    }
    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const validate = () =>{
        let err = {}

        if(!form.title){
            err.title = "Başlık zorunlu"
        }

        if(!form.date || form.date == ""){
            err.date = "Tarih zorunlu"
        }

        form.date = new Date(form.date)
        console.log(form)

        if(!form.amount){
            err.amount = "Miktar zorunlu"
        }

        return err;
    }

    return (
        <div className="form-container">
            <h1>Gelir Ekle</h1>
            <div>
                {
                    isSubmitting ?
                    <Loader active incline="centered"/> :
                    <Form onSubmit={handleSubmit}>
                        <Form.Input 
                            fluid
                            error={error.title ? {content:"Lütfen bir başlık yazınız.",pointing:"below"}:null}
                            label="Başlık"
                            placeHolder="Başlık"
                            name="title"
                            onChange={handleChange}
                        />
                        <Form.TextArea 
                            fluid
                            label="Açıklama"
                            placeHolder="Açıklama"
                            name="description"
                            onChange={handleChange}
                        />
                        <Form.Input 
                            type="date"
                            fluid
                            error={error.date ? {content:"Lütfen bir tarih seçiniz.",pointing:"below"}:null}
                            label="Tarih"
                            placeHolder="Tarih"
                            name="date"
                            onChange={handleChange}
                        />
                        <Form.Input 
                            type="number"
                            fluid
                            error={error.amount ? {content:"Lütfen bir tarih seçiniz.",pointing:"below"}:null}
                            label="Miktar"
                            placeHolder="Miktar"
                            name="amount"
                            onChange={handleChange}
                        />
                        <div className="col-12" style={{display:"flex",justifyContent:"center",alignItems:"center",padding:"10px"}}>
                            <Button type="submit" primary style={{fontSize:"14px"}}>Ekle</Button>
                        </div>
                        
                    </Form>


                }
            </div>
        </div>
    )
}

export default newGelir