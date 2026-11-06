# Pantry Recipe Filter
*Cook only with what is already in the kitchen*

**Author:** Ashish Kumar Sankhua | Product Manager
**Date:** November 2026 | **Status:** Working prototype

---

## 1. Executive Summary

### Product Overview
A single-page filter that answers one question: what can be cooked from the food already in the kitchen. The cook ticks ingredients. The page hides every dish that needs something unticked. Fifteen everyday dishes are written into the page. There is no account, no search box, and no typing of recipes.

### Target Users
- People cooking one meal for themselves from whatever is left in the kitchen
- Students and flatmates who will not maintain a pantry app
- Anyone who opens a recipe site and is sent back to the shop for one missing item

### Key Value Proposition
The page shows a dish only when the kitchen can actually make it. The filter is a rule, so a dish cannot appear by suggestion, guess, or a near match.

### Current Status
- **Prototype:** `index.html` in this folder. Open it in a current browser.
- **Stack:** HTML and CSS only. No JavaScript, no server, no database.
- **Coverage:** 14 ingredients and 15 dishes.
- **Data:** Written into the page. Salt, oil, water, cumin, turmeric, and chili are treated as already there.

---

## 2. Problem Statement

### The User Pain Point

| Pain Point | Impact | Current State |
|------------|--------|---------------|
| Recipe sites suggest meals that need a second shop | The cook gives up or orders food | Search results assume a stocked kitchen |
| Pantry apps ask for the whole inventory first | People stop after the first evening of typing | Manual entry is the product, and people will not do it |
| "Almost" matches waste a decision | A dish that needs one missing item is not a dish tonight | Apps still show it, with the missing item in grey |
| The same few ingredients come up again and again | Rice, egg, onion, and tomato cover a week of simple meals | Tools are built as catalogues, not as a yes-or-no filter |

### Key Insight
The job is not "find a recipe." The job is "hide everything I cannot cook." That is the intersection of two small sets: what is ticked, and what a dish requires. A closed list of dishes does not need search, an account, or a model.

---

## 3. Solution Overview

### Product Description
A page the cook opens and ticks. Each dish is hidden until every ingredient on its card is ticked. Partial matches stay hidden. Clear returns the page to empty.

### Core Capabilities

1. **Strict filter**
   - Tick rice. Jeera rice appears. Curd rice stays hidden until curd is ticked.
   - Tick chicken alone. Nothing appears, because chicken curry also needs onion and tomato.
   - Tick chicken, onion, and tomato. Chicken curry appears, and every other dish stays hidden.

2. **A visible staple rule**
   - Salt, oil, water, cumin, turmeric, and chili are assumed.
   - The assumption is printed on the page, so the cook can ignore a dish if one of those is actually missing.

3. **A readable card, not a link out**
   - Each dish shows time, the ingredients that qualified it, and three steps.
   - The cook does not leave the page to learn what to do.

### User Experience Flow

```
Open the page → Tick what is here → CSS hides every incomplete dish →
Read the card → Cook, or tick one more ingredient
```

### Dishes on the page (15)

1. Jeera rice — rice
2. Curd rice — rice, curd
3. Tomato rice — rice, tomato, onion
4. Egg fried rice — rice, egg, onion
5. Peas pulao — rice, peas, onion
6. Egg bhurji — egg, onion, tomato
7. Bread omelette — bread, egg, onion
8. Spinach omelette — spinach, egg, onion
9. Aloo sabzi — potato, onion, tomato
10. Dal fry — lentils, onion, tomato
11. Palak dal — spinach, lentils, onion
12. Chicken curry — chicken, onion, tomato
13. Aloo paratha — atta, potato
14. Potato sandwich — bread, potato, onion
15. Banana shake — banana, milk

---

## 4. Technology Justification

### Build vs. Buy vs. AI Decision Matrix

| Approach | Pros | Cons | Decision |
|----------|------|------|----------|
| **HTML and CSS checkbox filter** | Instant. Works offline. Cannot invent a dish. No account. One file. | The dish list is fixed until the file is edited. Ticks are not saved after refresh. | **Selected** |
| **Recipe app with a pantry account** | Can store the kitchen and add dishes | The chore is typing the pantry. People abandon it. | Rejected |
| **Generic LLM ("what can I cook")** | Accepts a sentence instead of ticks | Can name a dish that needs an ingredient the cook does not have. Needs a network and a prompt. | Rejected |
| **Search over a recipe database** | Large catalogue | Search returns near matches. Near matches are the failure this product exists to stop. | Rejected |

### Why a rule, not a model?

| Dimension | Recipe search or chatbot | This page |
|-----------|--------------------------|-----------|
| Match rule | Ranked or suggested | Hidden unless every required ingredient is ticked |
| Wrong dish | Possible, and hard to notice | Prevented by the stylesheet |
| Setup | Account, typing, or a prompt | Ticks |
| Where it runs | A server | The browser, in one file |
| How a dish is added | A content pipeline | A block of HTML and a class for each ingredient |

### Technical Rationale

1. The question never changes, and the ingredient list is small. A stylesheet can express "hide this card if this box is unticked."
2. Each dish carries classes such as `needs-rice` and `needs-egg`. One rule per ingredient hides every dish that needs it while that box is unticked.
3. A dish with three classes stays hidden until all three boxes are ticked. There is no score and no "close enough."
4. JavaScript would be required to remember ticks, count matches, or let a cook add a dish. Those are later. They are not required to answer tonight's question.
5. The same decision, made the other way, is why a facts chatbot over fund pages used retrieval: those questions vary and the pages change. Here the facts are a closed list, so retrieval would add a way to be wrong.

---

## 5. Success Metrics

### Primary Metrics

| Metric | Target | Current Status | Measurement Method |
|--------|--------|----------------|--------------------|
| Dishes shown with a missing ingredient | 0 | 0 on the checks below | Tick a known set and read which cards are visible |
| Time to a first honest answer | Under 15 seconds | Not measured with cooks | Watch a first-time user from open to first card |
| Account or network required | None | None | Page is one file. No script tag. |
| Partial match shown as cookable | 0 | 0 on the checks below | Tick chicken only. Chicken curry must stay hidden. |

### Checks run on the prototype

| Kitchen ticked | Visible dishes | Result |
|----------------|----------------|--------|
| Nothing | None. The page asks for a tick. | Pass |
| Rice | Jeera rice only | Pass |
| Chicken | None. The page says nothing matched. | Pass |
| Chicken, onion, tomato | Chicken curry only | Pass |
| Clear | Back to the empty prompt | Pass |

### Secondary Metrics

| Metric | Target | Purpose |
|--------|--------|---------|
| Cooks who tick again the next evening | To be measured | The page is only useful if it is opened twice |
| Dishes cooked from a card, without a shop trip | To be measured | Confirms the staple assumption is acceptable |
| Wrong class on a card | 0 | A class that does not match the printed ingredients is a wrong answer |

---

## 6. Risk Assessment

### Risk Matrix

| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|--------|---------------------|
| **A dish is tagged with the wrong ingredient** | Medium | High | The ingredients printed on the card and the `needs-` classes must be the same list. Check both when a dish is added. |
| **The staple assumption is false** | Medium | Medium | The page states that salt, oil, water, cumin, turmeric, and chili are assumed, and tells the cook to skip a dish if one is missing. |
| **An old browser ignores the filter** | Low | High | The filter uses `:has()`. Current Chrome, Edge, Safari, and Firefox support it. On a browser that does not, every dish would show. The page is for current browsers. |
| **The cook wants their own dish** | High | Low | Out of scope for this version. Adding a dish means editing the file. A form for new dishes needs JavaScript and is on the roadmap. |
| **Ticks disappear on refresh** | High | Low | Accepted. The kitchen is reticked in a few seconds. Saving ticks is the first reason to add script later. |
| **A dietary need is not an ingredient** | Medium | Medium | Vegetarian use is "leave chicken unticked." There is no separate diet switch, and there is no paneer, so the page does not claim to cover a diet. |

### Wrong-dish prevention

**The risk:** A card appears for a meal the kitchen cannot make.

**How the page prevents it:**
1. A dish starts from the rule "hide me if any required box is unticked," not from "show me if I look related."
2. There is no ranking. One missing class is enough to hide the card.
3. The empty state is explicit. Chicken alone produces "Nothing matched," rather than a curry with tomato marked optional.
4. The ingredient line on the card is the contract. If it says "Chicken, onion, tomato," the element must carry all three classes.

---

## 7. Technical Architecture

### System Diagram

```
┌─────────────────────────────────────────────┐
│                 index.html                  │
│                                             │
│   Checkboxes          Stylesheet            │
│   rice, egg, ...  →   hide .needs-rice      │
│                       unless #rice:checked  │
│                              │              │
│                              ▼              │
│                       Dish cards            │
│                       (15, written here)    │
└─────────────────────────────────────────────┘

Nothing leaves the browser.
Clear is a form reset button.
```

### Component Breakdown

| Piece | Technology | Purpose |
|-------|------------|---------|
| Ingredient board | HTML checkboxes inside a form | The cook declares what is here |
| Dish cards | HTML articles with `needs-` classes | The closed list of meals and steps |
| Filter | CSS `:has()` and `:not()` | Hide a card while any required box is unticked |
| Empty states | CSS | Ask for a tick, or say nothing matched |
| Clear | `<button type="reset">` | Untick everything without script |
| Print | A print stylesheet | Print the dishes that are currently visible |

### Key Technical Decisions

1. **Hide on a missing ingredient, rather than show on a complete set.** One rule per ingredient covers every dish. A rule per dish would have to be rewritten every time a dish is added.
2. **`:has()` rather than a sibling checkbox hack.** The cards sit in a grid below the board. They do not need to be siblings of each box.
3. **The "nothing matched" line is a second, explicit list of complete sets.** CSS cannot ask "is any card visible?" The page therefore names each complete combination that should hide that line. Those selectors must be updated when a dish is added. This is the maintenance cost of staying in CSS.
4. **No framework.** One file is the product. A build step would not change the cook's answer.

---

## 8. Go-to-Market

### Target User Segments

| Segment | Description | Value Proposition |
|---------|-------------|-------------------|
| **Cooking for one** | A person standing in the kitchen after work | An answer in the time it takes to tick rice, egg, and onion |
| **Shared flats** | People who will not share a pantry login | No account. The page can be sent as a file. |
| **The second shop trip** | People who start a recipe and stop at the missing item | Those recipes never appear |

### Deployment Strategy

| Phase | Action | Timeline |
|-------|--------|----------|
| Phase 1 | One file, 15 dishes, opened locally | Done |
| Phase 2 | Put the file on any static host so a link can be sent | Next |
| Phase 3 | Remember ticks on this browser | Later, and the first use of JavaScript |
| Phase 4 | Let a cook add a dish without editing the file | Later |

### Launch Channels
- Send the file, or a link to the file, to people who already cook from a short list of staples
- Use it as the worked example of a product that should stay a rule

---

## 9. Lessons Learned & Roadmap

### Key Learnings

1. **A closed list wants a rule.** Fund facts on changing pages justified retrieval and a model. Fifteen dishes with known ingredients do not. Using a model here would add the exact failure the page is built to prevent: a confident dish the kitchen cannot cook.
2. **The staple list is the product decision.** If oil and salt had to be ticked, almost nothing would match and the page would feel broken. If chicken were assumed, a vegetarian cook would be shown a curry. The line on the page is the decision, written where the cook can see it.
3. **The card and the classes are one fact, stored twice.** The printed ingredients and the `needs-` classes can drift. That drift is the bug equivalent of a bad source chunk. The check is to read both.
4. **CSS can filter. It cannot count.** Detecting "no card is visible" required a second copy of the rules. That duplication is acceptable at fifteen dishes and is the first thing to replace if the list grows.

### Challenges Overcome

| Challenge | Solution | Outcome |
|-----------|----------|---------|
| Partial matches looking helpful | Hide the card until every required box is ticked | Chicken alone shows no curry |
| An empty page looking broken | Two messages: tick something, or nothing matched | Both states checked in the browser |
| Avoiding a script for Clear | A reset button inside the form | Ticks clear and the empty prompt returns |
| Mobile layout | Chips wrap. Cards stay one column until the page is wide | Checked at a phone width |

### Future Roadmap

| Priority | Feature | Why it waits |
|----------|---------|--------------|
| High | Host the file at a link | The prototype is local |
| High | Remember today's ticks in the browser | Needs a few lines of script. Worth it only after someone uses the page twice. |
| Medium | Add a dish from the page | The list will feel small as soon as it is useful |
| Medium | A vegetarian default that keeps chicken unticked | Easy to fake by leaving the box empty. A saved preference needs script. |
| Low | Hindi labels | After the dish list settles |

---

## 10. Conclusion

### Summary
The pantry filter is a small product on purpose. The cook ticks what is in the kitchen, and the page refuses to show a dish that needs anything else. HTML and CSS are enough because the list is closed and the rule is strict.

### Key Achievements
- 15 dishes and 14 ingredients in one file
- A dish cannot appear unless every ingredient it names is ticked
- No account, no script, and no network
- Empty, single-ingredient, partial, and complete kitchens checked in the browser
- The staple assumption is written on the page, not hidden in a prompt

### Product-Market Fit Indicators
- [To be measured] Someone opens it on a second evening without being asked
- [To be measured] A cook finishes a card without a shop trip
- [To be measured] Someone asks for a dish that is not on the page, which is the signal to grow the list

### Next Steps
1. Hand the file to three people who cook for themselves and watch the first tick
2. Add only the dishes they actually expected and did not find
3. Add script only when forgetting the ticks becomes the complaint

---

## Appendix

### A. Resources
- **Prototype:** `index.html` in this folder
- **This document:** `case-study.md`

### B. Technical Stack
- **Page:** HTML
- **Filter and layout:** CSS, including `:has()` and `:not()`
- **Script:** none
- **Server:** none
- **Browser support relied on:** current Chrome, Edge, Safari, and Firefox

### C. How a dish is added
1. Add an article with one `needs-` class per ingredient on the card.
2. Print those same ingredients on the card.
3. Add a `:has()` line so "Nothing matched" hides when that dish is complete.
4. Retick the kitchen and confirm the new card stays hidden until every one of its boxes is ticked.
