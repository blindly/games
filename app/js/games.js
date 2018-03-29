/* Random */
document.getElementById("random").onclick = function runRandom() {
    fetch("https://api.fivecat.xyz/api/index.php/games");
}

function fetch( url ) {
  $.getJSON(url, function( json ) {
    let games = json.stories;

    var arr = Object.keys(games).map(function (key) { return games[key]; });
    var rand = arr[Math.floor(Math.random() * arr.length)];

    let url = "http://" + rand;
    $('#game-title').text( rand );
    $('#demo-iframe').attr('src', url)
  });

  
}
