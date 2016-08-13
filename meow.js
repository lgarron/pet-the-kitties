var CATS = {
  "ball-cat":                {orientation: "both", horizontalPercentage: "40%"},
  "banana-cat":              {orientation: "both", horizontalPercentage: "33%"},
  "basket-cat":              {orientation: "both", horizontalPercentage: "40%"},
  "biting-cub-2":            {orientation: "both", horizontalPercentage: "50%"},
  "biting-cub":              {orientation: "both", horizontalPercentage: "55%"},
  "box-cat-2":               {orientation: "both", horizontalPercentage: "50%"},
  "box-cat-3":               {orientation: "both", horizontalPercentage: "45%"},
  "box-cat":                 {orientation: "both", horizontalPercentage: "33%"},
  "brush-cat":               {orientation: "both", horizontalPercentage: "50%"},
  "bucket-cat":              {orientation: "horizontal"},
  "bunny-cat":               {orientation: "horizontal"},
  "cat-catching-plush":      {orientation: "horizontal"},
  "cat-hugs-his-teddy-bear": {orientation: "both", horizontalPercentage: "66%"},
  "confused-cat":            {orientation: "horizontal"},
  "cup-cat":                 {orientation: "both", horizontalPercentage: "50%"},
  "dancing-cat":             {orientation: "both", horizontalPercentage: "55%"},
  "ear-twitch":              {orientation: "vertical"},
  "fat-cat":                 {orientation: "horizontal"},
  "lazy-cat":                {orientation: "horizontal"},
  "lion-cat":                {orientation: "both", horizontalPercentage: "45%"},
  "lizard-cat":              {orientation: "both", horizontalPercentage: "33%"},
  "many-petters":            {orientation: "both", horizontalPercentage: "33%"},
  "paw-licking":             {orientation: "both", horizontalPercentage: "25%"},
  "playful-kitten":          {orientation: "both", horizontalPercentage: "60%"},
  "quiver-cat":              {orientation: "horizontal"},
  "sewing-cat":              {orientation: "both", horizontalPercentage: "50%"},
  "sleepy-cat-2":            {orientation: "both", horizontalPercentage: "33%"},
  "sleepy-cat-3":            {orientation: "both", horizontalPercentage: "55%"},
  "sleepy-cat":              {orientation: "both", horizontalPercentage: "50%"},
  "surprise-cat":            {orientation: "both", horizontalPercentage: "60%"},
  "tail-licking-kitty":      {orientation: "vertical"},
  "tail-wag":                {orientation: "horizontal"},
  "tongue-out":              {orientation: "both", horizontalPercentage: "50%"},
  "tummy-scratch":           {orientation: "horizontal"},
  "two-cats":                {orientation: "horizontal"},
  "wobble-cat":              {orientation: "both", horizontalPercentage: "50%"},
  "yawning-cat":             {orientation: "vertical"},
  "yawning-lion-cat":        {orientation: "both", horizontalPercentage: "50%"},
};

var CAT_NAMES = Object.keys(CATS);

var MP4_FOLDER = "mp4"

var INITIAL_UPCOMING_QUEUE = ["wobble-cat"];
var UPCOMING_QUEUE_TARGET_LENGTH = 10;
if (UPCOMING_QUEUE_TARGET_LENGTH > CAT_NAMES.length) {
  console.error("UPCOMING_QUEUE_TARGET_LENGTH is too long.");
}

var CatApp = function() {
  this._bg = document.getElementById("bg");
  this.img = {};
  this.currentBgFile = null;

  document.body.addEventListener("touchmove", this.touchmove.bind(this));
  document.body.addEventListener("mousemove", this.touchmove.bind(this));

  orientation = this.currentOrientation();
  window.addEventListener("resize", function() {
    if (orientation !== this.currentOrientation()) {
      orientation = this.currentOrientation();
      this.filterQueue(orientation);
      this.fillUpcomingQueue(orientation);
      console.log("Resized. Current orientation: ", orientation);
      if (!this.matchesOrientation(CATS[this.currentCat].orientation, orientation)) {
        this.advanceCats();
      }
    }
  }.bind(this));

  this.upcoming = INITIAL_UPCOMING_QUEUE;
  this.fillUpcomingQueue(this.currentOrientation());

  this.preloadCat(this.upcoming[0]);
  this.advanceCats();
}

CatApp.prototype = {
  matchesOrientation: function(query, orientation) {
    return ["both", orientation].indexOf(query) !== -1;
  },

  currentOrientation: function() {
    if (window.innerWidth > window.innerHeight) {
      return "horizontal";
    } else {
      return "vertical";
    }
  },

  /*
   * Remove images in the queue that don't match the orientation.
   */
  filterQueue: function(orientation) {
    this.upcoming = this.upcoming.filter(function(imageName) {
      return this.matchesOrientation(CATS[imageName].orientation, orientation);
    }.bind(this));
  },

  /*
   * Backfill the queue with images that match the given orientation.
   */
  fillUpcomingQueue: function(orientation) {
    for (; this.upcoming.length < UPCOMING_QUEUE_TARGET_LENGTH;) {
      this.catenate(orientation);
    }
  },

  /*
   * Add a new cat to the end of the upcoming queue.
   */
  catenate: function(orientation) {
    var randomCat;
    while (true) {
      randomCat = CAT_NAMES[Math.floor(Math.random() * CAT_NAMES.length)];
      randomCatOrientation = CATS[randomCat].orientation;
      if (this.upcoming.indexOf(randomCat) === -1 && this.matchesOrientation(randomCatOrientation, orientation)) {
        break;
      }
    }
    this.upcoming.push(randomCat);
  },

  advanceCats: function() {
    this.currentCat = this.upcoming.splice(0, 1)[0];
    this.preloadCat(this.upcoming[0]);
    this.catenate();

    console.log("Switching to cat:", this.currentCat);

    this.showCurrentCatStill();
  },

  showCurrentCatStill: function() {
    console.warn("UNIMPLEMENTED: showCurrentCatStill");
    this.setImage(this.currentCat, this.currentCat);
    this._video.pause();
  },

  showCurrentCatMoving: function() {
    // console.warn("UNIMPLEMENTED: showCurrentCatMoving");
    this.setImage(this.currentCat, this.currentCat);
    this._video.play();
  },

  preloadCat: function(fileName) {
    var mp4Filename = fileName;
    this.img[mp4Filename] = (new window.Image())
    this.img[mp4Filename].src = "https://garron.net/app/cat-mp4/mp4/" + fileName + ".mp4";

    var jpgFilename = fileName;
    this.img[jpgFilename] = (new window.Image())
    this.img[jpgFilename].src = "./gif/" + fileName + ".jpg";
  },

  setImage: function(imageName, fileName) {
    if (this.currentBgFile == fileName) {
      return;
    }
    this.currentBgFile = fileName;

    this._video = document.createElement("video");
    this._video.src = "https://garron.net/app/cat-mp4/mp4/" + fileName + ".mp4";
    this._video.poster = "./gif/" + fileName + ".jpg";
    this._video.setAttribute("preload", "auto");
    this._video.setAttribute("loop", "");
    this._video.setAttribute("muted", "");
    this._video.setAttribute("autoplay", "");
    this._video.setAttribute("preload", "auto");
    this._video.setAttribute("playsinline", "");
    this._video.setAttribute("webkit-playsinline", "");

    document.querySelector("#bg").innerHTML = "";
    document.querySelector("#bg").appendChild(this._video);

    this._video.play();
    this._video.pause();

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