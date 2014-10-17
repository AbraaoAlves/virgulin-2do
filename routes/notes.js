module.exports = function(app){
    
    var notes = app.controllers.notes;
    
    app.get('/notes/create',notes.create);
    app.post('/notes/create',notes.create);
    
    app.get('/notes/:id_note/delete',notes.delete);
    
    app.get('/notes/:id_note/archive',notes.archive);
    app.get('/notes/:id_note/restore',notes.restore);
    
    app.get('/notes/archived',notes.list_archived);
    
    app.all('/notes/search',notes.search);
    
    app.get('/notes/:id_note/update',notes.update);
    app.post('/notes/:id_note/update',notes.update);
    
    
};