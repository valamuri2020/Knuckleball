const router = require('express').Router();
let Stats = require('../models/stats.model');

router.route('/').get((req, res)=> {
    Stats.find()
    .then (stats => res.json(stats))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) =>{
    const username = req.body.username;
    const goalsScored = Number(req.body.goalsScored);
    const assists = Number(req.body.assists);
    const headers = Number(req.body.headers);
    const date = Date.parse(req.body.date);

    const newStats = new Stats({
        username,
        goalsScored,
        assists,
        headers,
        date,
    });

    newStats.save()
    .then(() => res.json('Stats added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Stats.findById(req.params.id)
      .then(stats => res.json(stats))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    Stats.findByIdAndDelete(req.params.id)
      .then(() => res.json('Stats deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').post((req, res) => {
    Stats.findById(req.params.id)
      .then(stats => {
        stats.username = req.body.username;
        stats.goalsScored = req.body.goalsScored
        stats.assists = req.body.assists
        stats.headers = req.body.headers
        stats.date = Date.parse(req.body.date);
  
        stats.save()
          .then(() => res.json('Stats updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  


module.exports = router;
