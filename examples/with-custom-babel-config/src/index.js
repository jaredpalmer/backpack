const randomNo = Math.ceil(Math.random() * 100)

// `do` expressions are a new syntax proposal.
// @see: https://babeljs.io/docs/plugins/transform-do-expressions/
const message = do {
  if (randomNo < 30) {
    'Do not give up. Try again.'
  } else if (randomNo < 60) {
    'You are a lucky guy'
  } else {
    'You are soooo lucky!'
  }
}

console.log(`number: ${randomNo}`)
console.log(`message: ${message}`)
