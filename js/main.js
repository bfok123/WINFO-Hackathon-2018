$(function() {
   var config = {
		 apiKey: "AIzaSyBK0cWiLuJayIuiSwikEL0BcGhyyl0xCn0",
		 authDomain: "winfohackathon2018.firebaseapp.com",
		 databaseURL: "https://winfohackathon2018.firebaseio.com",
		 projectId: "winfohackathon2018",
		 storageBucket: "winfohackathon2018.appspot.com",
		 messagingSenderId: "2426079788"
	  };
	  firebase.initializeApp(config);
	
	
	var favs = firebase.database().ref('favs');
    
   favs.on('child_added', function(snapshot) {
        var data = snapshot.val();
        // Pass key, data to snapshot function
        // renderFav(snapshot.key, data);
    });
    
    /*
    var renderTweet = function(id, data) {
        
        var newTweet = $('<div>');
        // append photo 
        var picture = $('<div>').addClass('img').css('background-image', 'url(' + data.photo + ')');
        var dN = $('<span>').addClass('user').text(data.displayName);
        dN.append('<br>');
        var tweet = $('<span>').addClass("tweetText").text(data.tweet);
        
        var likes = $('<div>');
        var heart = $('<a href="#">');
        heart.append('<i class="fa fa-heart" aria-hidden="true"></i>');
        likes.append(heart);
        likes.append(' | ');
        var likesNumber = $('<span>').text('' + data.likes + ' likes').addClass('numberOfLikes');
        
        likes.append(likesNumber);
        
        heart.on('click', function() {
            tweets.child(id).set({
                displayName: data.displayName,
                photo: data.photo,
                tweet: data.tweet,
                likes: (data.likes + 1)
            });
            
            newLikesNumber = $('<span>').text('' + (data.likes + 1) + ' likes');
            
            likes.append(newLikesNumber);
            
        });
        
        // Append elements to the page
        newTweet.append(picture);
        newTweet.append(dN);
        newTweet.append(tweet);
        newTweet.append('<br>');
        newTweet.append(likes);
        newTweet.append('<hr>');
        $('#allTweets').prepend(newTweet);  
    };
     */
	  
    $('#newFav').on('submit', function() {
        favs.push({
            displayName: firebase.auth().currentUser.displayName,
            photo: firebase.auth().currentUser.photoURL,
            tweet: $("#newTweet").val(),
            likes: 0
        });
		 console.log(favs);
    }).then(function() {
		 window.location = '.favorites.html';
	 });
});