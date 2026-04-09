# Funnel selector — "Pick Your Next Watch"

## Purpose

Help the user narrow down seasonal anime to a single recommendation based on what they feel like watching right now. The funnel is a progressive narrowing tool — each step reduces the candidate pool until one show is revealed.

## Entry point

Accessible as a "Pick" tab in the TopBar alongside Home/Browse/Analysis. Uses the same recommendation data (no new API call). Framing: "What should I watch tonight?"

## Backend data

Each show includes:
- `moods`: array from `["adventurous", "cerebral", "chill", "dark", "emotional", "funny", "hype", "sporty"]`
- `intensity`: one of `"light"`, `"moderate"`, `"all_in"`

## Flow

### Step 1 — Mood (required)
- Present all 8 moods as tappable pills. Allow selecting 1-2 moods.
- Grey out moods with 0 matching candidates.
- Show candidate count after selection.
- "Next" button enabled when at least 1 mood selected.

### Step 2 — Intensity
- Three options: light, moderate, all-in. Single select.
- Auto-skip if all remaining candidates share the same intensity.
- Show updated candidate count.

### Step 3 — Length
- Options mapped to format: Movie (MOVIE), Short (TV_SHORT), Standard (TV), Long (ONA).
- Only show options that have candidates in current pool.
- Single select. Show updated candidate count.

### Step 4 — Novelty (ranking, not filtering)
- "Match my taste" → rank by discovery_score desc (default)
- "Surprise me" → rank by discovery_score asc
- "What's popular" → rank by popularityscore desc

### Step 5 — Reveal
- Show exactly 1 show as a large hero card (blurred bg, large cover, title, genres, moods, intensity, score).
- "Shuffle" button shows next-best from ranked pool.
- "Start over" resets the entire funnel.

## Navigation (simplified)

No going back to individual steps — only "Start over" to reset. Changing an earlier step not supported in v1.

## Edge cases

**Zero results.** Grey out options that would empty the pool. If pool is somehow empty at reveal, show message + "Start over."

**Auto-skip.** Step 2 skipped when intensity is uniform across mood-filtered pool.

**Missing data.** Optional chaining on moods/intensity — shows without these fields won't match any filter.

## Implementation checklist

### Done
- [x] Backend returns `moods` and `intensity` fields on show objects

### To implement
- [ ] Add "funnel" to `apiMode` mapping in `App.js`
- [ ] Import and render `FunnelContent` in `App.js` content memo
- [ ] Add "Pick" tab with `TouchAppIcon` to `MODES` in `TopBar.js`
- [ ] Create `src/components/funnel/FunnelContent.js`:
  - [ ] Step 1: Mood selection (multi-select pills, max 2, greyed-out zeroes)
  - [ ] Step 2: Intensity selection (single select, auto-skip logic)
  - [ ] Step 3: Length/format selection (single select, dynamic options)
  - [ ] Step 4: Novelty/ranking selection
  - [ ] Step 5: Single show reveal card with shuffle + start over
  - [ ] Progressive filtering chain (useMemo)
  - [ ] Candidate count display at each step
  - [ ] Step transition animation (animate-hero-fade-in)
  - [ ] Edge case handling (empty pool, missing data, shuffle wrap)

### Future enhancements (not in v1)
- [ ] Go back to individual steps without full restart
- [ ] Skip to results early from any step
- [ ] Breadcrumb/pill strip showing current filter state
- [ ] Filter state as tappable pills to modify previous choices