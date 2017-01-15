/* @flow */

// This will throw an error when you run `npm run flow`.
// change the return type to `:number`, to remove the error.
function foo(x: string, y: number): string {
  return x.length * y;
}

console.log(foo("Hello", 42));
