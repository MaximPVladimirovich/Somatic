const router = require(`express`).Router();
const Studio = require(`../models/studio`)
const Class = require(`../models/class`);


// Index - list of studios
router.get(`/`, async function (req, res) {
  try {
    Studio.find({}, function (error, studiolist) {
      res.render(`studios/index.ejs`, {
        studiolist,
        currentUser: req.session.currentUser
      })
    })
  }
  catch (error) {
    console.log(error)
  }
})

// Delete

// Update 

// Create dance studio
router.post(`/`, async function (req, res) {
  try {
    await Studio.create(req.body);
    res.redirect(`/studios`);
  } catch (error) {
    console.log(error)
  }
})

// Show  user can see studio info
// classes will be referenced here too
router.get(`/:id`, function (req, res) {
  Studio.findById(req.params.id, function (error, foundStudio) {
    Class.find({ created_by: foundStudio._id }, function (error, foundClasses) {
      res.render(`studios/show.ejs`, {
        classes: foundClasses,
        studio: foundStudio,
        currentUser: req.session.currentUser
      })
    })
  })
})

module.exports = router;