module.exports = function(app) {

    var Note = app.models.notes;
    
    return {
        
        create: function(req, res) {
            
            if (req.method == "GET") {
                
                res.render('notes/create', {note: [0]});
            
            };
            
            if (req.method == "POST") {
                
                if (req.body.title_note) {

                    Note.save(req.body, function(err, result) {
                        
                        res.redirect('/');

                    });

                } else {

                    res.redirect(req.url);

                }

            }
        },
        
        delete: function(req, res) {

            var id_note = req.params.id_note;

            Note.delete(id_note, function(err, result) {

                res.redirect('/');

            });

        },
        
        update: function(req, res) {

            var id_note = req.params.id_note;

            if (req.method == "GET") {

                Note.find_by_id(id_note, function(err, result) {

                    res.render('notes/update', {note: result});

                });
            
            }

            if (req.method == "POST") {

                if (req.body.title_note || req.body.desc_note) {

                    Note.update(req.body, id_note, function(err, result) {

                        res.redirect('/');

                    });

                }

            }
        },
        
        archive: function(req, res) {

            var id_note = req.params.id_note;

            Note.find_by_id(id_note, function(err, result) {

                if (result.length > 0) {

                    Note.change_status(id_note, {status: 'archived'}, function(err, result) {
                        res.redirect('/');
                    });
                
                }

            });

        },
        
        restore: function(req, res) {

            var id_note = req.params.id_note;

            Note.find_by_id(id_note, function(err, result) {

                if (result.length > 0) {
                    
                    Note.change_status(id_note, {status: 'published'}, function(err, result) {
                    
                        res.redirect('notes/archived');
                    
                    });
                
                }

            });


        },
        
        list_archived: function(req, res) {

            Note.list({status: "archived"}, function(err, result) {

                res.render('notes/archived', {notes: result});

            });

        },
        
        search: function(req, res) {

            Note.search(req.body, function(err, result) {
                    
                res.render('notes/search', {form_data: req.body, notes: result});

            });
        
        }
    
    };

};

