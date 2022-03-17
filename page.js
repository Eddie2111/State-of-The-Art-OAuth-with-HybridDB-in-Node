

app.get('/', function(req, res) {
    const name = "khan";
    var mascots = [
      { name: ' 1', organization: "About page added", port: 'api'},
      { name: ' 2', organization: "Mysql Added", port: 8080},
      { name: ' 3', organization: "Mongo added", port: 27017}
    ];
    var tagline = "No programming concept is complete without a cute animal mascot.";
  
    res.render('pages/index', {
      mascots: mascots,
      tagline: tagline,
      name: name,
      title: "Welcome Home"
    });
  });
  
  
  // calendar page
  app.get('/calender', function(req, res) {
      res.render('pages/calender',{title:"Calender"});
    });
  
  // about page
  app.get('/about', function(req, res) {
    res.render('pages/about',{title:"About"});
  });
  //database rendering test
  app.get('/database', function(req, res) {
  
    var sql = mysqlDatabase();
    var nosql = mongoDatabase();
    res.render('pages/database',{
      title:"Database",
  
    });
  });
module.exports = app;  