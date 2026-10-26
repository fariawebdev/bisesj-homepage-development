import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

vi.mock('next/font/google', () => ({
  Fraunces: vi.fn().mockImplementation((config) => ({
    variable: config?.variable || '--font-fraunces',
    className: 'mock-fraunces',
  })),
  Plus_Jakarta_Sans: vi.fn().mockImplementation((config) => ({
    variable: config?.variable || '--font-body',
    className: 'mock-jakarta',
  })),
  Noto_Sans_Arabic: vi.fn().mockImplementation((config) => ({
    variable: config?.variable || '--font-arabic',
    className: 'mock-noto-arabic',
  })),
  Hind_Siliguri: vi.fn().mockImplementation((config) => ({
    variable: config?.variable || '--font-bengali',
    className: 'mock-hind-siliguri',
  })),
}))
