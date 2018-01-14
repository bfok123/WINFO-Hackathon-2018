  var images = [];
  var curr = 0;
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

  images.push("res/img1.jpg");
  images.push("res/img2.jpg");
  images.push("res/img3.jpg");
  images.push("res/img4.jpg");

  window.onload = function() {
    firebase.database().ref("/favs").once("value").then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var user = firebase.auth().currentUser;
        if(user && user.displayName == childSnapshot.child("displayName")) {
          images.push(childSnapshot.child("picture").val());
        }
      });
    });

    document.getElementById("imgToChange").src = images[curr];
    document.getElementById("imgToChange").style.height = "91vh";
    curr++;
  }


function changeImage() {
  document.getElementById("imgToChange").src = images[curr];
  document.getElementById("imgToChange").style.height = "91vh";
  if(curr < images.length) {
    curr++;
  }
  if(curr >= images.length) {
    curr = 0;
  }
}

function prevImage() {
  if(curr > 0) {
    curr--;
  } else if (curr == 0) {
    curr = images.length - 1;
  }
  document.getElementById("imgToChange").src = images[curr];
  document.getElementById("imgToChange").style.height = "91vh";
}
