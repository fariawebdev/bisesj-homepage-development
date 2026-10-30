import { describe, it, expect } from 'vitest'
import { SCHOOL } from '@/lib/content'

describe('Basic smoke test', () => {
  it('has valid school constant', () => {
    expect(SCHOOL.shortName).toBe('BISESJ')
  })
})
