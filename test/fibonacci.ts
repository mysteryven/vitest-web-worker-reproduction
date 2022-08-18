import exportWorker from "./exportWorker"

// If I use the `exportWorker` from ./exportWorker , It will be broken.
exportWorker(fibonacci)

// If I use inline exportWorker, It will passed
// function exportWorker(fn: CallableFunction) {
//   self.onmessage = function({data}) {
//     const result = fn(data)

//     self.postMessage(result)
//   }
// }

function fibonacci(n: number): number {
  if (n === 1) {
    return 1
  }

  if (n === 2) {
    return 2
  }

  return fibonacci(n - 1) + fibonacci(n - 2) 
}