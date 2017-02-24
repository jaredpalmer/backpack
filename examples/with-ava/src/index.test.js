import test from 'ava'
import { sum } from './index'

test('sum', t => {
    const result = sum(2, 5)
    t.is(result, 7)
})