import express from 'express';
import bodyparser from 'body-parser';
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

let notes = [];
app.get("/", (req,res) =>{
    res.render("index.ejs", {
        Notes: notes
    });
});

app.post("/submit",(req,res) =>{
    let isThere = false;
    for(let i = 0; i < notes.length; i++) {
        if(notes[i].id == req.body.id) {
            isThere = true;
        };
    };
    console.log(`istrue: ${isThere}`);
    if(!isThere) {
        if(req.body.addNotes !== "") {
            notes.push({
                id: req.body.id,
                note: req.body.addNotes
            });
            for(let i = 0 ; i<=notes.length;i++){
                console.log(notes[i]);
            };
            return res.render('index.ejs', {
                Notes: notes
            });
        } else {
            return res.render('index.ejs', {
                Notes: notes
            });
        }
    } else {
        return res.render("index.ejs", {
            Notes: notes
        })
    } 
});
app.post("/delete", (req,res) =>{
   let target = req.body.id;
   for(let i = 0; i<notes.length; i++){
        if(notes[i].id == target){
            console.log(notes[i], target);
            notes.splice(i,1);
        }
   }
   res.render("index.ejs",{
    Notes:notes
   });
});

app.listen(port,() =>{
    console.log("Server is running on " + port);
});