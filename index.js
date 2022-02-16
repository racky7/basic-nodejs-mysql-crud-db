const express = require("express");
const bodyParser = require("body-parser")
const con = require("./config");
const app = express();

app.use(bodyParser.json());

app.get("/", (req, resp) => {

  con.query("select * from users", (err, result) => {
    if (err) { resp.send("error in api")
    	console.log(err)
     }
    else { resp.send(result) }
  })

  // console.log('running...')
});

app.get("/:id", (req, resp) => {
	const {id} = req.params
  con.query("SELECT * FROM users WHERE id=?", id, (err, result) => {
    if (err) { resp.send("error in api")
    	console.log(err)
     }
    else { resp.send(result) }
  })
});

app.post("/", (req, resp)=>{
  const data = req.body;
  console.log(data)
  con.query('INSERT INTO users SET ?', data, (error, results, fields)=>{
    if(error) throw error;
    resp.send(results)
  })
});

app.put("/:id",(req,resp)=>{
  const data= [req.body.first_name,req.body.last_name,req.body.email,req.body.phone,req.params.id];
  console.log(data)
  con.query("UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE id = ?",
  data,(error,results,fields)=>{
    if(error) throw error;
    resp.send(results)
  })
 
})

app.delete("/:id", (req, resp) => {
	const {id} = req.params
  con.query("DELETE FROM users WHERE id=?", id, (err, result) => {
    if (err) { resp.send("error in api")
    	console.log(err)
     }
    else { resp.send(result) }
  })
});



app.listen("3000")