$(document).ready(function() {
page.init();
});//end of doc ready
var page = {

url: 'https://api.github.com/users/baileyhood',

init: function () {
  page.getRepos();
  page.getFEEDemos();
  page.displayProfilePicture();
},

events: function() {
    $('h5').on('click', function(event) {
    alert("I was clicked!");
    });
},

sortRepos: function(object) { //sorting by date
      return _.sortBy(object, 'updated_at').reverse();
},

postRepo: function (object) {
    var emptyArr = '';
    _.each(page.sortRepos(object), function(el) {
      emptyArr += '<a href=' + el.html_url +'<h3 class = "reponame">' + el.name + '</h3> </a>';
      emptyArr += '<p class = description>'  + el.description + '</p>';
      emptyArr += "<p>" + moment(el.created_at,"YYYYMMDDH").fromNow() + "</p>";
    });
    $('.repos').html(emptyArr);
},
getRepos: function () {
  $.ajax({
    url: 'https://api.github.com/users/baileyhood/repos',
    method: 'GET',
    success: function(object) {
      console.log ("Get Repos function is working");
      page.postRepo(object);
    }
  });
},

getFEEDemos: function () {
  $.ajax({
    url: 'https://api.github.com/repos/TIY-Charleston-Front-End-February2016/demos',
    method: 'GET',
    success: function (time) {
      var timeNow = moment(time.pushed_at,"YYYYMMDDH").fromNow();
      $('h6').append(timeNow);

    }
    });
},

displayProfilePicture: function () {
  $.ajax({
    url: 'https://api.github.com/users/baileyhood',
    method: 'GET',
    success: function (object) {
      $('h1').append(object.name);
      $('h2').append("Username: " + object.login);
      $('#profile-pic').attr("src", object.avatar_url);
    }
});
},

};//end of 'page'
