// Create the plugin elements only when document ready
 $(document).ready(function()
 {	
 
	// Use bootstrap CSS for the icon
	$('head').append('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" type="text/css" />');
	
	// Catch specific class name
	var tweets = $('li.js-stream-item');
	// Store tweet text
	var tweet_array = new Array(tweets.length);
	// Store tweet ids
	var tweet_id_array = new Array(tweets.length);
	
	var button_text_pref = `<div class="ProfileTweet-action">
	  <button class="ProfileTweet-actionButton u-textUserColorHover js-actionButton justweet_button" type="button" id ="` 
	  
	var button_text_suff = `">
		<div class="IconContainer js-tooltip" title="Verify">
		  <span class="glyphicon glyphicon-ok"></span>
		  <span class="u-hiddenVisually">Verify</span>
		</div>
		  <div class="IconTextContainer">
			<span class="ProfileTweet-actionCount" data-tweet-stat-count="0">
			  <span class="ProfileTweet-actionCountForPresentation" aria-hidden="true">Verify Tweet</span>
			</span>
		  </div>
	  </button>
	</div>`
	
	tweets.each(function(i, obj) {
		// i is the index, obj is the DOM object being iterated through.
		// Extract text from the text container and insert into array.
		tweet_array[i] = $(obj).find('div.js-tweet-text-container').text();
		// Extract the tweet_id for the API
		var tweet_json = JSON.parse($(obj).attr('data-suggestion-json'));
		tweet_id_array[i] = tweet_json.tweet_ids;
		
		// Append a button to the action list.
		// Find the tweet footer and add the trigger button:
		$(obj).find("div.ProfileTweet-actionList").append(button_text_pref + i + button_text_suff);
	});
	
	function analysis_display (tweet_text, score, explanation_list) {
		var txt1 = `<div class="analysistext">
					<img src="`
					
		var txt1_ = `" alt="" width="58" height="58" class="photo left"/>
					<div class="info"><p><i>`
						
		var txt2 = `</i></p>`
		
		var txt3 = `<p class="note">Further Analysis: <a href="http://thejustweetleague.github.io/">Justweet Website</a></p>
						<div class="clear"></div>
					</div>
				</div>`
				
		var img_src = ""
		
		// Return error if one thrown.
		if (score == -1) {
			return explanation_list;
		}
		
		// Display a different picture based on the trustworthiness.
		switch(score) {
			case 1:
				img_src = "http://i.imgur.com/a25xyLH.png";
				break;
			case 2:
				img_src = "http://i.imgur.com/peD5CzE.png";
				break;
			case 3:
				img_src = "http://i.imgur.com/1dDwdEt.png";
				break;
			case 4:
				img_src = "http://i.imgur.com/Wc1NK19.png";
				break;
			case 5:
				img_src = "http://i.imgur.com/P6aul19.png";
				break;
			default:
				img_src = "http://i.imgur.com/P6aul19.png";
		}
				
		for (i = 0; i < explanation_list.length; i++) { 
			txt2 += "<p> - " + explanation_list[i] + "<p>";
		}
		
		// Return a prefix and a suffix, the this keyword doesn't carry.
		return txt1 + img_src + txt1_ + tweet_text + txt2 + txt3;
	}
	
	// Add the tooltip display to the query - currently using qTip2 library to do this - http://qtip2.com/
     $(".justweet_button").each(function(i, obj) {
         $(this).qtip({
            content: {
                text: function(event, api) {
						chrome.runtime.sendMessage({method: 'GET',
							action: 'xhttp',
							url: 'http://46.101.95.25:8000/analyse?id=' + tweet_id_array[$(this).attr('id')],
						}, function(responseText) {
							/*Callback function to deal with the response*/
							var analysis = JSON.parse(responseText);
							api.set('content.text', analysis_display(tweet_array[i], analysis.score, analysis.problems));
						});
                    return "<b>Retrieving information about the following tweet: </b> <i>" + tweet_array[$(this).attr('id')] + "</i>"; // Set initial descriptive text.
                },
				title: 'Justweet Analysis'
            },
			style: 'qtip-wiki',
			hide : {
				fixed : true,
				delay : 300
			},
			position: {
             target: 'mouse', // Track the mouse as the positioning target
             adjust:  {
                 // Don't adjust continuously the mouse, just use initial position
                 mouse: false
             }
			}
         });
     });
 });