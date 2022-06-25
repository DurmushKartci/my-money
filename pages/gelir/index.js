import Link from "next/link"
import Image from "next/image"
import fetch from 'isomorphic-unfetch'
import {Button,Card} from "semantic-ui-react"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

import {Line} from "react-chartjs-2"

const Index = ({hareketler,grafik_assets,user}) =>{
  return (
    <div className="wrapper container">
      <h1 className="col-12 text-center mb-1 mt-1" style={{fontSize:"50px",color:"black"}}>Gelir Sayfası</h1>
      <div className="row col-12 mt-1">
        <div className="col-lg-6">
          <div className="row">
            <div className="col-12 row">
              <Line data={grafik_assets.data} width={100} height={40} options={grafik_assets.options} />
            </div>
            <div className="col-12" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
              <Button primary  style={{padding:"10px",margin:"20px"}}>
                <Link href="/gelir/ekle">
                  <a style={{color:"white",fontSize:"20px"}}>Gelir Ekle</a>
                </Link>
              </Button>
            </div>
          </div>          
        </div>
        <div className="card col-lg-6">
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr className="active">
                  <th>Tarih</th>
                  <th>Başlık</th>
                  <th>Açıklama</th>
                  <th>Miktar</th>
                </tr>
              </thead>
              <tbody>
                {hareketler.map(hareket=>{
                return(              
                  <Link href="/">                              
                    <tr onClick={(e) =>{
                      console.log(e)
                      window.open("/api/"+(hareket.is_gelir ? "gelir" : "gider")+"/"+hareket._id)
                    }}
                    className={`${hareket.is_gelir ? "success" : "danger"} tiklanabilir hareket-item-row`}>
                      <th scope="row">{new Date(hareket.date).toDateString()}</th>
                      <td>{hareket.title}</td>
                      <td>{hareket.description}</td>
                      <td>{hareket.amount}</td>
                    </tr>
                  </Link>
                )
              })}
              </tbody>
            </table>  
          </div>
        </div>
      </div>
    </div>
  )
}

Index.getInitialProps = async ()=>{
  const res = await fetch("http://localhost:3000/api/gelir-gider-user")
  let {gelirler,giderler,user} = await res.json()
  
  let data = []

  gelirler.map(gelir =>{
    gelir["is_gelir"] = true
    data.push(gelir)
  })
  data.sort((a,b) =>{
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  let grafik_data = {
    labels:[],
    datasets:[
      {
        data: [],
        
      }
    ],
  }

  
  data.map(hareket=>{
    grafik_data.labels.push(hareket.title)
    grafik_data.datasets[0].data.push(hareket.amount)
    
  })


  let grafik_options = {    
    elements:{
      line:{
        tension:0,
        borderWidth:2,
        borderColor: "rgba(47,98,68,1)",
        fill:"origin",
        backgroundColor:"rgba(47,98,68,0.3)"
      },
      point:{
        radius:0,
        hitRadius:0
      },
    }
  }



  

  console.log(user)

  return {
    hareketler:data,
    grafik_assets:{
      data:grafik_data,
      options:grafik_options,
      
    },
    user:user
  }
}

export default Index;
