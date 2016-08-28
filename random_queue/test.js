// All printed booleans SHOULD be true.

var values = ["fish", "cat", "dog", "bat", "octopus", "giraffe", "lion"];
var queue = new RandomQueue(values, 3, ["giraffe"]);

console.log(queue.peek(), queue.peek() === "giraffe");

for (var i = 0; i < 5; i++) {
  var peek1 = queue.peek();
  var pop1 = queue.pop()
  var peek2 = queue.peek();
  console.log(
    [peek1, pop1, peek2],
    peek1 === pop1,
    pop1 !== peek2
  );
}

/********************************/

while (queue.peek().length !== 3) {
  queue.pop();
}

console.log("Peeking (SHOULD be cat/dog/bat):", queue.peek());

queue.setFilter(function(s) {
  return s.length !== 3;
});

console.log("Peeking (should NOT be cat/dog/bat):", queue.peek());

console.log("No cat/dog/bat from now on!");
console.log(queue.peek(), queue.peek() === queue.pop());
console.log(queue.peek(), queue.peek() === queue.pop());
console.log(queue.peek(), queue.peek() === queue.pop());
console.log(queue.peek(), queue.peek() === queue.pop());

/********************************/

console.log("Peeking (should NOT be cat/dog/bat):", queue.peek());

queue.setFilter(function(s) {
  return s.length === 3;
});

console.log("Peeking (SHOULD be cat/dog/bat):", queue.peek());

console.log("Only cat/dog/bat from now on!");
console.log(queue.peek(), queue.peek() === queue.pop());
console.log(queue.peek(), queue.peek() === queue.pop());
console.log(queue.peek(), queue.peek() === queue.pop());
console.log(queue.peek(), queue.peek() === queue.pop());


/********************************/

var tryBad = function() {
  try {
    queue.setFilter(function(s) {
      return s === "dog";
    });
    return false;
  } catch(e) {
    return e === "Not enough elements.";
  }
}

console.log("Bad filter was caught:", tryBad());
