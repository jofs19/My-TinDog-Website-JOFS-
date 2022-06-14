const express = require('express'); //EXPRESS JS
const request = require('request'); //REQUEST
const bodyParser = require('body-parser'); //BODY PARSER
const https = require('https'); //HTTPS
const ejs = require('ejs'); //EJS
const throttle = require('lodash.throttle');
const dogNames = require('dog-names'); //Dog name generator
const mongoose = require('mongoose');
const fs = require("fs");
const multer = require("multer");
const searchable = require('mongoose-searchable');

//USE Modules
const app = express(); //new instance for express
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');


//GLOBAL VARIABLES SECTION
var userName = [];


app.get("/", function (req, res) {

  res.render('sign-up');

}); //In order for our app up and running using the server. 

app.post("/", function (req, res) {


  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  userName.push(fname);

  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: fname,
        LNAME: lname
      }
    }]
  };


  var jsonData = JSON.stringify(data);
  //turn JSON data into String

  const url = "https://us14.api.mailchimp.com/3.0/lists/7512903f44";

  const options = {
    method: "POST",
    auth: "jofs:6f433711a573d992e3102b555f261528-us14"
  }

  const request = https.request(url, options, function (response) {

    console.log(response.statusCode);
    if (response.statusCode === 200) {
      res.render('home', {

        user: fname

      });
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    // response.on("data", function(data){

    //     console.log(JSON.parse(data));

    // });

  });

  request.write(jsonData);
  request.end();

  //POST data to external resource

});


//button inside home page that will redirect you to sign up page
app.post("/sign-up", function (req, res) {
  res.render('sign-up');
});


//Gallery page
app.get("/gallery", function (req, res) {

  res.render("gallery");

});

//About page
app.get("/about", function (req, res) {

  res.render("about");

});

//Pricing page
app.get("/pricing", function (req, res) {

  res.render("pricing");

});

app.post("/pricing", function (req, res) {

  res.render("thank-you", {

    user: userName.slice(-1)[0]


  });
  //Redirect to Home page after hitting submit button.

});


//Contact page
app.get("/contact", function (req, res) {

  res.render("contact");

});


//FAQs Page
app.get("/faq", function (req, res) {

  res.render("faq");

});



//Home page
app.get("/home", function (req, res) {

  res.render('home', {

    user: userName.slice(-1)[0]

  });

});

//mongo "mongodb+srv://cluster0.hyjfs.mongodb.net/myFirstDatabase" --username jofs20


//MONGOOSE INSERT

mongoose.connect('mongodb+srv://jofs20:persona4@cluster0.hyjfs.mongodb.net/MyTindogDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});



//GLOBAL VARIABLES

//Schema
const searchSchema = new mongoose.Schema({
  webTitle: String,
  webLink: String,
  webDescription: String,
  myKeyword: String
});

//Create model (collection)
const Search = mongoose.model("Search", searchSchema);


// Search.insertMany([{
//         webTitle: 'TinDog',
//         webLink: "https://safe-meadow-25882.herokuapp.com/home",
//         webDescription: "Let's meet new and interesting dogs nearby!"
//     },
//     {
//         webTitle: 'TinDog: Features',
//         webLink: "https://safe-meadow-25882.herokuapp.com/home#features",
//         webDescription: "User-friendly, So easy to use, even your dog could do it; Elite Clientele, We have all the dogs, the greatest dogs; Guaranteed to work, Find the love of your dog's life with one swipe!"
//     },
//     {
//         webTitle: "TinDog: Gallery",
//         webLink: "https://safe-meadow-25882.herokuapp.com/gallery", 
//         webDescription: "A dog’s companionship, loyalty and love naturally melts away a stressful day. Every day turns into a doggie photo-shoot and an opportunity to capture their funniest traits. The best way to put all these pictures to good use is with a dog photo album."
//     },
//     {
//         webTitle: 'TinDog: Quotes',
//         webLink: "https://safe-meadow-25882.herokuapp.com/gallery",
//         webDescription: "You can tell by the kindness of a dog how a human should be."
//     },
//     {
//         webTitle: 'TinDog: About Us',
//         webLink: "https://safe-meadow-25882.herokuapp.com/about",
//         webDescription: "Here at Tindog we want to provide you with the best online information resources for dogs! We love our pups and we understand how important it is for you to keep your dog safe, happy, and healthy!"
//     },
//     {
//         webTitle: 'TinDog: What is TinDog?',
//         webLink: "https://safe-meadow-25882.herokuapp.com/about",
//         webDescription: "Perhaps you think I started this website simply because I am passionate about dogs and dog breeding. Well, it’s totally true! I love how each dog is a story in itself, and each breeder is an artist (or scientist, or both). But more importantly, I created TinDog because I care about dog breeders immensely."
//     },
//     {
//         webTitle: 'TinDog: Mission & Vision',
//         webLink: "https://safe-meadow-25882.herokuapp.com/about",
//         webDescription: "Our Mission - Our mission is to empower you as a strong tribal leader of your fan base... At TinDog, we believe dog breeders are incredibly altruistic to their dogs and to their community."
//     },
//     {
//         webTitle: 'TinDog: About this App',
//         webLink: "https://safe-meadow-25882.herokuapp.com/about",
//         webDescription: "TinDog is a platform dedicated to ethical dog breeding around the world. Our team provides quality posts, in-depth articles, interviews, product reviews, and more."
//     },
//     {
//         webTitle: 'TinDog: Contact Us!',
//         webLink: "https://safe-meadow-25882.herokuapp.com/contact",
//         webDescription: "Welcome to our walk-up window. We’re open and eager to hear from you. Use the email address below to send all your questions, suggestions, feedback, ideas, or partnership requests. Expect a reply within 48 hour."
//     },
//     {
//         webTitle: 'TinDog: Frequently Asked Questions',
//         webLink: "https://safe-meadow-25882.herokuapp.com/faq",
//         webDescription: "Do you have any questions about TinDog? Find your answers here. If you don't find what you're looking for, contact us..."
//     },
//     {
//         webTitle: "TinDog: Frequently Asked Questions - What if I don't get a rebate confirmation email?",
//         webLink: "https://safe-meadow-25882.herokuapp.com/faq",
//         webDescription: "If you completed the entire application process but didn’t get a confirmation email from us, please check your spam, junk or clutter folders."
//     },
//     {
//         webTitle: "TinDog: Frequently Asked Questions - How often should I feed my dog?",
//         webLink: "https://safe-meadow-25882.herokuapp.com/faq",
//         webDescription: "A practical guideline is that puppies should be fed three times a day from weaning (3 to 6 weeks) to 4 months of age. After 4 months, they should be fed twice a day. Most dogs should continue to be fed twice a day throughout their life, although some pets do well with one feeding."
//     },
//     {
//         webTitle: "TinDog: Frequently Asked Questions - What should I do if my dog is constipated or has loose stools?",
//         webLink: "https://safe-meadow-25882.herokuapp.com/faq",
//         webDescription: "Keep in mind that the pet's stool should be small and firm. Most cases of constipation are temporary and due to dietary interruptions. Loose stools also are often temporary and can be due to dietary interruptions, as well as many other things, including an abrupt change in diet, overeating, parasites, medication, eating table scraps, viral or bacterial infections, and stress. If constipation or diarrhea persists, however, it is important to consult a veterinarian."
//     },
//     {
//         webTitle: "TinDog: Frequently Asked Questions - How much should I give my dog to eat?",
//         webLink: "https://safe-meadow-25882.herokuapp.com/faq",
//         webDescription: "The amount to feed depends on the age, size, and activity level of the dog. Feeding guidelines, which list the daily recommended portion, are included on all of our packages. Start feeding with this amount and adjust according to your pet's needs. Remember to divide the portion accordingly if you feed more than once a day."
//     },
//     {
//         webTitle: "TinDog: Frequently Asked Questions - Will it hurt my dog if I they eat my cat's food?",
//         webLink: "https://safe-meadow-25882.herokuapp.com/faq",
//         webDescription: "Cats and dogs have different nutritional requirements and really should not eat each other's food. For example, cats require a much higher level of taurine in their diet. An occasional venture into each other's bowls will not be harmful, but is not recommended on a regular basis."
//     },
//     {
//         webTitle: "TinDog: Frequently Asked Questions - What does it mean when a dog has webbed feet?",
//         webLink: "https://safe-meadow-25882.herokuapp.com/faq",
//         webDescription: "If your dog has webbed feet, the membranes between its toes are still intact. Webbed feet are the result of mutations in the genes that would normally cause this tissue to die before birth, separating the digits from each other. In some cases, a dog might not undergo this process before it is born, giving rise to a dog with webbed feet."
//     },
//     {
//         webTitle: "TinDog: Pricing",
//         webLink: "https://safe-meadow-25882.herokuapp.com/home#pricing",
//         webDescription: "If your dog has webbed feet, the membranes between its toes are still intact. Webbed feet are the result of mutations in the genes that would normally cause this tissue to die before birth, separating the digits from each other. In some cases, a dog might not undergo this process before it is born, giving rise to a dog with webbed feet."
//     },
//     {
//         webTitle: "TinDog: Download",
//         webLink: "https://safe-meadow-25882.herokuapp.com/home#cta",
//         webDescription: "Find the True Love of Your Dog's Life Today. Download for Android and iOS"
//     },
//     {
//         webTitle: "TinDog: Testimonial",
//         webLink: "https://safe-meadow-25882.herokuapp.com/home#testimonials",
//         webDescription: "My dog used to be so lonely, but with TinDog's help, they've found the love of their life. I think... I no longer have to sniff other dogs for love. I've found the hottest Corgi on TinDog. Woof."
//     },
//     {
//         webTitle: "TinDog: Join Us!",
//         webLink: "https://safe-meadow-25882.herokuapp.com/about",
//         webDescription: "To join our circle of passionate dog breeders and receive the best advice around, subscribe to our barking email newsletter. It’s free and furry!"
//     },
//     {
//         webTitle: "TinDog: Sign-up",
//         webLink: "https://safe-meadow-25882.herokuapp.com/",
//         webDescription: "Sign-up and Join us!!! Here at TinDog, we will help your dogs find its love!"
//     }
// ]).then(function () {
//     console.log("Data inserted") // Success
// }).catch(function (err) {
//     console.log(err) // Failure
// });


// const object = new Search({
//         webTitle: "Recommened for dog breeders!!!",
//         webLink: "https://safe-meadow-25882.herokuapp.com/reviews",
//         webDescription: "Without TinDog, it is extremely difficult to find love for a dog because there is so little information available about where to look for... But with TinDog's help, it became easier!",
//         myKeyword: "ratings, comment"
// });

// Search.insertMany([object], function(err){

//   if(err){
//       console.log(err);
//   }else{
//       console.log("Successfuly saved all data to the tindogDB");
//   }

// });


//6275ec5ed02efd7b0c8111c2

// Search.updateOne({_id: "6288bc8e80b224dd6d52372b"}, {myKeyword: "TinDog, ratings, rate, comment, experience, testimony, testimonial, review, page, community, compose, write, create, post"}, function(err){

//   if(err){
//       console.log(err);
//   }else{
//       console.log("Successfully updated the document!");
//   }

// });



searchSchema.index({
  webTitle: 'text',
  webDescription: 'text', //indexing mechanism
  webLink: 'text',
  myKeyword: 'text'
}, function (err, data) {
  console.log(err);
  console.log(data);
});




app.post("/home", function (req, res) {

  const result = req.body.search;
  Search.find({
      $text: {   //search all relevant documents that has a keyword of what the user input in the query
        $search: result //crawling mechanism
      }
    }, {
      score: {
        $meta: "textScore" //scoring mechanism
      }
    })
    .sort({
      score: {
        $meta: 'textScore' //ranking mechanism
      }
    })
    .exec(function (err, results) {

      console.log(results);
      res.render("result", { 

        searched: results

      });
    });

});

//inserted

app.post("/result", function (req, res) {

  const result = req.body.search;
  Search.find({
      $text: {
        $search: result
      }
    }, {
      score: {
        $meta: "textScore"
      }
    })
    .sort({
      score: {
        $meta: 'textScore'
      }
    })
    .exec(function (err, results) {
      // mySearch.push(results);
      res.render("result", {
        searched: results
      });

    });


});

//inserted

app.get("/result", function (req, res) {

  res.redirect("/home");

});





//WRITE A REVIEW
const homeStartingContent = "Read what our talented community members are saying about TinDog.";


const postSchema = {
  title: String,
  content: String,
  name: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/reviews", function (req, res) {

  Post.find({}, function (err, posts) {
    res.render("reviews", {
      startingContent: homeStartingContent,
      posts: posts
    });
  });
});

app.get("/compose", function (req, res) {
  res.render("compose", {

    user: userName.slice(-1)[0]


  });
});

app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
    name: req.body.nameOfUser
  });


  post.save(function (err) {
    if (!err) {
      res.redirect("/reviews");
    }
  });
});

app.get("/posts/:postId", function (req, res) {

  const requestedPostId = req.params.postId;

  Post.findOne({
    _id: requestedPostId
  }, function (err, post) {
    res.render("posts", {
      title: post.title,
      content: post.content,
      name: post.name
    });
  });

});

//WRITE A REVIEW

//MONGOOSE INSERT

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("Server has started succesfully");
});
//Mailchimp API Key
//b2f531f3ccbbcc9050f69b50d6377023-us14

//List ID
//ef7fe02ae7


//URL
//https://us14.api.mailchimp.com/3.0/
//"https://$API_SERVER.api.mailchimp.com/3.0/lists"

//https://www.bing.com/videos/search?q=php+-driven+website&view=detail&mid=C3F96EF1C6813FA17A2DC3F96EF1C6813FA17A2D&FORM=VIRE
