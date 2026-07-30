# Gamification 2.0 — Skills, Mastery, Confidence & Field Manual

The Horizon Truth 2.0 initiative (see `GAME_2.0_AUDIT_AND_ROADMAP.md` at the
repo root) added four interlocking learning systems to the game client. All of
them are additive: no backend API contract changed, and all new state is
persisted client-side through the existing zustand `horizon-game-storage`.

## Confidence tracking (Phase 15)

Before any choice is submitted, the player states how sure they are —
**Guessing (1)**, **Somewhat sure (3)**, or **Certain (5)** — via
`ConfidenceCheck` (`modules/gamification/components/ConfidenceCheck.tsx`).

- The value flows into the pre-existing telemetry field
  `decision_outcome.decision_confidence_level` (previously hardcoded to 5).
- `game.store` keeps a persisted **calibration ledger** (`calibration`):
  correct/total per confidence bucket.
- `modules/gamification/confidence.ts` owns the scale, the ledger shape,
  per-decision coaching copy (`calibrationMoment`) and the hub-level insight
  (`calibrationInsight`, shown once ≥5 "certain" decisions exist).
- Timed-out decisions submit automatically with confidence 1 (a guess). If the
  timer expires while the confidence dialog is open, the player's picked
  choice is honored.
- Keys 1–3 select confidence; Escape returns to the choices.

## Skill graph (Phase 7)

`modules/gamification/skills.ts` defines six competencies (source
verification, emotional defense, media analysis, data literacy, network
awareness, critical thinking). Each resolved decision is attributed to a skill
by matching the chosen option's `psychologicalTrap` through
`matchTechnique()` → `skillForTechnique()`.

- Correct decisions grant 12 skill XP, incorrect 3 (effort is never zeroed).
- The persisted `skillBook` in `game.store` records `{ xp, correct, total }`
  per skill; `SkillsPanel` on the mission hub renders per-skill level (1–10),
  accuracy, and a **focus area** callout (`weakestSkill`: lowest accuracy
  under 80% with ≥3 attempts).
- The shapes serialize directly if a backend table is added later.

## Mastery tiers (Phase 8)

`modules/gamification/mastery.ts` derives a tier per scenario purely from the
existing `PlayerScenarioRecord` bests returned by the API:

| Tier | Requirement |
|---|---|
| Bronze | Completed |
| Silver | ≥70% best accuracy |
| Gold | ≥85% |
| Platinum | ≥95% |
| Master | 100% |
| Legendary | 100% accuracy **and** best score = `totalPossibleScore` |

`ScenarioList` shows the current tier chip and a "Next: … " replay goal from
`nextMasteryGoal()`.

## Field Manual (Phase 6)

`modules/gamification/encyclopedia.ts` holds ~20 articles across six
categories (cognitive biases, manipulation techniques, synthetic media,
networks, scams, verification toolkit). Articles unlock when **either** a
missions-completed or XP threshold is met (`isArticleUnlocked`).

- Route: `/dashboard/manual` (`pages/FieldManualPage.tsx`, lazy-loaded).
- Learning moments deep-link to the relevant article via
  `/dashboard/manual?article=<id>` (`articleForTechnique`).
- The hub header shows unlocked/total count as the entry point.
- Content is English-first (same precedent as `learning-content.ts`); the
  structure supports adding per-language variants alongside later.

## Expanded technique library (Phase 5)

`learning-content.ts` gained four techniques — synthetic media, clickbait
framing, cherry-picking, conspiracy framing — with matcher patterns, so
scenario-authored trap strings resolve to richer lessons, and each matched
technique links into the Field Manual.

## Server-side persistence (roadmap item 1 — implemented)

The skill book and calibration ledger sync to the backend so progress
survives device changes and can feed admin analytics:

- **Entity**: `player_learning_profiles`
  (`backend/src/players/entities/player-learning-profile.entity.ts`) — one row
  per user with `skill_book` and `calibration` jsonb columns mirroring the
  client shapes.
- **Endpoints** (JWT-guarded, declared before the `/:userId` catch-all):
  - `GET /players/learning-profile/me` — returns `{ skillBook, calibration }`
    (empty ledgers if never synced).
  - `PUT /players/learning-profile/me` — upserts with an **element-wise max
    merge** (`learning-profile.util.ts`): counters are monotonic, so a stale
    device can never erase progress made elsewhere, and cumulative ledgers are
    never double-counted.
- **Client sync** (`game.store`): `fetchGameHistory` hydrates and merges the
  server copy on hub load (`modules/gamification/learning-profile.ts` mirrors
  the backend merge); every recorded decision pushes the updated ledgers
  fire-and-forget. Guests and offline players silently keep local state.

## Tests

`skills.test.ts`, `mastery.test.ts`, `confidence.test.ts` cover the mapping,
tier, and calibration logic (vitest, alongside the existing
`progression.test.ts`).
