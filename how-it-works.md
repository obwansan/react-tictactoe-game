

* ReactDOM.render renders the Game class-based component into the app's root element
(just one root element in a pure React app. Can have many when React apps/components are used in a non-React (but JS!) codebase).

* The Game component renders the Board component (plus other non-custom DOM elements.  e.g. divs).

* When a user clicks on a square (a button element) the handleClick method is called.
  * Board's render method calls the renderSquare method for each of the squares on the board.
  * Board's renderSquare method returns a Square component, passing it the value of the square (an X or O, stored in the squares array on the state object), and Board's handleClick method.
  * The Square component in turn returns (renders) a button DOM element, displaying the value and having the onClick functionality.
  * handleClick gets a copy of all the squares (their values) by slicing the whole squares array on the state object.
    * If calculateWinner returns a value (X or O, not null), i.e. if someone has won, or if the clicked square has a value, don't do anything. Otherwise:
      * Assign 'X' or 'O' to the currently clicked square (element in the squares array COPIED FROM state).
      * Update state:
        * With the updated squares array.
        * Toggle the boolean value of the xIsNext variable (property on the state object).
        * (Updating state of course makes the Board component re-render (run it's render method) which causes all teh renderSquare methods to be called...)
