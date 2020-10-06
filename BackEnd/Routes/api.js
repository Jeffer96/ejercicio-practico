let express = require('express');
let router = express.Router();

router.use("/", require("../controller/userController"));

module.exports = router;
