import { useEffect, useRef, useCallback, useState } from 'react'

const PROMISE_RESOLVE = 'resolve'
const PROMISE_REJECT = 'reject'

type CreateWorker = () => Worker

export default function useWorker<R extends (...args: any) => any>(
    createWorker: () => Worker
) {
    const createWorkerRef = useRef<CreateWorker>(createWorker)
    const workerRef = useRef<Worker>()
    const promiseRef = useRef({
        [PROMISE_RESOLVE]: (value: ReturnType<R>) => { },
        [PROMISE_REJECT]: (error: Error | ErrorEvent) => { }
    })

    const callWorker = useCallback((...args: Parameters<R>) => {
        return new Promise((resolve, reject) => {
            promiseRef.current = {
                [PROMISE_RESOLVE]: resolve,
                [PROMISE_REJECT]: reject
            }

            workerRef.current?.postMessage(args[0])
        })
    }, [])

    useEffect(() => {
        createWorkerRef.current = createWorker
    })

    const workerRunner = useCallback((...fnArgs: Parameters<R>) => {
        const worker = createWorkerRef.current() as Worker
        workerRef.current = worker

        worker.onmessage = ({ data }) => {
            promiseRef.current[PROMISE_RESOLVE](data)
        }

        worker.onerror = (error) => {
            promiseRef.current[PROMISE_REJECT](error)
        }

        return callWorker(...fnArgs)
    }, [])

    return { workerRunner }
}