/**
 * We’ll store the past squares arrays in another array called history.
 * The history array represents all board states, from the first to the
 * last move, and has a shape like this:
 */

 history = [
   // Before first move
   {
     squares: [
       null, null, null,
       null, null, null,
       null, null, null,
     ]
   },
   // After first move
   {
     squares: [
       null, null, null,
       null, 'X', null,
       null, null, null,
     ]
   },
   // After second move
   {
     squares: [
       null, null, null,
       null, 'X', null,
       null, null, 'O',
     ]
   },
   // ...
 ]
