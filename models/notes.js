module.exports = function(app){

    var db = require('../lib/db');

    function _query(sql,stats,callback) {

        db.getConnection(function(err, connection){
                
            var query = connection.query(sql,stats,function(err, result){
                 
                callback(err,result);
                connection.release();
            
            });
        
        });
    
    }

    return {

        list:function(params,callback) {

            var stats = {STATUS_note:params.status};
            var sql = "SELECT * FROM notes WHERE ?";
            _query(sql,stats,callback);

        },

        save: function(data,callback) {
            
            var stats = {TITLE_note:data.title_note, DESC_note:data.desc_note};
            var sql = "INSERT INTO notes SET ?" ;
            _query(sql,stats,callback);
        
        },

        delete:function(id_note,callback){
            
            var sql = "DELETE FROM notes WHERE ID_note = ?";
            _query(sql,id_note,callback);

        },

        update:function(data,id_note,callback){

            var stats = [{TITLE_note:data.title_note, DESC_note:data.desc_note},id_note];
            var sql = "UPDATE notes SET ? WHERE ID_note= ?";
            _query(sql,stats,callback);

        },

        change_status:function(id_note,params,callback) {
            
            var stats = [{STATUS_note:params.status},id_note];
            var sql = "UPDATE notes SET ? WHERE ID_note = ?";
            _query(sql,stats,callback);
        
        },

        find_by_id:function(id_note,callback){

            var sql = "SELECT * FROM notes WHERE ID_note = ?";
            _query(sql,id_note,callback);

        },

        search:function(data,callback) {
            
            var search_notes = data.search_notes;
            var sql = 'SELECT * FROM notes WHERE TITLE_note LIKE "%'+search_notes+'%" OR DESC_note LIKE "%'+search_notes+'%" ORDER BY ID_note, TITLE_note ASC;';
           _query(sql,callback);

        }
    };

};