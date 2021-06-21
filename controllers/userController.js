const bcrypt = require(`bcrypt`);
const router = require(`express`).Router();
const User = require(`../models/user.js`)
const Class = require(`../models/class.js`)




// New - register page
router.get(`/new`, async function (req, res) {
  try {
    await res.render(`user/new.ejs`, {
      currentUser: req.session.currentUser
    });
  } catch (error) {
    console.log(error)
  }
})

// Delete

// update

router.get(`/:id/show`, function (req, res) {
  // update bookings in User so they can see what classes they have booked
  let classId = req.params.id
  currentUser = req.session.currentUser
  if (currentUser) {
    res.send(`You are signed in as: ${currentUser.email} Class id: ${classId}`)
  } else {
    res.send(`you need to be signed in to book this class`)
  }

})

// Create 
router.post(`/`, async function (req, res) {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    await User.create(req.body);
    res.redirect(`/sessions/new`)
  } catch (error) {
    console.log(error)
  }
})

// Show



module.exports = router;