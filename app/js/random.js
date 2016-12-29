/* Random */
document.getElementById("random").onclick = function runRandom() {
    fetch("//www.reddit.com/r/browsergames/hot.json?limit=100&jsonp=json");
}

function fetch( url ) {
  $.getJSON(url, function( json ) {
    var games = json.data.children;

    var arr = Object.keys(games).map(function (key) { return games[key]; });
    var rand = arr[Math.floor(Math.random() * arr.length)];

    var banned_domains = ['self.BrowserGames',
                          'poll-maker.com',
                          'newrpg.com',
                          'youtube.com',
                          'juegodenavegador.blogspot.com',
                          'gameonwebs.blogspot.com',
                          'kongregate.com',
                          'getfreegames.org',
                          'chivalryisdead.x10.mx',
                          'ohgaming.org',
                          'imgur.com',
                          'reddit.com',
                          'facebook.com',
                          'apps.facebook.com',
                          'lastknights.com',
                          'clickclickclick.click',
                          'directivealpha.com',
                          'gametoor.com'];

    let games_visited = document.cookie;

    let validated = false;
    do {
      rand = arr[Math.floor(Math.random() * arr.length)];
      
      // start of banned domains
      if ( $.inArray(rand.data.domain, banned_domains) == -1 ){
        validated = true;
      }
      else {
        validated = false;
      }
      // end of banned domains

      // Unproper title
      if ( validated == true) {
        let re = /\[(\w+)\]/;
        let match = rand.data.title.match(re);

        if (! match) {
          validated = false;
        } 
        else {
          validated = true;
        }
      }
      // End of Unproper title

      // Archived
      if ( validated == true) {

        if ( rand.data.archived == true ) {
          validated = false;
        }
        else {
          validated = true;
        }

      }
      // End of Archived

      // Visited
      if ( validated == true ) {
        if ( $.inArray(rand.data.domain, games_visited) == -1 ){
          validated = true;
        }
        else {
          validated = false;
        }
      } 
      // End of Visited

    }
    while ( validated == false)

    console.log("VALIDATION: " + validated);

    console.log( $.inArray(rand.data.domain, banned_domains) );

    let domain = rand.data.domain;
    let num_comments = rand.data.num_comments;
    let score = rand.data.score;
    let title = rand.data.title;
    let url = rand.data.url;
    let comments = rand.data.permalink;
    let author = rand.data.author;
    let created = rand.data.created;

    console.log(rand);

    //console.log(games_visited);

    // $('#game-title').text( domain );
    $('#game-title').html( "<a target=_blank href='http://" + domain + "'>" + domain + "</a>" );
    $('#game-description').text( title );
    $('#game-comments').html( "<a target=_blank href='http://reddit.com" + comments + "'>Comments / Report</a>" );
    $('#game-score').text( "[Score: " + score + "]");

    $('#game-iframe').attr('src', url)

  });

  
}