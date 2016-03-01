$(document).ready(function() {
page.getRepos();
page.displayProfilePicture();
});//end of doc ready
var page = {

sortRepos: function(object) { //sorting by date
      return _.sortBy(object, 'updated_at').reverse();
},

postRepo: function (object) {
    var emptyArr = '';
    _.each(page.sortRepos(object), function(el) {
      emptyArr += '<a href=' + el.html_url +'<h3 class = "reponame">' + "Repo: " + el.name + '</h3> </a>';
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

displayProfilePicture: function () {
  $.ajax({
    url: 'https://api.github.com/users/baileyhood',
    method: 'GET',
    success: function (object) {
      console.log (object.avatar_url);
      $('#profile-pic').attr("src", object.avatar_url);
    }
});
},

};//end of 'page'
