const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('cookie-session');
const bodyParser = require('body-parser');
const Song = require('./models/Song');
const methodOverride = require("method-override");
const { response } = require("express");
app.use(methodOverride("_method"));

//connect mongodb
mongoose
  .connect("mongodb+srv://sk071150:sk071150@cluster0.lupcbgq.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("We have finally able to connect the fucking mongoDB server.");
  })
  .catch((e) => {
    console.log("Connection failed.");
    console.log(e);
  });

  //set engine 
app.set('view engine','ejs');
const SECRETKEY = 'pugpfhgipojprhogdpdfgol';

const users = new Array(
    {name: 'Mary', password: 'watermelon'},
    {name: 'skps00', password:'69333'}
);

app.set('view engine','ejs');
//session key for user
app.use(session({
    name: 'user-session',
    keys: [SECRETKEY]
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//get home page
app.get("/", (req,res) => {
    console.log(req.session);
    if (!req.session.authenticated){
        res.render('login.ejs');
    } else {
        res.status(200).render('homepage.ejs',{name:req.session.username});
    }
});

// Login page from users
app.get('/login', (req,res) => {
	res.status(200).render('login',{});
});
app.post('/login', (req,res) => {
	users.forEach((user) => {
		if (user.name == req.body.name && user.password == req.body.password) {
			req.session.authenticated = true;       
			req.session.username = req.body.name;	
		}
	});
	res.redirect('/');
});

// Logout button from users
app.get('/logout', (req,res) => {
	req.session = null;  
	res.redirect('/');
});

//create new songs 
app.get("/create", (req, res) => {
  res.render('create.ejs');
});

app.post('/create', (req,res) => {
  const id = req.body.id;
  const name = req.body.name;
  const type = req.body.type;
  const singer = req.body.singer;
  const cost = req.body.cost;
  const year = req.body.year;
  console.log(id,name,type,singer,cost,year)

  const song = new Song({id,name,type,singer,cost,year})
  song
  .save()
  .then(() => {
    res.redirect('/');
  })
  .catch((e) => {
    console.log("Songs Saving Not Accept")
    console.log(err)
    res.render("reject.ejs");
  });
});





//Display songs by API
app.get("/song", async (req, res) => {
  try {
    let data = await Song.find();
    res.render("show.ejs", { data });
  } catch {
    res.send("Error with getting data.");
  }
});

// Detect error occurs
app.get("/song/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let data = await Song.findOne({ id });
    if (data !== null) {
      res.render("song.ejs", { data });
    } else {
      res.send("Cannot find this Song.");
    }
  } catch (e) {
    res.send("Error!!");
    console.log(e);
  }
});


//edit songs page 
//Users would not allow to edit the ID 
app.get("/song/edit/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let data = await Song.findOne({ id });
    if (data !== null) {
      res.render("edit.ejs", { data });
    } else {
      res.send("Cannot find student.");
    }
  } catch {
    res.send("Error!");
  }
});

app.put("/song/edit/:id", async (req, res) => {
  let { id, name, type, singer, cost, year } = req.body;
  try {
    let d = await Song.findOneAndUpdate(
      { id },
      { id, name, type, singer, cost, year  },
      {
        new: true, runValidators: true,
      }
    );
    res.redirect(`/song/${id}`);
  } catch {
    res.render("reject.ejs");
  }
});

//Delete songs by id 
app.get("/song/delete/:id", async (req, res) => {
  const {id} = req.params;
  Song.deleteOne({id})
    .then((meg) => {
      res.redirect('/song');
    })
});



//Restful

app.delete("/restful/delete/:id", async (req, res) => {
  const {id} = req.params;
  Song.deleteOne({id})
    .then((meg) => {
      res.send("Deleted")
    })
});

app.post('/restful/create', (req,res) => {
  const id = req.body.id;
  const name = req.body.name;
  const type = req.body.type;
  const singer = req.body.singer;
  const cost = req.body.cost;
  const year = req.body.year;
  console.log(id,name,type,cost,year)
  const song = new Song({id,name,type,cost,year})
  song
  .save()
  .then(() => {
    res.send("Song accepted");

  })
  .catch((e) => {
    res.send(e)
  });
});


// When user input link that is not existed
app.get("/*", (req,res) =>{
  res.status(404);
  res.render("error.ejs");
});

// lisiten form port 8888
app.listen(app.listen(process.env.PORT || 8888));

