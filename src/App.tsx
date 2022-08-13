import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import useWorker from './useWorker'

const createWorker = () => new Worker(new URL('../test/fibonacci.worker.ts', import.meta.url), {
  type: 'module'
})

function App() {
  const { workerRunner } = useWorker(createWorker)
  const { workerRunner: workerRunner2 } = useWorker(createWorker)

  async function compute() {
    try {
      const ret = await workerRunner(10)
      console.log(ret, 'result-1')
    } catch (e) {
      console.error(e)
    }
  }

  async function compute2() {
    try {
      const ret = await workerRunner2(11)
      console.log(ret, 'result-2')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={compute}>
          compute fibonacci
        </button>
      </div>
      <div>
        <button onClick={compute2}>
          compute fibonacci-2
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
