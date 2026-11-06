# Architecture

**Product:** Pantry Recipe Filter
**Constraint:** The whole product runs in the browser. HTML, CSS, and JavaScript only. No server, no database, no build step, no account.

The page is split into three files, with JavaScript owning the data and the rule. The visual design comes from the Stitch export in `stitch_kitchen_notebook_app/`. Section 15 maps each Stitch screen to this build.

---

## 1. What the browser is responsible for

| Job | Owner |
|-----|--------|
| Page structure, labels, buttons | HTML |
| Layout, type, color, selected-chip look, print | CSS |
| Dish list, which cards are visible, empty states, remembering ticks | JavaScript |

Nothing is fetched. Nothing is sent. Refreshing the page may restore the last ticks from this browser only.

---

## 2. Files

```
index.html    structure. No dish copy in the markup.
styles.css    presentation.
recipes.js    ingredients and the recipe book.
app.js        diet, the 3-tick rule, filter, render, storage.
```

Open `index.html` directly. The scripts and the stylesheet are loaded with ordinary tags. `recipes.js` runs first.

```html
<link rel="stylesheet" href="styles.css" />
<script src="recipes.js" defer></script>
<script src="app.js" defer></script>
```

---

## 3. Runtime

```
index.html
    │
    ▼
app.js starts
    │
    ├─ read ingredients + dishes from recipes.js
    ├─ read last ticks and the diet choice from localStorage, if any
    │
    ▼
render
    ├─ paint ingredient chips in two groups
    ├─ keep a Set of ticked ingredient ids
    ├─ hide every recipe until 3 ingredients are ticked
    ├─ then keep a recipe only if every id in needs is ticked
    ├─ and only if it matches All, Veg, or Non-veg
    └─ paint one of three results
           • fewer than 3 ticks
           • 3 or more ticks, and no recipe is complete
           • one or more complete recipes
    │
    ▼
user ticks, unticks, changes diet, or presses Clear
    │
    ├─ update the Set or the diet
    ├─ write both to localStorage
    └─ render again
```

CSS does not decide which dish is visible. JavaScript does not set colors.

---

## 4. Data

Both lists live in `recipes.js` and are exposed as `window.PantryData`. Adding a recipe means adding a spec there. It does not mean adding a CSS rule. There are 50 ingredients and 262 recipes. Egg, chicken, mutton, fish, and prawns are the non-veg group. Egg counts as non-veg. Dairy and every other ingredient count as veg.

### Ingredients

```js
const ingredients = [
  { id: "rice", label: "Rice" },
  { id: "atta", label: "Atta" },
  { id: "bread", label: "Bread" },
  { id: "egg", label: "Egg" },
  { id: "milk", label: "Milk" },
  { id: "curd", label: "Curd" },
  { id: "onion", label: "Onion" },
  { id: "tomato", label: "Tomato" },
  { id: "potato", label: "Potato" },
  { id: "lentils", label: "Lentils" },
  { id: "spinach", label: "Spinach" },
  { id: "banana", label: "Banana" },
  { id: "chicken", label: "Chicken" },
  { id: "peas", label: "Peas" }
];
```

### Staples

Staples are not checkboxes. They are a sentence on the page.

```js
const staples = ["salt", "oil", "water", "cumin", "turmeric", "chili"];
```

A dish may use them in its steps. It must not list them in `needs`, or the dish would stay hidden until the cook ticked salt.

### Dishes

```js
const dishes = [
  {
    id: "jeera-rice",
    name: "Jeera rice",
    minutes: 15,
    needs: ["rice"],
    diet: "veg",
    steps: [ "…at least six steps, with times and a doneness check…" ]
  }
];
```

`needs` is the contract. The line under the title is `needs`, mapped to labels. `diet` is `"veg"` or `"non-veg"`, derived from `needs`. Each recipe has a full method, not a three-line sketch. Salt, oil, water, cumin, turmeric, and chili stay out of `needs`.

---

## 5. The filter

```js
function visibleDishes(selected, diet) {
  if (selected.size < 3) return [];
  return dishes.filter((dish) => {
    if (diet === "veg" && dish.diet !== "veg") return false;
    if (diet === "non-veg" && dish.diet !== "non-veg") return false;
    return dish.needs.every((id) => selected.has(id));
  });
}
```

| Selected | Diet | Result |
|----------|------|--------|
| empty, or only 1 or 2 ticks | any | No cards. Ask for 3 ingredients. |
| `{ chicken, onion, tomato }` | non-veg | Chicken curries whose needs are inside that set. Potato dishes stay hidden. |
| `{ potato, onion, tomato }` | veg | Aloo tamatar, dum aloo, jeera aloo. Chicken stays hidden even if chicken is also ticked. |
| `{ garlic, ginger, lemon }` | all | No cards. "Nothing matched." None of those three completes a recipe. |

A recipe that is missing one ingredient is hidden. Extra ticks do not hide a recipe. There is no score and no "close" match.

`selected` is a `Set` of ingredient ids. Clear replaces it with an empty set and removes the stored ticks. The diet choice is stored separately and stays put.

---

## 6. Page structure

`index.html` holds empty regions. JavaScript fills them.

```html
<main>
  <header>
    <h1>What can I cook with what is already here?</h1>
    <p>Tick the food that is actually in the kitchen. A dish appears only when every ingredient it needs is ticked.</p>
    <p id="staples"></p>
  </header>

  <section>
    <div class="board-head">
      <h2>In the kitchen</h2>
      <button type="button" id="clear">Clear</button>
    </div>
    <div id="chips" role="group" aria-label="Ingredients you have"></div>
  </section>

  <p id="status" role="status"></p>
  <section id="results" aria-label="Dishes you can cook"></section>
  <footer id="footnote"></footer>
</main>
```

### What JavaScript writes

| Region | Content |
|--------|---------|
| `#staples` | The assumption sentence, built from `staples` |
| `#chips` | One `<button>` per ingredient, `aria-pressed="true"` when ticked. Built once on load. |
| `#status` | The empty prompt, the no-match sentence, or a visually hidden count such as "1 dish you can cook." |
| `#results` | One `<article>` per visible dish: name, `[ N min ]`, ingredient labels, ordered steps |
| `#footnote` | "262 recipes, 50 ingredients. … Your ticks and the veg or non-veg choice stay in this browser. Nothing is sent." |

Chips are buttons, not checkboxes, so the script can store a set without a form. They stay real buttons: keyboard works, and the pressed state is announced.

---

## 7. Events

| Event | Action |
|-------|--------|
| Click or Space or Enter on a chip | Toggle that id in the set, save, render |
| Click Clear | Empty the set, delete the stored key, render |
| Page load | Read storage, then render once |

Chips are built once. A toggle only changes `aria-pressed` on the existing buttons, so the pressed chip keeps focus and the keyboard position never jumps. `#results` is replaced on every render. It is never appended to.

One click listener on `#chips` handles every chip. Buttons already respond to Space and Enter, so there is no separate key handler.

---

## 8. Storage

```js
const STORAGE_KEY = "pantry.selected";

function loadSelected() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return new Set();
  const ids = JSON.parse(raw).filter((id) =>
    ingredients.some((item) => item.id === id)
  );
  return new Set(ids);
}

function saveSelected(selected) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...selected]));
}
```

Unknown ids are dropped, so an old saved value cannot tick an ingredient that was removed.

If `localStorage` throws (private mode, blocked storage), the page still works for the current visit. The set simply starts empty and is not written.

Storage holds ids only. It does not hold dish text.

---

## 9. CSS

`styles.css` styles the structure. It does not contain dish names or `:has()` filter rules.

It is responsible for:

- The warm paper page, serif titles, clay-red time label, green selected chip
- Chips with 4px corners that wrap; cards in one column, two across from 900px when more than one dish matches
- `[aria-pressed="true"]` as the selected chip, with a drawn check mark
- A visible focus ring
- Print: hide Clear, the staple note, the status line, the footnote, and chips that are not pressed; keep each card on one page where it can

Tokens, taken from the Stitch design with one background chosen:

| Token | Value | Use |
|-------|-------|-----|
| `--paper` | `#f5f0e6` | Page |
| `--card` | `#faf8f5` | Chips and dish cards |
| `--line` | `#e3dac9` | Borders and section rules |
| `--rule` | `#eae2d2` | Line under a dish title |
| `--ink` | `#2b241f` | Text |
| `--muted` | `#6f655b` | Secondary text, step numbers |
| `--clay` | `#b44c38` | Cooking time only |
| `--garden` | `#2d4734` | Selected chip |
| `--cream` | `#faf7f2` | Text on a selected chip |

### Fonts

The stacks name EB Garamond and Work Sans first, then fall back to Garamond, Iowan Old Style, Palatino, Georgia, and system sans. Nothing is downloaded. If those fonts are installed, the page matches Stitch exactly; otherwise it uses the nearest local serif and sans. Loading Google Fonts would break the offline promise and the footnote.

---

## 10. Functions in `app.js`

| Function | Does |
|----------|------|
| `loadSelected()` | Read and validate stored ids |
| `saveSelected(selected)` | Write ids, or remove the key when empty; ignore storage failures |
| `visibleDishes(selected)` | The filter |
| `renderStaples()` | Write the staple sentence from `staples`, once |
| `renderChips(selected)` | Build the ingredient buttons, once |
| `syncChips(selected)` | Set `aria-pressed` on every chip |
| `renderStatus(selected, visible)` | Empty prompt, no-match, or a hidden count |
| `dishCard(dish)` / `renderDishes(visible)` | Build and replace the articles |
| `renderFootnote()` | Write the footnote with the dish count, once |
| `render(selected)` | `syncChips`, `renderStatus`, `renderDishes` |
| `toggle(id)` | Update the set, save, render |
| `clearAll()` | Empty set, remove the key, render |

Everything sits inside one function scope in `app.js`. No modules, no classes, no globals. Text is set with `textContent`, never `innerHTML`.

---

## 11. States

| State | Chips | Status line | Cards |
|-------|-------|-------------|-------|
| Fewer than 3 ticks | All unpressed, or 1–2 pressed | Ask for 3 ingredients. No cards, even if a one-ingredient recipe would otherwise match. | None |
| 3 or more ticks, nothing complete | Some pressed | "Nothing matched." Name the diet filter when it is veg or non-veg. | None |
| One or more complete | Some pressed | Hidden count: "N recipes you can cook." | Those recipes only, most specific first |

`#status` is the only place those sentences appear, so the cook never sees the prompt and a card at the same time.

---

## 12. Accessibility

- One `h1`. The kitchen is an `h2`. Each dish title is an `h3`.
- The chip group has an accessible name.
- Selected means `aria-pressed="true"`, not a color alone.
- `#status` has `role="status"`. A tick announces the prompt, "Nothing matched", or the number of dishes, without reading every card aloud.
- Steps are an ordered list.
- Focus rings stay visible.

---

## 13. Out of scope

- A server, an API, or a user account
- A bundler, a framework, or a package install
- Typing a new dish in the page
- Photos, search, ratings, or a shop list
- Treating a missing ingredient as optional

Remembering ticks is in scope, because it is a few lines in the same file and it never leaves the browser.

---

## 14. Check before calling it done

| Action | Expected |
|--------|----------|
| Open the file | Prompt to tick 3 ingredients. No cards. 50 chips. |
| Tick one or two ingredients | Still no cards. The prompt counts how many are left. |
| Tick potato, onion, tomato | Aloo tamatar, dum aloo, and jeera aloo, each with a full method. |
| Switch to Non-veg | Those three disappear. |
| Also tick chicken, still on Non-veg | Chicken curry and the other chicken recipes those ticks can make. |
| Switch to Veg | Chicken recipes disappear. The potato recipes return. |
| Reload | The same ticks, the same diet, the same cards. |
| Clear | Prompt returns. Diet is left as the cook set it. |
| Narrow the window to 390px | Chips wrap. No sideways scroll. |

Checked in the browser on 5 Nov 2026. The book is 262 recipes.

---

## 15. Stitch screens mapped to this build

The export in `stitch_kitchen_notebook_app/` is the visual spec. Its HTML is not used: it loads Tailwind and Google Fonts from the network, copies every chip by hand, and has no filter.

### Screens

| Stitch screen | Selected | What the build shows | Produced by |
|---------------|----------|----------------------|-------------|
| `what_can_i_cook_empty_state` | none, or fewer than 3 | Prompt in `#status`. `#results` empty. | `renderStatus`, `selected.size < 3` |
| `what_can_i_cook_no_matches` | 3 ticks that complete nothing, such as garlic, ginger, lemon | "Nothing matched" in `#status`. `#results` empty. | `renderStatus`, `visible.length === 0` |
| `what_can_i_cook` | chicken, onion, tomato, diet not Veg | Chicken curry and any other recipe those ticks fully cover. Count in a hidden `#status`. | `visibleDishes` → `renderDishes` |
| `what_can_i_cook_mobile` | chicken, onion, tomato | Same, one column, no sideways scroll | `styles.css`, `max-width: 480px` |
| `today_s_prep` | n/a | Not built | Off brief: dinner planner, nav bar, avatar |

These are not four pages. They are four values of `selected` on the same page.

### Screen elements

| Stitch element | Build | Region |
|----------------|-------|--------|
| Serif headline | `h1`, `--serif` | `header` |
| Grey instruction line | `.lede` | `header` |
| Italic staple note with a left rule | `.staples`, text from `staples` | `#staples` |
| "In the kitchen" + uppercase Clear | `h2`, `.clear` | `.board-head` |
| Square-cornered chips with a check box | `<button class="chip" aria-pressed>` with `.tick` | `#chips` |
| Green selected chip with a check | `[aria-pressed="true"]`, `.tick::after` | `#chips` |
| Italic empty and no-match sentences | `.status` | `#status` |
| Dish card, title, ingredient line | `.dish`, `h3`, `.dish-needs` | `#results` |
| `[ 40 min ]` in clay red, right side | `.dish-time` | `#results` |
| Numbered steps, serif numbers | `ol.steps`, CSS counter | `#results` |
| Small footnote under a rule | `.footnote` | `#footnote` |

### Deliberate differences from the export

| Export | Build | Reason |
|--------|-------|--------|
| Selected chips have no checkbox | Every chip is the same button with `aria-pressed` | In the export, ticked items could not be unticked or reached by keyboard |
| "Station Kitchen Ledger · Simple Provisions" above the headline | Removed | Not in the brief, and it used clay red, which is reserved for time |
| Background `#fff9f5` | `#f5f0e6` | The brief asked for unbleached paper. The export was pinker. |
| Clay `#c4583d` | `#b44c38` | The value in Stitch's own `DESIGN.md` |
| Tailwind CDN and Google Fonts | Local CSS, local font stack | Offline, and true to "nothing is sent" |
| Footnote: "Nothing is stored on a server" | "Your ticks are kept only in this browser. Nothing is sent." | The build stores ticks in `localStorage` |

`stitch_kitchen_notebook_app/kitchen_notebook/DESIGN.md` still describes buttons, scaling controls, a 12-column layout, and struck-through ingredients. Those are not part of this product. Trim it before generating more screens in Stitch.
