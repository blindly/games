let redditApi = "//www.reddit.com/r/browsergames/hot.json?jsonp=output&limit=100";

$.ajax({
  type: 'GET',
  url: redditApi,
  dataType: 'jsonp',
  success: function (output) {

    var children = output.data.children;
    //var childrenDiv = document.getElementById('children');

    var game_domains = Array();

    $.each(children, function (key, value) {

      var title = children[key]['data']['title'];
      // var num_comments = children[key]['data']['num_comments'];
      // var user_reports = children[key]['data']['user_reports'];
      // var link = children[key]['data']['permalink'];
      var score = children[key]['data']['score'];
      // var ups = children[key]['data']['ups'];
      // var downs = children[key]['data']['downs'];
      var domain = children[key]['data']['domain'];
      var permalink = 'reddit.com' + children[key]['data']['permalink'];

      // var image_url = 'http://images.shrinktheweb.com/xino.php?stwembed=1&stwaccesskeyid=131332b488ab5df&stwsize=sm&stwurl=http://' + domain;

      // var image_link = "<img src='" + image_url + "' alt='" + domain + "'" + "' title='" + domain + "' />";
      // var web_link = "<a href='http://" + domain + "'>" + image_link +"</a>";
      var mod_link = "<a href='http://" + permalink + "'>" + domain + ' :: ' + title + "</a>";

      var banned_domains = ['self.BrowserGames',
        'poll-maker.com',
        'mmogames.com',
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
        'gametoor.com'
      ];

      var exception_domains = ['self.BrowserGames',
        'youtube.com',
        'imgur.com'
      ];

      var duplicate;
      var banned;
      var proper;

      /* Duplicate Games */
      if ($.inArray(domain, game_domains) > 0) {
        if ($.inArray(domain, exception_domains) > 0) {
          duplicate = false;
        } else {
          duplicate = true;
        }
      } else {
        duplicate = false;
      }
      /* End of Duplicate Games */

      /* Banned Domains */
      if ($.inArray(domain, banned_domains) > 0) {
        banned = true;
      } else {
        banned = false;
      }

      /* Unproper title */
      let re = /\[(\w+)\]/;
      let match = title.match(re);

      if (!match) {
        proper = false;
      } else {
        proper = true;
      }
      /* End of Unproper title */

      var html_string = '<td>' + mod_link + '</td>' + '<td>' + duplicate + '</td>' + '<td>' + banned + '</td>' + '<td>' + proper + '</td>' + '<td>' + score + '</td>';

      if (duplicate === true) {
        $('#children > tbody:last').append('<tr class="warning">' + html_string + '</tr>');
      } else {
        if ($.inArray(domain, banned_domains) == -1) {
          if (proper) {
            $('#children > tbody:last').append('<tr class="success">' + html_string + '</tr>');
          } else {
            $('#children > tbody:last').append('<tr class="danger">' + html_string + '</tr>');
          }
        } else {
          $('#children > tbody:last').append('<tr class="danger">' + html_string + '</tr>');
        }
      }

      game_domains.push(domain);
    });

    console.log('total:' + game_domains.length);
  },

  error: function () {
    console.log('Uh Oh!');
  },
  jsonp: 'jsonp'
});