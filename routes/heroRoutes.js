const express = require('express');
const router = express.Router();

const Hero = require('../models/hero');

//retreiving data
router.get('/heroes', (req, res) => {
  Hero.find((err, heroes) => {
    res.json(heroes);
  })
});

router.get('/heroes/:id', (req, res) => {
  Hero.find({ 'id': req.params.id } ,(err, heroe) => {
    if (err) {
      console.log("hero not found!");
    }
    res.json(heroe);
  })
});

//add new hero
router.post('/heroes', (req, res) => {
  let newHero = new Hero({
    name: req.body.name,
  
    id: req.body.id
  });
  newHero.save((err, hero) => {
    if (err) {
      res.json({ msg: 'Failed to add hero' });
    }
    else {
      res.json({ msg: 'hero added succesfully' });;
    }
  });
});

router.put('/heroes/:id', (req, res) =>{
  Hero.findOneAndUpdate({ id: req.params.id }, { $set: { name : req.body.name } }, { new: true }, function (err, doc) {
    if (err) {
      console.log("Something wrong when updating data!");
    }
    res.json({ message: 'Hero updated!' });
    console.log(doc);
  });

});



module.exports = router;