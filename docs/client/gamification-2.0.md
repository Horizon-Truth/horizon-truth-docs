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

## Adaptive recommendation (Phase 9 — implemented)

`modules/gamification/recommendation.ts` picks the next best mission from
data that already exists — no backend changes:

- `scenarioSkill()` resolves a scenario's authored `psychologicalTrigger`
  (falling back to `theme`) through `matchTechnique()` to the skill it trains.
- `recommendScenario(scenarios, skillBook)` scores playable scenarios:
  an in-progress mission always wins (resume); then +50 for training the
  player's weakest skill, +25 for never-completed, a mastery-gap bonus
  (bronze 20 → platinum 5), and +10 for difficulty matched to overall
  accuracy (<70% → EASY, 70–85% → MEDIUM, ≥85% → HARD). Fully Legendary
  scenarios are skipped; ties break by learning-path `order`.
- `ScenarioList` shows the result as a "Recommended next" hero card with
  human-readable reason chips and marks the scenario in the path. Guests have
  no skill history, so their recommendation degrades gracefully to
  new-ground/difficulty signals.

## Campaign arcs (Phase 3 — implemented)

`modules/gamification/campaigns.ts` turns scenarios sharing a `campaignTag`
into visible story arcs — derived entirely client-side:

- `campaignTitle()` humanizes the tag (`ELECTION_CAMPAIGN` → "Election
  Campaign"); `groupByCampaign()` splits the ordered path into consecutive
  runs so standalone missions keep flowing between arcs.
- `campaignWorldState()` derives the arc's **world state** from the player's
  campaign record: chapters completed, campaign accuracy, and a narrative
  tone (`neutral` → "the story begins", `thriving` ≥85%, `contested` ≥70%,
  `crisis` below) — the story-level consequence of how well the player has
  contained misinformation so far.
- `ScenarioList` renders an arc header (name, chapter progress bar, world
  narrative) before each campaign's first mission and a "Chapter n of m" chip
  on every campaign mission.

Authoring note for admins: give scenarios the same `campaignTag` and
ascending `order` (plus `unlockScenarioId` chains if chapters must be played
in sequence) and the client renders the arc automatically.

## Community impact (Phase 4 — implemented)

`modules/gamification/impact.ts` turns the per-choice `spreadSimulation`
data scenario authors already provide into mission-level consequences:

- Choosing a spreading option adds its `reach`/`reshares`/`credibility_loss`
  to the harm side of the ledger; a correct call credits **exposure
  prevented** = the largest spread any other option on that scene would have
  caused (an honest counterfactual, not an invented number).
- The ledger (`missionImpact`) lives in `game.store`, keyed by `progressId`
  so refreshes and resumes can't mix missions; it persists with the rest of
  the game storage and resets on `startGame`.
- `GameOutcome` shows a "Community impact" section — people reached by
  misinformation you spread, reshares triggered, people shielded — plus a
  tone-graded narrative verdict (`impactVerdict`: good / mixed / bad).
- Scenes without authored spread data simply contribute nothing; the section
  hides when the whole mission had no measurable spread either way.

## Interactive challenge types (Phase 10 — first pass)

Two new `SceneContentType` values (backend enum extended; `PROPAGATION` was
also added there to match the client). Both render investigation UIs while
the scene's normal choices stay in `GameSession`, so scoring/outcomes work
unchanged. Both feed the telemetry `verification` block (`fact_panel_views`,
`source_button_clicked_count`, `profile_checked`).

**`URL_INSPECTION`** (`play/UrlInspection.tsx`) — a suspicious link in a fake
browser window. Clicking the address bar reveals the domain's anatomy
(protocol / subdomain / registered domain / path with explanations); an
"investigator toolkit" lists expandable clues. `scene.content`:

```json
{
  "url": "https://bbc-news24.co/breaking",
  "pageTitle": "BREAKING: ...",
  "pageSnippet": "...",
  "prompt": "Is this link what it claims to be?",
  "clues": [{ "label": "Domain registered 12 days ago", "detail": "...", "suspicious": true }]
}
```

**`SOURCE_COMPARISON`** (`play/SourceComparison.tsx`) — the same story from
several sources side by side, each with an "Examine this source" credibility
check. `scene.content`:

```json
{
  "prompt": "Who should you trust on this story?",
  "sources": [{
    "name": "National Desk", "handle": "@national_desk", "verified": true,
    "timestamp": "2h", "headline": "...", "excerpt": "...",
    "signals": [{ "label": "Named reporters", "detail": "...", "suspicious": false }]
  }]
}
```

Admins author both in `SceneEditor` (new type buttons + a JSON payload field
with placeholder templates). Note: the Postgres enum gains the new values via
TypeORM `synchronize` on next backend boot.

## Daily briefing (Phase 14 — first pass)

`modules/gamification/daily.ts` + `components/DailyBriefing.tsx`:

- **Mission of the day** — a date-seeded deterministic pick over the active
  scenario list (`dailyScenario`), identical for every player with the same
  content set; locked scenarios are skipped by walking forward from the
  seeded index.
- **Daily quests** — three fixed quests (complete a mission, 5 correct
  decisions, finish with ≥80% accuracy) evaluated against a per-day ledger
  (`dailyLedger` in `game.store`, persisted) that rolls over at *local*
  midnight via `ensureToday`. Counters advance inside `submitChoice`.
- No client-side rewards are granted — quests are goal-framing that feeds the
  existing server-computed streak; an "all quests cleared" state points the
  player at tomorrow.
- The old inline "daily goal" line on the hub was replaced by the briefing
  card, which sits beside the skills panel.

## Achievements & recurring cast (Phases 13 + 11 — first pass)

Both live on `/dashboard/achievements` (`pages/AchievementsPage.tsx`, tabbed).

**Achievements** (`achievements.ts`) — 35 achievements across five categories
(journey, precision, mastery, community impact, habits). Every one is
*derived*: `evaluateAll(ctx)` computes progress from tracked data only —
player stats, skill book, calibration ledger, mastery tiers from
`PlayerScenarioRecord`, lifetime impact totals, and the daily ledger. Nothing
is minted or separately stored, so an achievement can never claim something
the record doesn't support, and locked cards show honest partial progress
(`current / target`). Server-awarded badges remain the authoritative awards;
these complement them with fine-grained goals.

Achievements that need a minimum sample (calibration, per-skill accuracy)
report progress *toward the sample* first, so they can't be won on one lucky
decision.

**Recurring cast** (`characters.ts`) — six characters (journalist, teacher,
photo editor, health researcher, community organizer, neighbour). Each cares
about one skill (the neighbour about overall conduct), and `castState()`
derives their disposition — wary / neutral / warm / devoted — from the
player's **real accuracy in that area** (≥90 devoted, ≥70 warm, ≥50 neutral,
below wary), with no opinion at all until `OPINION_THRESHOLD` decisions
exist. Each disposition has its own line of dialogue, so relationships are a
human-readable lens on the skill graph rather than hidden state. The card
states plainly which statistic drives the relationship.

`game.store` gained `lifetimeImpact` (career reached / prevented totals,
accumulated once per completed mission) to back the impact achievements.

## Tests

`skills.test.ts`, `mastery.test.ts`, `confidence.test.ts` cover the mapping,
tier, and calibration logic (vitest, alongside the existing
`progression.test.ts`).
