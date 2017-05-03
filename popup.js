document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkTweet');
  checkPageButton.addEventListener('click', function() {
	  
	  var d = document
	  var jqd = $(d);
	  alert("success");
	  var tweets = jqd.children('li[class = "js-stream-item stream-item stream-item"]');
	  alert("success");
	  tweets.each(function(i, obj) {
		  // i is the index, obj is the DOM object being iterated through.
		  // Extract text from the text container
		  var tweet_text = obj.children('div.js-tweet-text-container').text();
		  // Append a button to the action list.
		  obj.children("div.ProfileTweet-actionList js-actions").append('<a href="https://thejustweetleague.github.io/" class="justweet_button">Click for more information</a>');
		  });
	  
  }, false);
}, false);