// Dependencie
const express = require(`express`)
const bcrypt = require(`bcrypt`)
const router = express.Router();
const User = require(`../models/user.js`);
const Class = require(`../models/class.js`)

// New 
router.get(`/new`, async function (req, res) {
  try {
    await res.render(`sessions/new.ejs`, {
      currentUser: req.session.currentuser
    })
  } catch (error) {
    console.log(error)

  }
})

// Delete - logout route
router.delete(`/logout`, async function (req, res) {
  try {
    await req.session.destroy(function (error) {
      res.redirect(`/somatic`)
    })
  } catch (error) {
    console.log(error)
  }
})

// Create- login
router.post('/', (req, res) => {
  // Check for an existing user
  User.findOne({
    email: req.body.email
  }, (error, foundUser) => {
    // send error message if no user is found
    if (!foundUser) {
      res.send(`Oops! No user with that email address has been registered.`);
    } else {
      // If a user has been found 
      // compare the given password with the hashed password we have stored
      const passwordMatches = bcrypt.compareSync(req.body.password, foundUser.password);

      // if the passwords match
      if (passwordMatches) {
        // add the user to our session
        req.session.currentUser = foundUser;

        // redirect back to our home page
        res.redirect('/');
      } else {
        // if the passwords don't match
        res.send('Oops! Invalid credentials.');
      }
    }
  });
});



// Export
module.exports = router;