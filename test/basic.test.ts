import { expect, test } from 'vitest'

const createWorker = () => new Worker(new URL('./fibonacci', import.meta.url), {
  type: 'module'
})


test('run MyWorker first time', async () => {
  const worker = createWorker()
  const ret = await promiseWorker(worker, 10)
  expect(ret).toBe(89)
})

// The second test will print such errors
// Error: Test timed out in 5000ms.
// If this is a long-running test, pass a timeout value as the last argument or configure it globally with "testTimeout".
test('run MyWorker second time', async () => {
  const worker = createWorker()
  const ret = await promiseWorker(worker, 10)
  expect(ret).toBe(89)
})

function promiseWorker(worker: Worker, n: number) {
  return new Promise((resolve, reject) => {
    worker.onmessage = function({data}) {
      resolve(data)
    }
    worker.onmessageerror = function({data}) {
      reject(data)
    }

    worker.onerror = function(e) {
      reject(e)
    }

    worker.postMessage(n)
  }) 
}
