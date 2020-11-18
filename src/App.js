import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { of, interval, concat, Subject } from 'rxjs'
import { 
  takeWhile,
  takeUntil,
  scan,
  startWith,
  repeatWhen,
  share
 } from 'rxjs/operators'
import './App.css';

// Creating an observable | Using the `$` is quite like a convention to say that it is an observable
const countDown$ = interval(1000).pipe( //interval()- emits an event as per the given milliseconds
// pipe() - allows piping some pipeable operators to an observable, which do not change the existing- 
// - Observable instance. Instead, they return a new Observable, whose subscription logic is based on the first Observable

// RxJS deals with Sync and Async events, kindof in the same way, so if teh observable has it's own-
//- inner state, it will return it synchronously 

  // Creating an initial state in the observable
  startWith(10), //will start with 0 and waits for a second to emit the next value
  scan(time => time - 1), //scan() is quite like reduce(), scan() shows all the values emitted, while-
  //- reduce() given only the total
  takeWhile(time => time > 0), // Emits values emitted by the source Observable so long as each value- 
  //- satisfies the given condition, and then completes as soon as this condition is not satisfied.
)
const observable$ = concat(countDown$, of('Wake up!!! ⏰⏰⏰'));
// concat()- Creates an output Observable which sequentially emits all values from given Observable- 
// -and then moves on to the next || of()- Converts the arguments to an observable sequence.

function App() {
  const [ state, setState ] = useState();
  useEffect(()=>{
    // values emitted by the observable$ would be sent to the setState()
    const subscription = observable$.subscribe(setState);

    return () => subscription.unsubscribe(); // The returned fn() unsubscribes from the subscription-
    //- quite does the cleanup, like a cleanup function

  }, []); // If teh dependency array is not provided, the observer will unsubscribe from the observable-
  //- and subscribe to a new one, on every re-render | [] => not syncing with anything
  return (
    <>
        <h3>&emsp;&emsp;&emsp;&emsp;Alarm Clock</h3>
        <div className="display">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{state}</div>
    </>
  );
}

export default App;
