const router = require('express').Router();
const verify = require('./verifyToken');
const bodyParser = require('body-parser');
var Location = require('../model/Location');

router.get('/', verify, (req,res) => {
 
    res.render("posts");
});

//From mobile application
router.post('/heartRate', verify , (req,res) => {
    
    console.log(req.header('authtoken'));
   
    res.json("Heart Rate "+req.body.heartrate);
  
});

//From mobile application
router.post('/location', verify , async (req,res) => {

    // console.log(req.header('authtoken'));
   // res.json(req.body.Latitude+req.body.Logitude);
    //console.log(req.body.id+" "+req.body.latitude+" "+req.body.logitude);

    const token = req.header('authtoken');
    const id =   req.body.id;
    const latitude = req.body.latitude;
    const  logitude = req.body.logitude;
    //res.json('Updating new location')
    console.log('Updating new location');
    
    Location.find({'id':id}).count(async function(err,number){
     if(number != 0){
 
       //console.log('Updating new location');
       //res.json('Updating new location')
       
       const filter = { 'id': id };
       const update = { 'latitude': latitude,
                        'logitude' : logitude,
                        'authtoken' : token};
 
       const oldDocument =  await Location.updateOne(filter, update);
       oldDocument.n; // Number of documents matched
       oldDocument.nModified; // Number of documents modified
 
       res.json('Updating new location')
       console.log('Updating new location ', oldDocument);
 
     }
     else {
       
     //Create new Location
     new Location({
         id : id,
         authtoken : token,
         latitude : latitude,
         logitude : logitude
          }).save((err,newLocation) => {
            if (err) console.log("error message : " + err);
            else {
              res.json("location added");
              console.log("location added");
                }
             });
         }
 
     });

});


router.get('/location/:id', (req,res) =>{

  var id = req.params.id;
  console.log("id "+id);
  Location.findOne({'id' : id}, function (err, loc) {
    if (err) {
      console.log("error message : " + err);
      res.json(err);
    } else {
      console.log("latitude "+loc.latitude+" logitude "+loc.logitude);
     
      res.json({'latitude' :loc.latitude,
      'logitude' : loc.logitude
      });

      //res.json(loc.latitude);
    }
  });


});
module.exports = router;