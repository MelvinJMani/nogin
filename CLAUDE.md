# CLAUDE.md

# nogin

> Calm, offline-first brain games with an e-paper display vibe.

---

# What is nogin?

nogin is a minimalist brain-training Progressive Web App (PWA).

The product exists as a reaction against:

* addictive mobile games
* dopamine-driven UX
* infinite engagement loops
* attention extraction systems

nogin is intentionally calm.

The goal is not:

* maximizing retention
* maximizing session length
* maximizing monetization

The goal is:

* focused thinking
* calm interaction
* low-noise cognitive engagement

This is closer to:

* a notebook
* a Kindle
* a puzzle book

than a modern mobile game.

---

# Product Philosophy

nogin must feel:

* quiet
* tactile
* intentional
* distraction-free
* offline-capable
* lightweight

Every feature must support this philosophy.

If a feature increases:

* noise
* urgency
* addiction loops
* visual clutter
* unnecessary stimulation

it probably does not belong in nogin.

---

# Core Rules

## No dopamine mechanics

Never implement:

* streaks
* flashy rewards
* loot-box style mechanics
* excessive animations
* confetti
* competitive leaderboards
* fake urgency
* infinite scrolling engagement systems

nogin is intentionally anti-addictive.

---

# Offline First

nogin is designed to work offline.

Requirements:

* all games must work offline
* persistence must work offline
* app should remain usable without network
* local-first architecture preferred

Use:

* localStorage
* idb-keyval
* service workers
* vite-plugin-pwa

Avoid backend dependency unless absolutely necessary.

---

# Design Philosophy

Visual style:

* e-paper inspired
* grayscale
* low contrast noise
* calm typography
* minimal animation
* clean spacing

The UI should feel:

* readable
* stable
* tactile
* lightweight

Avoid:

* saturated colors
* glowing effects
* glassmorphism
* neon UI
* over-designed interfaces

---

# Mobile First

nogin is primarily a mobile experience.

All game UIs must:

* work on small screens
* avoid horizontal scrolling
* support touch-first interaction
* support keyboard navigation where appropriate
* scale cleanly

Minimum supported width:

* 320px

---

# Architecture Philosophy

nogin is a game platform, not a single game.

Games must be:

* isolated
* modular
* independently testable
* replaceable

Never tightly couple game logic to UI.

---

# Required Architecture Pattern

Each game must follow this structure:

```id="5cwx1z"
src/games/<game-name>/
  core/      # pure algorithms and logic
  hooks/     # React interaction hooks
  ui/        # presentation components
  utils/     # helper utilities

  engine.ts  # game engine implementation
  types.ts   # game-specific types
  index.ts   # public exports
```

---

# Separation of Concerns

## core/

Contains:

* generators
* solvers
* algorithms
* validation logic

Rules:

* pure TypeScript only
* no React
* no DOM
* no localStorage
* deterministic and testable

---

# engine.ts

Contains:

* game rules
* state transitions
* move validation
* completion logic

Rules:

* framework independent
* pure logic
* no UI rendering

---

# hooks/

Contains:

* keyboard handling
* interaction orchestration
* React state integration

Rules:

* no heavy business logic
* no rendering logic

---

# ui/

Contains:

* rendering
* layout
* visual interaction

Rules:

* presentation-focused only
* avoid embedding game logic
* components should remain composable

---

# utils/

Contains:

* lightweight helper functions
* pure utility logic

---

# State Management

Use Zustand.

Rules:

* keep global state minimal
* avoid prop drilling
* persist carefully
* avoid unnecessary re-renders

---

# TypeScript Standards

Project uses strict TypeScript.

Requirements:

* no `any`
* use type-only imports where needed
* no ignored TypeScript errors
* no ESLint suppressions unless necessary

Code should remain maintainable long term.

---

# Performance Expectations

Avoid:

* unnecessary re-renders
* deeply nested state mutations
* giant global stores
* expensive computations inside render

Prefer:

* memoization
* pure functions
* isolated state updates

---

# Persistence Rules

Games must support resume behavior.

Requirements:

* save progress automatically
* restore safely
* survive refresh/restart
* fail gracefully on corrupted data

Persistence must never crash the app.

---

# Game Design Expectations

Games should:

* reward thinking
* encourage calm repetition
* avoid pressure mechanics

The experience should feel:

* meditative
* thoughtful
* timeless

not manipulative.

---

# Accessibility Expectations

Support:

* keyboard navigation
* readable contrast
* scalable layouts
* touch-friendly targets

Avoid:

* tiny controls
* hover-only interactions
* unreadable low-contrast text

---

# Testing Philosophy

Core logic must be testable independently.

Prioritize testing:

* generators
* solvers
* engine logic
* state transitions

UI tests should focus on interaction behavior.

---

# Development Rules

Before implementing new features:

1. Preserve architecture boundaries
2. Avoid coupling
3. Keep logic testable
4. Keep UI calm
5. Preserve offline capability

If unsure:

* prefer simpler solutions
* prefer maintainability
* prefer clarity over cleverness

---

# Long-Term Vision

nogin is intended to become:

* a collection of calm thinking tools
* a sustainable offline-first experience
* a low-noise digital product

not another engagement-maximizing app.

Every architectural decision should support that direction.
