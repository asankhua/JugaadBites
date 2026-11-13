# JugaadBites

Cook what you have. Not what you lack.

You open the fridge, see rice, onion, and a bit of paneer, and still cannot decide what to make. Most recipes start from a shopping list. JugaadBites starts from the shelf. Tick what is already in the kitchen and it shows only the home dishes those ingredients can make.

529 everyday Indian recipes. 52 ingredients. No account, no shopping list, and nothing leaves the browser.

## The problem

- The fridge is full and the mind is blank. The same five dishes come back because deciding is harder than cooking.
- A recipe you like needs six things you do not have, so dinner turns into a shop or a takeaway.
- Breakfast, lunch, snacks, and dinner get dumped into one list. Poha is not biryani.
- Pantry apps ask you to scan, sign up, and plan a week before they will name one dish.

## What it does

1. Choose **Veg** or **Non-veg**.
2. Choose one meal: **Breakfast**, **Lunch**, **Snacks**, or **Dinner**. Each meal has its own menu. A dish people really eat at two meals is marked **Common with** the other meal.
3. For non-veg, pick one protein first: egg, chicken, mutton, fish, or prawns.
4. Tick at least one ingredient. Recipes stay hidden until you do. Every tick is an AND filter: a dish stays only when it uses every ingredient you selected.
5. Ingredients that still match start to glow, so the next tick is obvious.
6. Open a card for the ingredient list and plain steps. **Search on YouTube** looks up that dish if you want a video.

Salt, oil, water, cumin, turmeric, and chili are assumed to be in the kitchen. They are not asked for, except when a dish is named for one of them, such as jeera rice. Egg counts as non-veg.

A refresh clears every choice.

## Run it

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8765
```

Then open `http://127.0.0.1:8765`.

There is no build step and no server. The page is HTML, CSS, and plain JavaScript. `recipes.js` holds the dishes. `app.js` filters them. `site.js` handles the page around the kitchen.

## Repo

https://github.com/asankhua/JugaadBites
