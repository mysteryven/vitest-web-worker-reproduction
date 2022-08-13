// If I inline this function into `fibonacci.worker.ts`, it also works
export default function exportWorker<T extends (...args: any) => any>(fn: T) {
    self.onmessage = function ({ data }) {
        self.postMessage(fn(data))
    }

    return fn
}