import '@vitest/web-worker'
import { beforeEach, describe, expect, it } from 'vitest'
import { renderHook } from '@testing-library/react-hooks'
import useWorker from '../src/useWorker'

describe('useWorker', () => {
    let createWorker: () => Worker

    beforeEach(() => {
        createWorker = () => {
            return new Worker(new URL('./fibonacci.worker', import.meta.url), {
                type: 'module'
            })
        }
    })

    it('should post message to web worker-1', async () => {
        const { result } = renderHook(() => useWorker(createWorker))
        const value = await result.current.workerRunner(5)
        expect(value).toBe(8)
    })

    it('should post message to web worker-2', async () => {
        const { result } = renderHook(() => useWorker(createWorker))
        const value = await result.current.workerRunner(5)
        expect(value).toBe(8)
    })
})