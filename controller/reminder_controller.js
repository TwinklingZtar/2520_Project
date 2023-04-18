let database = require("../database");

let remindersController = {
  list: (req, res) => {
    const user = database.userModel.findOne((req.user).email)
    res.render("reminder/index", { reminders: user.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    const user = database.userModel.findOne((req.user).email)
    let reminderToFind = req.params.id;
    let searchResult = user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    const user = database.userModel.findOne((req.user).email)
    let reminder = {
      id: user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    user.reminders.push(reminder);
    res.redirect("/reminders");
  },


  edit: (req, res) => {
    const user = database.userModel.findOne((req.user).email)
    let reminderToFind = req.params.id;
    
    
    // let searchResult = {}
    // for (reminder in user.reminders){
    //   if (reminder.id === reminderToFind) {
    //     searchResult = reminder
    //   }
    // }
    let searchResult = user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });


    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    const user = database.userModel.findOne((req.user).email)
    // req == '/reminder/update/:id', res == reminderController.update
    let reminderUpdate = req.params.id; // == :id
    console.log(req.body)
    let updateResult = user.reminders.find(function (reminder) {
      if (reminder.id == reminderUpdate) {
        reminder.title = req.body.title;
        //update result not is now the co-responding reminder within the database
        reminder.description = req.body.description;
        console.log(req.body.completed)

        reminder.completed = (req.body.completed === "true");
      } // reminder.id == :id
      // reminder.id comes from the database.
      // the function (reminder) is acting as an anonymous function to loop 
      //through each reminder in the database reminders and find the one which
      //has an id that matches the reminderUpdate id

    });
    res.redirect("/reminders")


  },

  delete: (req, res) => {
    const user = database.userModel.findOne((req.user).email)
    // Implement this code

    // // get ID of reminder
    let reminderDelete = req.params.id;

    // // filter out the reminder with the given ID
    let reminderIndex = user.reminders.findIndex(function (reminder) {
      return reminder.id == reminderDelete;
    });

    if (reminderIndex !== -1) {
      user.reminders.splice(reminderIndex, 1);
    }


    res.redirect("/reminders");
  },

};
module.exports = remindersController;
