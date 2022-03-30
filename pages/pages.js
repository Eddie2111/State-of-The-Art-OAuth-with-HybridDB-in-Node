function output(){
  var homepage = {
      name: "khan", 
      title:"home", 
      tagline: "We got this output line from index.js and pages.js is the source of truth",
      mascots: [
        { name: ' 1', organization: "About page added", port: 'api'},
        { name: ' 2', organization: "Mysql Added", port: 8080},
        { name: ' 3', organization: "Mongo added", port: 27017}
      ]
  };
  var about={
    title:"About"
  }
  var database= {
    tagline: "this text is from database.js",
    title:"Database"
  }
  var calender={
    title:"Calender"
  }
  var experiment={
    title:"Experiment"
  }
  var form={
    title:"form"
  }
  var prac1={
    title:"prac1"
  }
  return {homepage,about,database,calender,experiment,form,prac1};
};
module.exports = output();