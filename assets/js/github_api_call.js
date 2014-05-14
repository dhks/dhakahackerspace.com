    jQuery.githubUser = function(username, callback) {
	  jQuery.getJSON('https://api.github.com/users/'+username+'/repos?callback=?',callback)
    }

    jQuery.fn.loadRepositories = function(username) {
      this.html("<span>Querying GitHub for " + username +"'s repositories...</span>");
     
      var target = this;
      $.githubUser(username, function(data) {
        var repos = data.data; // JSON Parsing
        sortByName(repos);	
     
        var list = $('<ul>');
        target.empty().append(list);
        $(repos).each(function() {
			if (this.name != (username.toLowerCase()+'.github.com')) {
            
				list.append('<li><a href="'+ (this.homepage?this.homepage:this.html_url) +'">' + this.name + '</a>'+(this.language?('('+this.language+')'):'')+''+(this.description?(': ' + this.description +''):'')+'');
list.append('<iframe src=\'http://ghbtns.com/github-btn.html?user='+username+'&repo='+this.name+'&type=fork&count=true&size=small\' allowtransparency=\"true\" frameborder=\"0\" height=\"30px\" scrolling=\"0\" width=\"80px\"></iframe>');
list.append('<iframe src=\'http://ghbtns.com/github-btn.html?user='+username+'&repo='+this.name+'&type=watch&count=true&size=small\' allowtransparency=\"true\" frameborder=\"0\" height=\"30px\" scrolling=\"0\" width=\"80px\"></iframe>');

				//list.append('<div class=\"git_info\"><img source=\"\">: '+this.watchers+' - Forks: '+this.forks+' </div></li>');
				list.append('</ul>');
		  }
        });		
      });
	  
      function sortByName(repos) {
        repos.sort(function(a,b) {
          return b.forks - a.forks;
        });
      }
    };

