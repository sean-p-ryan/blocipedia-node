const userQueries = require("../db/queries.users.js");
const passport = require("passport");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
  sign_up(req, res, next){
    res.render("users/sign_up");
  },
  create(req, res, next){
  //#1
    let newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation
    };
  // #2
    userQueries.createUser(newUser, (err, user) => {
      if(err){
        req.flash("error", err);
        res.redirect("/users/sign_up");
      } else {

  // #3
        passport.authenticate("local")(req, res, () => {
          req.flash("notice", "You've successfully signed in!");
          res.redirect("/");

          const sgMail = require('@sendgrid/mail');

          sgMail.setApiKey(process.env.SENDGRID_API_KEY);

          const msg = {
            to: newUser.email,
            from: 'test@blocipedia.com',
            subject: 'Welcome to Blocipedia',
            text: 'where you can collaborate and share',
            html: '<strong>Looking forward to see your stuff!</strong>',
          };
          sgMail.send(msg);
        })
      }
    });
  },

  signInForm(req, res, next){
      res.render("users/sign_in");
  },

  signIn(req, res, next){
      console.log("sign_in method.")
      console.log(req.user);

   passport.authenticate("local")(req, res, function () {
       console.log(req.user);
     if(!req.user){
       req.flash("notice", "Sign in failed. Please try again.")
       res.redirect("/users/sign_in");
     } else {
       req.flash("notice", "You've successfully signed in!");
       res.redirect("/");
     }
   })
 },

 signOut(req, res, next){
    req.logout();
    req.flash("notice", "You've successfully signed out!");
    res.redirect("/");
  }


}