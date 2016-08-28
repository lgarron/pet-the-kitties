var INITIAL_QUEUE = ["wobble-cat"];
var QUEUE_LENGTH = 10;

var CatApp = function() {
  this._bg = document.getElementById("bg");
  this._preloaded = {};

  this._initializeQueue();
  this._advanceCat();

  document.body.addEventListener("touchmove", this._touchmove.bind(this));
  document.body.addEventListener("mousemove", this._touchmove.bind(this));
}

CatApp.prototype = {
  _initializeQueue: function() {
    this._queue = new RandomQueue(CAT_NAMES, QUEUE_LENGTH, INITIAL_QUEUE);

    this._savedOrientation = this._currentOrientation();
    this._setFilter(this._savedOrientation);
    window.addEventListener("resize", this._onResize.bind(this));
  },

  _createFilter: function(orientation) {
    return function(cat) {
      return ["both", orientation].indexOf(CATS[cat].orientation) !== -1;
    }.bind(this);
  },

  _setFilter: function(orientation) {
    var filter = this._createFilter(orientation);
    this._queue.setFilter(filter);
  },

  _onResize: function() {
    var currentOrientation = this._currentOrientation();
    if (this._savedOrientation !== currentOrientation) {
      this._savedOrientation = currentOrientation;
      this._setFilter(this._savedOrientation);
      if (!filter(this._currentCat)) {
        this._advanceCat();
      }
      console.log("Resized. Current orientation: ", this._savedOrientation);
    }
  },

  _currentOrientation: function() {
    if (window.innerWidth > window.innerHeight) {
      return "horizontal";
    } else {
      return "vertical";
    }
  },

  _touchmove: function(e) {
    this._video.play();

    if (this._pauseTimeout) { clearTimeout(this._pauseTimeout); }
    this._pauseTimeout = setTimeout(this._video.pause.bind(this._video), 100);

    if (this._advanceCatTimeout) { clearTimeout(this._advanceCatTimeout); }
    this._advanceCatTimeout = setTimeout(this._advanceCat.bind(this), 1000);

    e.preventDefault();
  },

  _advanceCat: function() {
    var lastCat = this._currentCat;
    this._currentCat = this._queue.pop();
    var nextCat = this._queue.peek();

    console.log("Switching to cat:", this._currentCat);
    this._show(this._currentCat);

    this._preload(nextCat);
  },

  _preload: function(cat) {
    this._preloaded[cat + ".mp4"] = (new window.Image())
    this._preloaded[cat + ".mp4"].src = "https://garron.net/app/cat-mp4/mp4/" + cat + ".mp4";

    this._preloaded[cat + ".jpg"] = (new window.Image())
    this._preloaded[cat + ".jpg"].src = "./poster/" + cat + ".jpg";
  },

  _show: function(cat) {
    if (this.currentBgFile == cat) {
      return;
    }
    this.currentBgFile = cat;

    this._video = document.createElement("video");
    this._video.src = "https://garron.net/app/cat-mp4/mp4/" + cat + ".mp4";
    this._video.poster = "./poster/" + cat + ".jpg";
    this._video.setAttribute("preload", "auto");
    this._video.setAttribute("loop", "");
    this._video.setAttribute("muted", "");
    this._video.setAttribute("autoplay", "");
    this._video.setAttribute("preload", "");
    this._video.setAttribute("playsinline", "");
    this._video.setAttribute("webkit-playsinline", "");

    if (CATS[cat].orientation === "both") {
      // TODO: objectPositionX doesn't exist?
      this._video.setAttribute("style", "object-position: " + CATS[cat].horizontalPercentage + " 50%");
    }

    document.querySelector("#bg").innerHTML = "";
    document.querySelector("#bg").appendChild(this._video);

    this._video.pause();
  },
}

window.addEventListener("load", function() {
  var catApp = new CatApp();
})