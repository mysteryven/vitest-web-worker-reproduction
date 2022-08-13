import exportWorker from "./exportWorker"

// If I use `exportWorker` to wrapper worker.onmessage, 
// it will be error at second test
exportWorker(fibonacci)

// If I just write worker.onmessage in this file, it works.
// self.onmessage = function({data}) {
//     self.postMessage(fibonacci(data))
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

