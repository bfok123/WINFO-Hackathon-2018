var images = [];
images.push("res/img2.jpg");
images.push("res/img3.jpg");
images.push("res/img4.jpg");
var curr = 0;

function changeImage() {
  console.log("hi");
  if(curr < images.length) {
    document.getElementById("imgToChange").src = images[curr];
    document.getElementById("imgToChange").style.height = "91vh";
    curr++;
  } else {
    curr = 0;
  }
}
