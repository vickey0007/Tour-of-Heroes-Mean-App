const express = require('express');
const router = express.Router();

const Hero = require('../models/hero');

const bodyParser = require('body-parser');


router.use(bodyParser.json());


//retreiving data
router.get('/heroes', (req, res) => {
  console.log("get")
  Hero.find((err, heroes) => {
    res.json(heroes);
  })
});

router.get('/heroes/:id', (req, res ) => {
  Hero.find({ 'id': req.params.id } ,(err, heroe) => {
    if (err) {
      console.log("hero not found!");
    }
    res.json(heroe);
  })
 
});
//update
router.put('/heroes/:id', (req, res) => {
  
  console.log(req.params.id)
  Hero.findById(req.params.id, (err, hero) =>{
         if (err) {
             res.send(err);
         }
         hero.name = req.body.name
     
         hero.save(function (err) {
             if (err)
                 res.send(err);
  
             res.json({ message: 'hero updated!' });
         });
  
     });
 });

//add new hero
router.post('/heroes', (req, res) => {
  console.log("add called");
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

router.delete('/heroes/:id', function(req, res) {
  console.log("delete called");
  Hero.findByIdAndRemove(req.params.id, req.body, function (err, hero) {
    if (err)  {
      res.json({ msg: 'Failed to delete hero' });
    }
    res.json({ msg: 'hero deleted succesfully' });
  });
});

// router.put('/heroes/:id', (req, res) =>{
//   Hero.findOneAndUpdate({ id: req.params.id }, { $set: { name : req.body.name } }, { new: true }, function (err, doc) {
//     if (err) {
//       console.log("Something wrong when updating data!");
//     }
//     res.json({ message: 'Hero updated!' });
//     console.log(doc);
//   });

// });



module.exports = router;