
var RandomQueue = function(values, queueSize, initialQueue) {
  this._allValues = values;
  this._queueSize = queueSize;
  this._queue = initialQueue || [];

  this.setFilter(function() { return true }); // Fills queue.
}

RandomQueue.prototype = {
  /*
   * Add a new elements to the end of the upcoming queue until the queue is long
   * enough.
   */
  _backfill: function() {
    for (; this._queue.length < this._queueSize;) {
      this._catenate();
    }
  },

  _randomChoice: function(list) {
    return list[Math.floor(Math.random() * list.length)];
  },

  /*
   * Add a new element to the end of the upcoming queue.
   */
  _catenate: function() {
    var chosen;

    while (true) {
      chosen = this._randomChoice(this._filteredValues);
      if (this._queue.indexOf(chosen) === -1) {
        break;
      }
    }
    this._queue.push(chosen);
    // TODO: Remove `chosen` from `filteredValues` while it is in the queue?
  },

  /*
   * Remove images in the queue that don't match filter.
   */
  _trim: function(filter) {
    this._queue = this._queue.filter(this._filter);
  },

  /*
   * Set the filter.
   */
  setFilter: function(filter) {
    var _filteredValues = this._allValues.filter(filter);
    if (_filteredValues.length < this._queueSize) {
      throw "Not enough elements.";
    }

    this._filter = filter;
    this._filteredValues = _filteredValues;
    this._trim();
    this._backfill();
  },

  pop: function() {
    var popped = this._queue.splice(0, 1)[0];
    this._backfill();
    return popped;
  },

  peek: function() {
    return this._queue[0];
  }
}
