import Link from "next/link"
import fetch from 'isomorphic-unfetch'
import {Button,Card} from "semantic-ui-react"

const Index = ({hareketler}) =>{
  return (
    // <div className="notes-container">
    //   <h1>Notes</h1>
    //   <div className="grid wrapper">
    //       {gelirler.map(gelir=>{
    //         return(
    //           <div key={gelir._id}>
    //             <Card>
    //               <Card.Content>
    //                 <Card.Header>
    //                   <Link href={`/gelir/${gelir._id}`}>
    //                     <a>{gelir.title}</a>
    //                   </Link>
                      
    //                 </Card.Header>
    //               </Card.Content>
    //               <Card.Content extra>
    //                 <Link href={`/gelir/${gelir._id}`}>
    //                   <Button primary>Görüntüle</Button>
    //                 </Link>
    //                 <Link href={`/gelir/${gelir._id}/duzenle`}>
    //                   <Button primary>Düzenle</Button>
    //                 </Link>
    //               </Card.Content>
    //             </Card>
    //           </div>

    //         )
    //       })}
    //   </div>
    // </div>
    <div className="wrapper container">
      <div className="row col-12">
        <div className="col-lg-6">
        <table className="table table-hover">
          <thead>
            <tr>
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
                className={`${hareket.is_gelir ? "success" : "danger"}`}>
                  <th scope="row"></th>
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
  )
}

Index.getInitialProps = async ()=>{
  const res = await fetch("http://localhost:3000/api/gelir-gider")
  let {gelirler,giderler} = await res.json()
  
  let data = []

  gelirler.map(gelir =>{
    gelir["is_gelir"] = true
    data.push(gelir)
  })

  giderler.map(gider =>{
    gider["is_gelir"] = false
    data.push(gider)
  })

  

  console.log(data)

  return {hareketler:data}
}

export default Index;
