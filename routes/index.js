
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Try to get equal size chunks' });
};