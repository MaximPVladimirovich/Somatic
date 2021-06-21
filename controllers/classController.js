const router = require(`express`).Router();
const Class = require(`../models/class`)
const Studio = require(`../models/studio`);


// Index
router.get(`/`, async function (req, res) {
  try {
    Class.find({}, function (error, classList) {
      res.render(`classes/index.ejs`, {
        classList,
        currentUser: req.session.currentUser
      })
    })
  }
  catch (error) {
    console.log(error)
  }
})

// New - get new class page
router.get(`/new`, async function (req, res) {
  let studiolist = await Studio.find({});
  res.render(`classes/new.ejs`, {
    studio: studiolist,
    currentUser: req.session.currentUser
  })
})

// Delete

// Update 
router.put(`/:id`, async function (req, res) {
  try {
    await Class.findByIdAndUpdate(req.body);
    res.redirect(`classes/index.ejs`)
  } catch (error) {
    console.log(error)
  }
})

// Create - create a dance class
router.post(`/`, async function (req, res) {
  try {
    await Class.create(req.body);
    res.redirect(`/classes`);
  } catch (error) {
    console.log(error)
  }
})

// Show
router.get(`/:id`, async function (req, res) {
  let foundclass = await Class.findById(req.params.id).populate(`created_by`)
  res.render(`classes/show.ejs`, {
    danceclass: foundclass,
    currentUser: req.session.currentUser
  })

})

module.exports = router;