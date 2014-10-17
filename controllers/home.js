module.exports = function(app) {

var Notes = app.models.notes;
   
  return {
      
    index: function(req, res) {
        
        Notes.list({status:'published'},function(err, result){
            
            res.render('home/index',{notes:result});
        
        });
    
    }  
      
  };

};

