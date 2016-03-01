$(document).ready(function() {
page.getRepos();
});//end of doc ready
var page = {

sortRepos: function(object) { //sorting by date
      return _.sortBy(object, 'updated_at').reverse();
},

postRepo: function (object) {
    var emptyArr = '';
    _.each(page.sortRepos(object), function(el) {
      emptyArr += '<a href=\'' + el.html_url + '\'>';
      emptyArr += '<h3 class = "reponame">' + el.name + '</h3>';
      emptyArr += '<p class = description>' + el.description + '</p>';
    });
    $('.repos').html(emptyArr);
},
getRepos: function () {
  $.ajax({
    url: 'https://api.github.com/users/baileyhood/repos',
    method: 'GET',
    success: function(object) {
      console.log (object[0]);
      page.postRepo(object);
      $('.profile-container').attr("src", object[0].avatar_url);
    }
  });
}


};//end of 'page'
