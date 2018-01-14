$(function() {

	// Signs the user up for an account when the form is submitted
	var signUp = function() {
		// Get email, password, display name, and username
		var email = $('#email').val();
		var password = $("#password").val();
		var displayName = $('#displayName').val();

		// Get profile picture image
		// Get the file

		var dataRef = firebase.database().ref('photos');
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

				firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
					// Set display name and photo URL
					user.updateProfile({
						displayName: displayName,
						photoURL: photo
					}).then(function() {
						window.location = './index.html';
					});
				}).catch(function(error) {
					alert(error.message);
				});
			});
		});
	};

	// Signs the user into their account
	var signIn = function() {
		// Get email and password
		var email = $('#email').val();
		var password = $("#password").val();

		// Authenticate using email and password, then redirect
		firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
			window.location = './home_page.html';
		}).catch(function(error) {
			alert(error);
		});
	};

	var signOut = function() {
		firebase.auth().signOut().then(function() {
			window.location = './signup.html';
		});

	};

	$('form').on('submit', function(event) {
		event.preventDefault();
		var formId = $(this).attr('id');
		if (formId == 'signupForm') {
			console.log("signing up...")
			signUp();
		} else if (formId == 'signinForm') {
			console.log("signing in...")
			signIn();
		}
	});

	$('#logOut').on('click', function() {
		signOut();
	});

	var checked;
	firebase.auth().onAuthStateChanged(function(user) {
		if (checked !== true) {
			if (user && window.location.pathname.indexOf("sign") != -1 && window.location.pathname.indexOf("index") != -1) {
				console.log("help");
				window.location = './home_page.html';
			}
			if (!user && window.location.pathname.indexOf("sign") == -1 && window.location.pathname.indexOf("index") == -1) {
				console.log("is this working???");
				window.location = './index.html';
			}
			checked = true;
		}
	});

});
