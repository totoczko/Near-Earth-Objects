$(function() {

  var starsList = $('.stars');
  //jsoneditine.org
  var urlnext = '';
  var urlprev = '';

  function loadStars(apiUrl) {
    $.ajax({
      url: apiUrl,
      dataType:"json",
    }).done(function(response){

      for (var link in response.links){
        var prevUrl= response.links.prev;
      }
      urlprev=prevUrl;

      for (var link in response.links){
        var nextUrl= response.links.next;
      }
      urlnext=nextUrl;

      for (var date in response.near_earth_objects){
        var dateOfStar = $('<li class="dateclass"></li>').text(date);
        starsList.append(dateOfStar);
        var newStarUl = $('<ul></ul>');
        starsList.append(newStarUl);

        for(var i=0;i<response.near_earth_objects[date].length;i++){
          var stars=response.near_earth_objects[date][i];
          var starHref = stars.nasa_jpl_url;
          var newStarLi = $('<a></a><br>').text(stars.name).attr('href',starHref);
          newStarUl.append(newStarLi);

          if(stars.is_potentially_hazardous_asteroid==false){
            newStarLi.css("background-color","#33cc33");
          }else{
            newStarLi.css("background-color","#ff5050");
          }
        }
      }

      var dateOfStar = $('.dateclass');
      var newStarUl = starsList.find('ul');
      var newStarLi = newStarUl.find('a');
      newStarUl.hide();
      dateOfStar.on('click', function(){
        $(this).next().slideToggle();
      });

    }).fail(function(error){
      console.log(error);
    });
  }

  loadStars('https://api.nasa.gov/neo/rest/v1/feed?start_date=2016-08-01&end_date=2016-08-08&api_key=phdxNkIk2UtYq4kl6aTuYihcypPqvUSB2YiEu2KY');

  var next = $('#next');
  var prev = $('#previous');

  next.on('click', function(){
    starsList.empty();
    loadStars(urlnext);
  });

  prev.on('click', function(){
    starsList.empty();
    loadStars(urlprev);
  });

});
