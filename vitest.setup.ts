import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

global.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: query === "(max-width:600px)", // Simulate the media query you want
  media: query,
  addListener: vi.fn(),
  removeListener: vi.fn(),
}));

global.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: query === "(max-width:600px)", // Adjust this according to your test scenario
    media: query,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));

afterEach(() => {
  cleanup()
})
