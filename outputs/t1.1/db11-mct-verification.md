# T1.1 DB11 MCT factual verification

Checked 2026-10-05 (Asia/Dubai). This evidence report does not modify application source or package figures.

## Result

**UNVERIFIED — applicability of the inherited GAD MCT reinforcement package to the configurator's DB11 M177 configuration.** The term must be removed from public DB11 package descriptions until GAD identifies the actual compatible hardware. If interpreted as a factory DB11 transmission identifier, MCT is **INCORRECT**: manufacturer evidence describes an eight-speed automatic, and its DB11 release identifies ZF. There is no verified MCT conversion specification in the available source. It would be unsupported to replace this with an invented ZF reinforcement product or transmission rating.

## Exact local source and history

The authoritative existing configurator data is `src/data/tuningCars.ts`, also preserved in `outputs/t1/baseline/tuningCars.ts` and `outputs/t1/configurator-extracted.json`.

| Record | Existing source location | Inherited local item |
| --- | --- | --- |
| DB11 / M177 / Stage 3 | `src/data/tuningCars.ts:572` | `Stage 1 GAD transmission reinforcement MCT (~1100 Nm)` |
| DB11 / M177 / Stage 4 | `src/data/tuningCars.ts:579` | `Stage 1 GAD transmission reinforcement MCT (~1100 Nm)` |
| DB11 / M177 / Stage 5 | `src/data/tuningCars.ts:588` | `Stage 2 GAD transmission reinforcement MCT with wet clutch (~1350 Nm)` |

`git blame` attributes all three descriptions to commit `af5398688bf0e3567076eadb39608c67270db266`, dated 2026-04-14, subject `Add tuning content for cars`, author `gpt-engineer-app[bot]`, co-author `hash4444`. They predate T1. The commit contains no URL, dated supplier quotation or explicit sourcing note. Therefore history proves inheritance, not technical compatibility. No package-data change existed at the beginning of T1.1.

## Primary-source corroboration and its limit

The live [GAD DB11 package page](https://www.gad-motors.de/50aqawgh9aye/aston-martin-db11) corroborates the MCT terminology in Stage 3, Stage 4 and Stage 5, including wet-clutch distinctions and the same approximate ratings. Relevant page sections: Stage 3 gearbox block, Stage 4 gearbox block, Stage 5 gearbox block, and separate service package. It reproduces the same stage totals: EUR 18,333, 33,792 and 56,435. Thus the local wording is source-backed as an inherited supplier label. The supplier page does not explain how this reinforcement fits a DB11 automatic, identify a compatible DB11 transmission code, or document a transmission conversion. A repeated supplier label does not settle applicability.

The manufacturer's [DB11 V8 launch release](https://media.astonmartin.com/sublime-choices-db11-now-offered-with-v8-engine/?lang=eng) identifies the early V8's 503 BHP / 675 Nm stock output. The [DB11 Volante V8 press kit](https://media.astonmartin.com/db11-volante-pearl-blonde-press-kit/?lang=eng), transmission specification, describes a rear-mounted eight-speed automatic. Its output specification matches that stock reference. The manufacturer's [DB11 introduction](https://media.astonmartin.com/aston-martin-db11-the-latest-in-an-illustrious-bloodline/?lang=eng) names ZF for the eight-speed automatic; this particular introduction concerns the V12, so it is supporting model-family evidence rather than a VIN-specific V8 transmission identification.

Excluded as direct DB11 evidence: the search-labelled NHTSA PDF `MC-10199184-0001.pdf` actually contains a V12 Speedster information sheet; `MC-10165855-9999.pdf` contains a Vantage information sheet. The Aston Martin `AM500` description-and-operation page describes a ZF automatic and torque converter but its model identity was not established as the DB11 configuration, so it is not used to assign a specific DB11 gearbox code. No secondary review, forum or Wikipedia claim is needed for the result above.

## Required public treatment

Suppress the three DB11 reinforcement strings, including their unverified package ratings and wet-clutch claim, in both the interactive configurator and initial-HTML package lists. Use a concise note that transmission reinforcement compatibility requires confirmation. Retain the independently listed TCU software items and all existing stock/tuned HP, torque, price and time values. Correct the DB11 editorial paragraph and FAQ so they no longer repeat MCT as supported package terminology. Do not create another transmission/package assertion.

This is a removal/qualification of an unresolved claim, not SEO expansion. A later supplier or workshop confirmation can restore a precisely identified compatible package. No message was sent to GAD and no commit, push or deployment was performed in this subtask.
