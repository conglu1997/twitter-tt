// TODO: Traverse twitter DOM, for each button allow it to access the enclosing tweet scope.
// Probably, select all tweet classes and iterate through them creating a different button class each time.

	
// Create the plugin elements only when document ready
 $(document).ready(function()
 {
	 
	 // Will append the button to each tweet block
	$("body").prepend('<a href="https://thejustweetleague.github.io/" class="justweet_button">Click for more information</a>');

	// Add the tooltip display to the query - currently using qTip2 library to do this - http://qtip2.com/
	// Use alertify to provide log messages to the communication to the server - http://alertifyjs.com/
	 
	 // Retrieve content via AJAX - TODO: when the rest of the team make the API can attach it here
     $(".justweet_button").each(function() {
         $(this).qtip({
            content: {
                text: function(event, api) {
					alertify.message('Retrieving...	');
                    $.ajax({
                        url: 'https://www.reddit.com/r/pathofexile/' // Use custom HTML as tt - TODO: Add CSS styling to this.
                    })
                    .then(function(content) {
                        // Set the tooltip content upon successful retrieval
                        api.set('content.text', content);
						alertify.success('Successful load');
                    }, function(xhr, status, error) {
                        // Upon failure... set the tooltip content to error
                        api.set('content.text', status + ': ' + error);
                    });
        
                    return 'Loading...'; // Set some initial text
                }
            },
			style: 'qtip-light'
         });
     });
 });