$( document ).ready()
{
    var redditApi = "http://www.reddit.com/r/browsergames/hot.json?limit=100";
    //var redditApi = "http://www.reddit.com/r/BrowserGames/top.json?t=week";
    //var redditApi = "http://www.reddit.com/r/BrowserGames/top.json?sort=top&t=all&limit=100";
    fetchReddit( redditApi );
}

function fetchReddit( redditApi ) {
    $.getJSON(redditApi, function( json ) {

        var children = json.data.children;
        // var childrenDiv = document.getElementById('children');

        var game_domains = [];

        $.each( children, function( key, value) {

            var title = children[key]['data']['title'];
            var num_comments = children[key]['data']['num_comments'];
            // var link = children[key]['data']['permalink'];
            var score = children[key]['data']['score'];
            // var ups = children[key]['data']['ups'];
            // var downs = children[key]['data']['downs'];
            var domain = children[key]['data']['domain'];
            var permalink = 'reddit.com/' + children[key]['data']['permalink'];

            var image_url = 'http://images.shrinktheweb.com/xino.php?stwembed=1&stwaccesskeyid=131332b488ab5df&stwsize=sm&stwurl=http://' + domain;

            var image_link = "<img src='" + image_url + "' alt='" + domain + "'" + "' title='" + domain + "' />";
            var web_link = "<a href='http://" + domain + "'>" + image_link +"</a>";
            var comment_link = "<a href='http://" + permalink + "'>" + num_comments +"</a>";

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
                                  'gametoor.com'];

            console.log (domain + ' :: banned: ' + $.inArray( domain , banned_domains) + '; dup: ' + $.inArray(domain, game_domains) + '; score: ' + score);

            if ( $.inArray(domain, game_domains) > 0 ) {
                return;
            }

            if ( $.inArray( domain , banned_domains) == -1 ) {
                if (score >= 2) {
                    var html_string = '<td>' + title + '</td>' + '<td>' + score + '</td>' + '<td>' + comment_link + '</td>' + '<td>' + web_link + '</td>';
                    $('#children > tbody:last').append('<tr>' + html_string + '</tr>');

                    game_domains.push(domain);
                }
            }

            console.log( 'total:' + game_domains.length );

        });
    });
}