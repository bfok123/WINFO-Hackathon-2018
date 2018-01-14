var images = [];
images.push("res/img1.jpg");
images.push("res/img2.jpg");
images.push("res/img3.jpg");
images.push("res/img4.jpg");
var curr = 0;
var database = firebase.database();

window.onload = function() {
  database.ref("/favs").once("value").then(function(snapshot) {
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
