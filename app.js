(() => {
  "use strict";

  const STORAGE_KEY = "pantry.selected";
  const DIET_KEY = "pantry.diet";
  const MEAL_KEY = "pantry.meal";
  const MEAL_LABEL = {
    breakfast: "Breakfast",
    lunch: "Lunch",
    snack: "Snacks",
    dinner: "Dinner"
  };
  const MEAL_NOTE = {
    breakfast: "Breakfast is its own menu. Parathas that are also lunch are marked as shared.",
    lunch: "Lunch is its own menu. Dal, sabzi, and khichdi are shared with dinner.",
    snack: "Snacks stay a separate menu. A few evening plates are also dinner.",
    dinner: "Dinner is its own menu. Everyday dal and sabzi are shared with lunch."
  };
  const data = window.PantryData;
  const ingredients = data.ingredients;
  const staples = data.staples;
  const dishes = data.dishes;

  const chipsEl = document.getElementById("chips");
  const statusEl = document.getElementById("status");
  const resultsEl = document.getElementById("results");
  const staplesEl = document.getElementById("staples");
  const clearBtn = document.getElementById("clear");
  const dietButtons = Array.from(document.querySelectorAll("[data-diet]"));
  const mealButtons = Array.from(document.querySelectorAll("[data-meal]"));

  const labelOf = Object.fromEntries(ingredients.map((item) => [item.id, item.label]));

  function loadSelected() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      const known = new Set(ingredients.map((item) => item.id));
      return new Set(Array.isArray(raw) ? raw.filter((id) => known.has(id)) : []);
    } catch {
      return new Set();
    }
  }

  function loadDiet() {
    const raw = localStorage.getItem(DIET_KEY);
    return raw === "veg" || raw === "non-veg" ? raw : "";
  }

  function saveSelected(selected) {
    try {
      if (selected.size === 0) localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(selected)));
    } catch {
      /* private mode and full storage both fail quietly */
    }
  }

  function loadMeal() {
    const raw = localStorage.getItem(MEAL_KEY);
    return MEAL_LABEL[raw] ? raw : "";
  }

  function saveDiet(diet) {
    try {
      if (!diet) localStorage.removeItem(DIET_KEY);
      else localStorage.setItem(DIET_KEY, diet);
    } catch {
      /* ignore */
    }
  }

  function saveMeal(meal) {
    try {
      if (!meal) localStorage.removeItem(MEAL_KEY);
      else localStorage.setItem(MEAL_KEY, meal);
    } catch {
      /* ignore */
    }
  }

  const DIET_KEYWORD = { veg: "Veg", "non-veg": "Non-veg" };

  function dietAllows(dish, diet) {
    return dish.keywords.includes(DIET_KEYWORD[diet]);
  }

  // A ticked ingredient is a filter: the recipe must use it.
  // Anything the recipe still needs is listed on the card.
  function matchesTicks(dish, selected) {
    for (const id of selected) {
      if (!dish.keywords.includes(labelFor(id))) return false;
    }
    return true;
  }

  function missingIds(dish, selected) {
    return dish.needs.filter((id) => !selected.has(id));
  }

  function mealAllows(dish, meal) {
    return dish.meals.includes(meal);
  }

  function visibleDishes(selected, diet, meal) {
    if (!diet || !meal) return [];
    return dishes
      .filter((dish) => dietAllows(dish, diet) && mealAllows(dish, meal) && matchesTicks(dish, selected))
      .sort((a, b) => {
        const missing = missingIds(a, selected).length - missingIds(b, selected).length;
        return missing || b.needs.length - a.needs.length || a.name.localeCompare(b.name);
      });
  }

  function renderStaples() {
    const listed = staples.join(", ");
    staplesEl.textContent = `Assumed to be in the kitchen already: ${listed}. They are not asked for, except in a dish whose name needs one, like Jeera rice with cumin. Egg counts as non-veg.`;
  }

  function chipButton(item, selected, glow) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = glow ? "chip is-next" : "chip";
    button.dataset.id = item.id;
    button.setAttribute("aria-pressed", selected.has(item.id) ? "true" : "false");
    const tick = document.createElement("span");
    tick.className = "tick";
    tick.setAttribute("aria-hidden", "true");
    button.append(tick, document.createTextNode(item.label));
    return button;
  }

  function dishesFor(diet, meal) {
    return dishes.filter((dish) => dietAllows(dish, diet) && mealAllows(dish, meal));
  }

  function chipsFor(diet, meal) {
    const labels = new Set();
    for (const dish of dishesFor(diet, meal)) {
      for (const word of dish.keywords) labels.add(word);
    }
    return ingredients.filter((item) => labels.has(item.label));
  }

  // Kitchen chips are the ingredients used by this diet, meal, and protein.
  function kitchenFor(diet, meal, proteinId) {
    const proteinLabel = proteinId ? labelFor(proteinId) : "";
    const labels = new Set();
    for (const dish of dishesFor(diet, meal)) {
      if (proteinLabel && !dish.keywords.includes(proteinLabel)) continue;
      for (const word of dish.keywords) labels.add(word);
    }
    return ingredients.filter((item) => item.group !== "nonveg" && labels.has(item.label));
  }

  function allowedTickIds(selected, diet, meal) {
    const protein = diet === "non-veg" ? chosenProtein(selected) : "";
    const proteins = diet === "non-veg"
      ? chipsFor(diet, meal).filter((item) => item.group === "nonveg").map((item) => item.id)
      : [];
    const kitchen = (diet !== "non-veg" || protein)
      ? kitchenFor(diet, meal, protein).map((item) => item.id)
      : [];
    return new Set([...proteins, ...kitchen]);
  }

  function pruneTicks(selected, diet, meal) {
    const allowed = allowedTickIds(selected, diet, meal);
    let changed = false;
    for (const id of selected) {
      if (!allowed.has(id)) {
        selected.delete(id);
        changed = true;
      }
    }
    if (changed) saveSelected(selected);
  }

  function nextIngredientLabels(matches, selected) {
    const labels = new Set();
    if (selected.size === 0) return labels;
    const picked = new Set([...selected].map(labelFor));
    const skip = new Set(["Veg", "Non-veg", ...Object.values(MEAL_LABEL)]);
    for (const dish of matches) {
      for (const word of dish.keywords) {
        if (skip.has(word) || picked.has(word)) continue;
        labels.add(word);
      }
    }
    return labels;
  }

  function isProtein(id) {
    const item = ingredients.find((entry) => entry.id === id);
    return Boolean(item && item.group === "nonveg");
  }

  function chosenProtein(selected) {
    for (const id of selected) if (isProtein(id)) return id;
    return "";
  }

  function renderChips(selected, diet, meal, matches) {
    chipsEl.replaceChildren();
    const available = chipsFor(diet, meal);
    const next = nextIngredientLabels(matches, selected);
    const proteinId = chosenProtein(selected);
    const kitchen = diet === "non-veg"
      ? (proteinId ? kitchenFor(diet, meal, proteinId) : [])
      : kitchenFor(diet, meal, "");
    const protein = available.filter((item) => item.group === "nonveg");
    const groups = diet === "non-veg"
      ? [
          ["Egg, meat, and fish", "group-nonveg", protein, "radiogroup"],
          ["Ingredients", "group-kitchen", kitchen, "group"]
        ]
      : [["Ingredients", "group-kitchen", kitchen, "group"]];
    for (const [title, id, items, role] of groups) {
      if (items.length === 0) continue;
      const block = document.createElement("div");
      block.className = "chip-group";
      const label = document.createElement("p");
      label.className = "group-label";
      label.id = id;
      label.textContent = title;
      const row = document.createElement("div");
      row.className = "chips";
      row.setAttribute("role", role);
      row.setAttribute("aria-labelledby", label.id);
      for (const item of items) row.append(chipButton(item, selected, next.has(item.label)));
      block.append(label, row);
      chipsEl.append(block);
    }
  }

  function syncDiet(diet) {
    for (const button of dietButtons) {
      button.setAttribute("aria-pressed", button.dataset.diet === diet ? "true" : "false");
    }
  }

  function renderStatus(selected, diet, meal, matches) {
    statusEl.classList.remove("is-quiet");
    if (!diet || !meal) {
      statusEl.textContent = "Choose veg or non-veg, and a meal. Each meal has its own menu.";
      return;
    }
    if (diet === "non-veg" && !chosenProtein(selected)) {
      statusEl.textContent = "Choose egg, meat, or fish. One is required before recipes appear.";
      return;
    }
    const dietName = diet === "veg" ? "Veg" : "Non-veg";
    const mealName = MEAL_LABEL[meal];
    const words = [dietName, mealName, ...[...selected].map(labelFor)];
    const listed = words.join(", ");
    if (matches.length === 0) {
      statusEl.textContent = `Nothing matches ${listed}.`;
      return;
    }
    const noun = matches.length === 1 ? "recipe matches" : "recipes match";
    statusEl.textContent = `${matches.length} ${noun} ${listed}.`;
  }

  function labelFor(id) {
    if (labelOf[id]) return labelOf[id];
    return id.charAt(0).toUpperCase() + id.slice(1);
  }

  // Ingredients as the steps name them, in the order the cook meets them.
  // The stored major leads. Anything in `needs` that the steps omit is still listed.
  function ingredientIds(dish) {
    const major = dish.major;
    const fromSteps = PantryData.mentionedIn(dish.steps);
    const rest = [...fromSteps, ...dish.needs].filter((id, i, all) => id !== major && all.indexOf(id) === i);
    return { major, ids: [major, ...rest] };
  }

  function ingredientBlock(dish, selected) {
    const { major, ids } = ingredientIds(dish);
    const block = document.createElement("div");
    block.className = "dish-ingredients";

    const title = document.createElement("p");
    title.className = "ingredients-label";
    title.textContent = "Ingredients";

    const list = document.createElement("ul");
    list.className = "ingredient-list";
    for (const id of ids) {
      const item = document.createElement("li");
      // A staple is assumed unless this recipe names it as a needed ingredient, like cumin in Jeera rice.
      const isStaple = staples.includes(id) && !dish.needs.includes(id);
      const missing = dish.needs.includes(id) && !selected.has(id);
      // The major is not named here. Its keyword row above already says so.
      item.className = [
        "ingredient",
        id !== major && !isStaple ? "is-minor" : "",
        isStaple ? "is-staple" : "",
        missing ? "is-missing" : ""
      ].filter(Boolean).join(" ");
      item.textContent = labelFor(id);
      list.append(item);
    }

    block.append(title, list);
    return block;
  }

  // Each recipe can open a YouTube search for its name.
  function searchLinks(dish) {
    const query = encodeURIComponent(`${dish.name} recipe`);
    const row = document.createElement("p");
    row.className = "search-links";
    const link = document.createElement("a");
    link.className = "search-btn is-youtube";
    link.href = `https://www.youtube.com/results?search_query=${query}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Search on YouTube";
    row.append(link);
    return row;
  }

  function dishCard(dish, selected) {
    const article = document.createElement("article");
    article.className = "dish";

    const head = document.createElement("div");
    head.className = "dish-head";

    const titles = document.createElement("div");
    const heading = document.createElement("h3");
    heading.textContent = dish.name;
    const keywords = document.createElement("p");
    keywords.className = "keywords";
    const keywordLabel = document.createElement("span");
    keywordLabel.className = "keywords-label";
    keywordLabel.textContent = "Keywords";
    keywords.append(keywordLabel);
    const mealWords = new Set(Object.values(MEAL_LABEL));
    for (const word of dish.keywords) {
      const keyword = document.createElement("span");
      const kind = word === "Veg" ? "is-veg"
        : word === "Non-veg" ? "is-nonveg"
        : mealWords.has(word) ? "is-meal"
        : "is-ingredient";
      keyword.className = `keyword ${kind}`;
      keyword.textContent = word;
      keywords.append(keyword);
    }
    titles.append(heading, keywords);
    const links = searchLinks(dish);
    if (links) titles.append(links);

    const meta = document.createElement("div");
    meta.className = "dish-meta";
    const diet = document.createElement("p");
    diet.className = dish.keyword === "Veg" ? "dish-diet is-veg" : "dish-diet is-nonveg";
    diet.textContent = dish.keyword;
    const time = document.createElement("p");
    time.className = "dish-time";
    time.textContent = `[ ${dish.minutes} min ]`;
    meta.append(diet, time);

    head.append(titles, meta);

    const steps = document.createElement("ol");
    steps.className = "steps";
    for (const line of dish.steps) {
      const item = document.createElement("li");
      item.textContent = line;
      steps.append(item);
    }

    article.append(head, ingredientBlock(dish, selected), steps);
    return article;
  }

  function menuHeading(text, count) {
    const heading = document.createElement("h3");
    heading.className = "menu-heading";
    heading.textContent = `${text} · ${count}`;
    return heading;
  }

  function renderDishes(matches, selected, meal) {
    resultsEl.replaceChildren();
    if (matches.length === 0 || !meal) return;

    const only = matches.filter((dish) => dish.meals.length === 1);
    if (only.length) {
      resultsEl.append(menuHeading(MEAL_LABEL[meal], only.length));
      for (const dish of only) resultsEl.append(dishCard(dish, selected));
    }

    // Dishes that also belong to another meal form that meal's common menu, e.g. Common with Lunch.
    const commonWith = new Map();
    for (const dish of matches) {
      if (dish.meals.length < 2) continue;
      const other = dish.meals.find((id) => id !== meal);
      if (!commonWith.has(other)) commonWith.set(other, []);
      commonWith.get(other).push(dish);
    }
    for (const [other, list] of commonWith) {
      resultsEl.append(menuHeading(`Common with ${MEAL_LABEL[other]}`, list.length));
      for (const dish of list) resultsEl.append(dishCard(dish, selected));
    }
  }

  function syncMeal(meal) {
    for (const button of mealButtons) {
      button.setAttribute("aria-pressed", button.dataset.meal === meal ? "true" : "false");
      button.disabled = false;
    }
  }

  let menuKey = "";

  function render(selected, diet, meal) {
    const ready = Boolean(diet && meal);
    const proteinReady = diet !== "non-veg" || Boolean(chosenProtein(selected));
    if (ready) pruneTicks(selected, diet, meal);
    const matches = ready && proteinReady ? visibleDishes(selected, diet, meal) : [];
    const nextKey = `${diet}|${meal}`;
    const menuChanged = nextKey !== menuKey;
    menuKey = nextKey;
    syncDiet(diet);
    syncMeal(meal);
    const cook = document.querySelector(".cook");
    if (cook) cook.dataset.meal = meal || "";
    const banner = document.getElementById("meal-banner");
    const bannerTitle = document.getElementById("meal-banner-title");
    if (bannerTitle) bannerTitle.textContent = meal ? MEAL_LABEL[meal] : "";
    if (banner && menuChanged && meal) {
      banner.classList.remove("is-changing");
      void banner.offsetWidth;
      banner.classList.add("is-changing");
    }
    const note = document.getElementById("meal-note");
    if (note) note.textContent = meal ? MEAL_NOTE[meal] || "" : "";
    chipsEl.classList.remove("is-arriving");
    if (ready) renderChips(selected, diet, meal, matches);
    else chipsEl.replaceChildren();
    if (ready && menuChanged) {
      void chipsEl.offsetWidth;
      chipsEl.classList.add("is-arriving");
    }
    const narrowed = [...selected].some((id) => !isProtein(id));
    statusEl.classList.toggle("is-hit", narrowed && matches.length > 0 && matches.length <= 6);
    renderStatus(selected, diet, meal, matches);
    renderDishes(matches, selected, meal);
  }

  function toggle(id, selected) {
    const diet = loadDiet();
    if (diet === "non-veg" && isProtein(id)) {
      if (selected.has(id)) return;
      selected.clear();
      selected.add(id);
    } else if (selected.has(id)) selected.delete(id);
    else selected.add(id);
    saveSelected(selected);
    render(selected, diet, loadMeal());
  }

  function clearAll(selected) {
    selected.clear();
    saveSelected(selected);
    saveDiet("");
    saveMeal("");
    render(selected, "", "");
  }

  chipsEl.addEventListener("click", (event) => {
    const button = event.target.closest(".chip");
    if (!button || !chipsEl.contains(button)) return;
    toggle(button.dataset.id, selected);
  });

  for (const button of dietButtons) {
    button.addEventListener("click", () => {
      const diet = button.dataset.diet;
      if (diet === loadDiet()) return;
      selected.clear();
      saveSelected(selected);
      saveDiet(diet);
      render(selected, diet, loadMeal());
    });
  }

  for (const button of mealButtons) {
    button.addEventListener("click", () => {
      const meal = button.dataset.meal;
      if (meal === loadMeal()) return;
      selected.clear();
      saveSelected(selected);
      saveMeal(meal);
      render(selected, loadDiet(), meal);
    });
  }

  clearBtn.addEventListener("click", () => clearAll(selected));

  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(DIET_KEY);
    localStorage.removeItem(MEAL_KEY);
  } catch {
    /* private mode */
  }

  const selected = new Set();
  renderStaples();
  render(selected, "", "");
})();
