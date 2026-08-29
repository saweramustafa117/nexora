// Values injected at build time via vite.config.js `define`
// Fallback to import.meta.env for local dev without define (shouldn't happen)

/* global __NEXORA_OPENROUTER_KEY__, __NEXORA_OPENROUTER_MODEL__ */

export const OPENROUTER_API_KEY = (
  typeof __NEXORA_OPENROUTER_KEY__ !== 'undefined'
    ? __NEXORA_OPENROUTER_KEY__
    : import.meta.env.VITE_OPENROUTER_API_KEY ?? ''
).trim()

export const OPENROUTER_MODEL = (
  typeof __NEXORA_OPENROUTER_MODEL__ !== 'undefined'
    ? __NEXORA_OPENROUTER_MODEL__
    : import.meta.env.VITE_OPENROUTER_MODEL ?? 'openrouter/free'
).trim() || 'openrouter/free'

export const HAS_OPENROUTER_KEY = OPENROUTER_API_KEY.length > 0
