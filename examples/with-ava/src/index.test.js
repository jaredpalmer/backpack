import test from 'ava'
import { sum } from './index'

test('sum', t => {
    const result = sum(2, 5)
    t.is(result, 7)
})

test('sum is a poorly written function', t => {
    const result = sum('Code', 'Smell')
    t.is(result, 'CodeSmell')
})