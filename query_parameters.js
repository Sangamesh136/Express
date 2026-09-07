const express = require('express')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

PORT = 3000

let users = [
  {
    name:'Sam',
    healthy: [
      { left:true },
      { right: false }
    ]
  },
  {
    name:'Nutan',
    healthy:[
      { left: true },
      { right: true }
    ]
  }
]
function finduser(name){
  return users.find(user => user.name === name)
}

function getDetails(details){
  totalKidneys = details.healthy.length;
  healthyKidneys = details.healthy.filter(kidney =>{
    return Object.values(kidney)[0] === true
  }).length
  unhealthyKidneys = totalKidneys-healthyKidneys;
  return {total: totalKidneys,healthy: healthyKidneys,unhealthy: unhealthyKidneys}
}

function addData(fname,fhealthy){
  user = {
    name: fname,
    healthy: fhealthy
  }
  users.push(user)
  console.log(users)

}

app.get('/',(req,res)=>{
  const name = req.query.n;
  const details = finduser(name);
  const ans = getDetails(details)
  
  console.log(ans)
  res.send({total: ans.total,
    healthy: ans.healthy,
    unhealthy: ans.unhealthy
  })
})

app.post('/',(req,res)=>{
  let fname = req.body.fname;
  let healthy = req.body.healthy;
  addData(fname,healthy)
  res.json({fname,healthy})

})

app.get('/allusers',(req,res)=>{
  res.json(users)
})


app.listen(PORT,()=>{
  console.log( `Server is running at ${PORT}`)
})

