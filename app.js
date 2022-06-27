import QRCode from "qrcode";
import express from "express";

const app = express();
//initializing express

app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
//setting viewing engine

app.use(express.static("public"));
//defining the 'public' as static folder

//creating server on port 5000 or you can replace port.
app.listen(5000, async (req, res) => {
  console.log("Server has started");
});



app.post("/",async(req,res)=>{
  var text=req.body.data
  console.log(text);
  try {
    if(text){

      QRCode.toFile(
        "public/qr.jpeg",
        //loaction where to store image with name
        text,
        //this 'text' is the text which is converted in QR code
        {
          color: {
            dark: "#000",
            light: "#fff",
          },
          //adding colour to QR image
        },
        function (err) {
          if (err) throw err;
        }
        //Throws error is error occurs

      );
      res.redirect("/generated")
      //redirect the page after successfully generateing QR image
  }    
  } catch (error) {
    res.send("error");
  }
  //throws error if error occur inside try catch block 
})


app.get("/", async (req, res) => {
  res.render("index");
  //simple rendering index.ejs
});

app.get('/generated',async(req,res)=>{
  res.render("qr")
  //rendering the Generated qr code
})