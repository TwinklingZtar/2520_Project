const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/userController");
const session = require("express-session");
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);


/////////////////////////////////////////////////
const passport = require("./middleware/passport");
app.use(passport.initialize());
app.use(passport.session());
////////////////////////////////////////////////
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

app.use(ejsLayouts);





app.set("view engine", "ejs");

// Routes start here

app.get("/reminders", reminderController.list);

app.get("/reminder/new", reminderController.new);

app.get("/reminder/:id", reminderController.listOne);

app.get("/reminder/:id/edit", reminderController.edit);

app.post("/reminder/", reminderController.create);


/////////////////////////////////
////  PASSPORT STUFF  ///////////





app.use((req, res, next) => {
  console.log(`User details are: `);
  console.log(req.user);

  console.log("Entire session object:");
  console.log(req.session);

  console.log(`Session details are: `);
  console.log(req.session.passport);
  next();
});
//////////////////////////////////////////


// Implement this yourself
app.post("/reminder/update/:id", reminderController.update);

// Implement this yourself
app.post("/reminder/delete/:id", reminderController.delete);

app.get("/login", (req, res) => {
  res.render("login");
})

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/login",
  })
);

// Fix this to work with passport! The registration does not need to work, you can use the fake database for this.
// app.get("/register", authController.register);
// app.get("/login", authController.login);
// app.post("/register", authController.registerSubmit);
// app.post("/login", authController.loginSubmit);

app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser 🚀"
  );
});
