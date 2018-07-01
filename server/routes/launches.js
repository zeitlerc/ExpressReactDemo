var express = require('express');
var router = express.Router();

var axios = require("axios");

router.get('/', function(req, res, next) {
  axios.get("https://api.spacexdata.com/v2/launches")
    .then(response => res.json(response.data))
    .catch(error => {
      res.status(500).send(error.message)
    })
});

module.exports = router;
