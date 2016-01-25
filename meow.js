

var cats = [
  "ball-cat",
  "banana-cat",
  "basket-cat",
  "biting-cub-2",
  "biting-cub",
  "box-cat-2",
  "box-cat-3",
  "box-cat",
  "brush-cat",
  "bucket-cat",
  "bunny-cat",
  "cat-catching-plush",
  "cat-hugs-his-teddy-bear",
  "confused-cat",
  "cup-cat",
  "dancing-cat",
  "ear-twitch",
  "fat-cat",
  "lazy-cat",
  "lion-cat",
  "lizard-cat",
  "many-petters",
  "paw-licking",
  "playful-kitten",
  "quiver-cat",
  "sewing-cat",
  "sleepy-cat-2",
  "sleepy-cat-3",
  "sleepy-cat",
  "surprise-cat",
  "tail-licking-kitty",
  "tail-wag",
  "tongue-out-hq",
  "tongue-out",
  "tummy-scratch",
  "two-cats",
  "wobble-cat",
  "yawning-cat",
  "yawning-lion-cat"
];

var GIF_FOLDER = "./gif";
var JPG_FOLDER = GIF_FOLDER; // Same folder for now.

var UPCOMING_QUEUE_LENGTH = 10;
if (UPCOMING_QUEUE_LENGTH > cats.length) {
  console.error("UPCOMING_QUEUE_LENGTH is too long.");
}

var CatApp = function() {
  this._bg = document.getElementById("bg");
  this.img = {};
  this.currentBgImg = null;

  document.body.addEventListener("touchmove", this.touchmove.bind(this));
  document.body.addEventListener("mousemove", this.touchmove.bind(this));

  this.upcoming = ["wobble-cat"];
  for (; this.upcoming.length < UPCOMING_QUEUE_LENGTH;) {
    this.catenate();
  }

  this.preloadCat(this.upcoming[0]);
  this.advanceCats();
}

CatApp.prototype = {
  /*
   * Add a new cat to the end of the upcoming queue.
   */
  catenate: function() {
    var randomCat;
    while (true) {
      randomCat = cats[Math.floor(Math.random() * cats.length)];
      if (this.upcoming.indexOf(randomCat) === -1) {
        break;
      }
    }
    this.upcoming.push(randomCat);
  },

  advanceCats: function() {
    this.currentCat = this.upcoming.splice(0, 1);
    this.preloadCat(this.upcoming[0]);
    this.catenate();

    this.showCurrentCatStill();
  },

  showCurrentCatStill: function() {
    this.setImage(JPG_FOLDER + "/" + this.currentCat + ".jpg");
  },

  showCurrentCatMoving: function() {
    this.setImage(JPG_FOLDER + "/" + this.currentCat + ".gif");
  },

  preloadCat: function(imageName) {
    var jpgFilename = JPG_FOLDER + "/" + imageName + ".jpg";
    this.img[jpgFilename] = (new window.Image())
    this.img[jpgFilename].src = jpgFilename;

    var gifFilename = GIF_FOLDER + "/" + imageName + ".gif";
    this.img[gifFilename] = (new window.Image())
    this.img[gifFilename].src = gifFilename;
  },

  setImage: function(fileName) {
    if (this.currentBgImg == fileName) {
      return;
    }
    this.currentBgImg = fileName;
    document.body.style.backgroundImage = "url(" + fileName + ")";
  },

  touchmove: function(e) {
    this.showCurrentCatMoving();

    if (this._pauseTimeout) { clearTimeout(this._pauseTimeout); }
    this._pauseTimeout = setTimeout(this.showCurrentCatStill.bind(this), 100);

    if (this._advanceCatsTimeout) { clearTimeout(this._advanceCatsTimeout); }
    this._advanceCatsTimeout = setTimeout(this.advanceCats.bind(this), 1000);

    e.preventDefault();
  }
}

window.addEventListener("load", function() {
  var catApp = new CatApp();
})