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

	$('#newFav').on('click', function() {

		console.log("hi");

		var dataRef = firebase.database().ref('pictures');
		var storage = firebase.storage();

		var file = $("#fileUpload")[0].files[0];
		// push file to database
		// add
		var fileRef = storage.ref(file.name);

		console.log(file.name);


		fileRef.put(file).then(function(){
			fileRef.getDownloadURL().then(function(url) {
				console.log(url);
				var photo = url;  


				favs.push({
					displayName: firebase.auth().currentUser.displayName,
					picture: photo,
					description: $("#description").val()
				});
			}).then(function() {
				console.log(favs);
				window.location = './favorites.html';
			});

		});
	});
});
