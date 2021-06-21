const router = require(`express`).Router();
const mongoose = require(`mongoose`)
const Class = require(`../models/class`);


// Search route
router.post(`/`, async function (req, res) {
  let digits = /\d/;
  let searchQuery = req.body.search;
  let studiolist;
  // I use an if conditional 
  if (digits.test(searchQuery)) {
    studiolist = await Class.find({ "address.zip": searchQuery })
  } else {
    studiolist = await Class.find({ name: { $regex: String(searchQuery) } })
  }
  if (!studiolist || studiolist.length === 0) res.status(400).redirect(`/somatic`)
  res.status(200).render(`classes/index.ejs`, {
    studiolist,
    currentUser: req.session.currentUser
  })
})
module.exports = router