const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require('https');

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us7.api.mailchimp.com/3.0/lists/a6e7e22d2d";
    const options = {
        method: "POST",
        auth: "arvin1:288d1ca54a61cbd730a3e1fbd38d5def-us7"
    }

     const request = https.request(url, options, (response) => {

        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", (data) => {
            console.log(JSON.parse(data))
        })
    })
    
    //request.write(jsonData);
    request.end()
})

app.post("/failure", (req, res) => {
    res.redirect("/")
})

app.listen(port, () =>{
    console.log(`Server is running 🚀  on port ${port}`);
})
