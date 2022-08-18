export default function exportWorker(fn: CallableFunction) {
  self.onmessage = function({data}) {
    const result = fn(data)

    self.postMessage(result)
  }
}