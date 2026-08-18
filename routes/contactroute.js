const express = require("express")
const router = express.Router()

const { getcontact, getcontacts, updatecontact, deletecontact, createcontact } = require("../controllers/contactcontrolers")
const tokenvalidation=require("../middleware/tokenvalidation")
router.use(tokenvalidation)
router.route("/").get(getcontacts).post(createcontact)

router.route("/:id").put(updatecontact).delete(deletecontact).get(getcontact)

module.exports = router;
