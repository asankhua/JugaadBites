/* Ingredients and the recipe book. Loaded before app.js. No network. */
(function () {
  const ingredients = [
    { id: "rice", label: "Rice", group: "kitchen" },
    { id: "atta", label: "Atta", group: "kitchen" },
    { id: "bread", label: "Bread", group: "kitchen" },
    { id: "poha", label: "Poha", group: "kitchen" },
    { id: "suji", label: "Suji", group: "kitchen" },
    { id: "besan", label: "Besan", group: "kitchen" },
    { id: "oats", label: "Oats", group: "kitchen" },
    { id: "vermicelli", label: "Vermicelli", group: "kitchen" },
    { id: "noodles", label: "Noodles", group: "kitchen" },
    { id: "pasta", label: "Pasta", group: "kitchen" },
    { id: "paneer", label: "Paneer", group: "kitchen" },
    { id: "tofu", label: "Tofu", group: "kitchen" },
    { id: "soya", label: "Soya chunks", group: "kitchen" },
    { id: "lentils", label: "Lentils", group: "kitchen" },
    { id: "chickpeas", label: "Chickpeas", group: "kitchen" },
    { id: "rajma", label: "Rajma", group: "kitchen" },
    { id: "sprouts", label: "Sprouts", group: "kitchen" },
    { id: "peanuts", label: "Peanuts", group: "kitchen" },
    { id: "milk", label: "Milk", group: "kitchen" },
    { id: "curd", label: "Curd", group: "kitchen" },
    { id: "butter", label: "Butter", group: "kitchen" },
    { id: "cheese", label: "Cheese", group: "kitchen" },
    { id: "onion", label: "Onion", group: "kitchen" },
    { id: "tomato", label: "Tomato", group: "kitchen" },
    { id: "potato", label: "Potato", group: "kitchen" },
    { id: "spinach", label: "Spinach", group: "kitchen" },
    { id: "peas", label: "Peas", group: "kitchen" },
    { id: "carrot", label: "Carrot", group: "kitchen" },
    { id: "beans", label: "Beans", group: "kitchen" },
    { id: "cabbage", label: "Cabbage", group: "kitchen" },
    { id: "cauliflower", label: "Cauliflower", group: "kitchen" },
    { id: "capsicum", label: "Capsicum", group: "kitchen" },
    { id: "eggplant", label: "Eggplant", group: "kitchen" },
    { id: "okra", label: "Okra", group: "kitchen" },
    { id: "cumin", label: "Cumin", group: "kitchen" },
    { id: "mushroom", label: "Mushroom", group: "kitchen" },
    { id: "corn", label: "Corn", group: "kitchen" },
    { id: "lauki", label: "Lauki", group: "kitchen" },
    { id: "pumpkin", label: "Pumpkin", group: "kitchen" },
    { id: "sweetpotato", label: "Sweet potato", group: "kitchen" },
    { id: "methi", label: "Methi", group: "kitchen" },
    { id: "lemon", label: "Lemon", group: "kitchen" },
    { id: "ginger", label: "Ginger", group: "kitchen" },
    { id: "garlic", label: "Garlic", group: "kitchen" },
    { id: "coconut", label: "Coconut", group: "kitchen" },
    { id: "banana", label: "Banana", group: "kitchen" },
    { id: "puffedrice", label: "Puffed rice", group: "kitchen" },
    { id: "egg", label: "Egg", group: "nonveg" },
    { id: "chicken", label: "Chicken", group: "nonveg" },
    { id: "mutton", label: "Mutton", group: "nonveg" },
    { id: "fish", label: "Fish", group: "nonveg" },
    { id: "prawns", label: "Prawns", group: "nonveg" }
  ];

  const staples = ["salt", "oil", "water", "cumin", "turmeric", "chili"];
  const NONVEG = new Set(["egg", "chicken", "mutton", "fish", "prawns"]);
  const labelOf = Object.fromEntries(ingredients.map((item) => [item.id, item.label]));

  function words(needs) {
    return needs.map((id) => labelOf[id].toLowerCase());
  }

  function list(needs) {
    const names = words(needs);
    if (names.length <= 1) return names[0] || "";
    return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
  }

  function mainOf(needs, skip) {
    const rest = needs.filter((id) => !skip.has(id));
    return labelOf[rest[0] || needs[0]].toLowerCase();
  }

  function has(needs, id) {
    return needs.includes(id);
  }

  const writers = {
    rice(s) {
      // Cumin is the flavour in Jeera rice. It is already in the tempering steps below, so it is not an extra to add later.
      const mix = words(s.needs).filter((name) => name !== "rice" && name !== "cumin");
      if (has(s.needs, "curd") && has(s.needs, "rice")) {
        return [
          "Rinse the rice and cook it in salted water until the grains are just done. Drain if you boiled it in plenty of water. Spread it for 2 minutes so it stops steaming.",
          s.tip,
          "Beat the curd with salt until it is smooth. If it is very sour, loosen it with a spoon of water.",
          "Mash a few spoons of the warm rice into the curd, then fold that through the rest of the rice. The rice must be warm, not boiling, or the curd splits and turns grainy.",
          has(s.needs, "lemon")
            ? "Add the lemon only after the rice and curd are mixed, and do not heat the bowl again."
            : "Do not put this back on the heat.",
          "Taste for salt. It should be creamy and loose enough to fall slowly off a spoon, not a stiff lump and not a soup.",
          "Eat it the same day. It does not reheat well."
        ];
      }
      return [
        "Rinse the rice in two changes of water until it runs mostly clear. Soak it for 10 minutes, then drain it in a sieve so the grains are wet but not sitting in water.",
        s.tip,
        mix.length
          ? `Before the pan is hot, prep the ${mix.join(" and ")}. Cut anything firm into pieces no bigger than a raisin so it cooks in the same time as the rice.`
          : "For plain rice, measure one and a half cups of water for each cup of rice. Too much water is what makes it sticky.",
        "Heat oil over medium heat. Add cumin and let it crackle for about 20 seconds, until it smells toasty rather than raw.",
        has(s.needs, "onion")
          ? "Add the onion with a pinch of salt. Cook 6 to 8 minutes, stirring, until the onion is soft and pale gold. If you brown it hard, the rice tastes bitter."
          : "Add a pinch of salt to the oil so the rice is seasoned from the first minute, not only at the end.",
        has(s.needs, "tomato")
          ? "Add the tomato, turmeric, and chili. Cook until the tomato breaks into a paste and you can see a little oil at the edges, about 5 minutes."
          : "Add turmeric and chili now, just enough to colour the oil. Stir for 20 seconds.",
        mix.length
          ? `Add the ${mix.filter((name) => name !== "onion" && name !== "tomato").join(" and ") || "remaining ingredients"} and stir for 2 minutes. They should smell cooked, not raw.`
          : "Do not add anything else. This dish is only rice, cumin, salt, and oil.",
        "Add the drained rice and salt. Stir gently for 1 minute so every grain is coated. Do not mash the rice.",
        "Pour in water to sit just above the rice, about one knuckle deep. Bring it to a simmer, cover tightly, and cook on low for 12 minutes without lifting the lid.",
        "Turn the heat off and leave it covered for 5 minutes. Fluff with a fork. The rice is done when a grain pressed between your fingers has no hard centre."
      ];
    },

    gravy(s) {
      const main = mainOf(s.needs, new Set(["onion", "tomato", "garlic", "ginger", "lemon"]));
      return [
        `Cut the ${main} into even pieces, about 2 cm, and set it aside. Uneven pieces are why one bite is raw and the next is mush.`,
        s.tip,
        "Heat oil over medium heat. Add cumin and wait until the seeds crackle, about 20 seconds.",
        has(s.needs, "onion")
          ? "Add the onion and a pinch of salt. Cook 7 to 8 minutes, stirring often, until the onion is soft and brown at the edges. This browning is the body of the gravy, so do not rush it."
          : "There is no onion in this one. Warm the oil with cumin, turmeric, and chili for 30 seconds so the spices do not taste raw.",
        has(s.needs, "ginger") || has(s.needs, "garlic")
          ? `Add the ${[has(s.needs, "ginger") ? "ginger" : "", has(s.needs, "garlic") ? "garlic" : ""].filter(Boolean).join(" and ")}. Cook for 1 minute, until the raw smell is gone and it smells sweet.`
          : "If the masala starts to catch, add a spoon of water and keep stirring. Do not add a cup.",
        has(s.needs, "tomato")
          ? "Add the tomato, turmeric, and chili. Cook until the tomato collapses and the oil separates at the edges, about 6 minutes. The masala should look like a thick paste, not a watery soup."
          : has(s.needs, "onion")
            ? "Add turmeric and chili to the onion and cook 1 minute. The onion gives this gravy its body."
            : "Add turmeric and chili and cook 1 minute, stirring, so the spices lose their raw smell.",
        `Add the ${main}. Stir for 2 minutes so every piece is coated in the masala.`,
        `Pour in water to come halfway up the ${main}, not over the top. Cover, lower the heat, and simmer until a piece cuts with the side of a spoon. Start checking at ${Math.max(8, s.minutes - 12)} minutes.`,
        "If the gravy is thin at the end, uncover and cook 2 minutes more. If it is dry and sticking, add two spoons of water.",
        has(s.needs, "lemon")
          ? "Turn off the heat, add the lemon juice, and rest 3 minutes. Lemon added earlier turns bitter."
          : "Turn off the heat and rest 3 minutes so the gravy thickens slightly. Taste for salt, then serve hot."
      ];
    },

    dry(s) {
      const main = mainOf(s.needs, new Set(["onion", "tomato", "garlic", "ginger", "lemon", "coconut"]));
      const watery = ["okra", "eggplant", "spinach"].some((id) => has(s.needs, id));
      return [
        watery
          ? `Wash the ${main} and pat it dry. Wet ${main} steams and turns slimy, so do not wash it at the last second.`
          : `Wash and cut the ${main} into even pieces so they finish together.`,
        s.tip,
        "Heat oil over medium-high heat. Add cumin and let it crackle.",
        has(s.needs, "onion")
          ? "Add the onion and a pinch of salt. Cook until the onion is soft and starting to colour, about 5 minutes."
          : "Sprinkle a pinch of salt into the oil. This dish stays dry, so salt early.",
        has(s.needs, "garlic") || has(s.needs, "ginger")
          ? `Add the ${[has(s.needs, "ginger") ? "ginger" : "", has(s.needs, "garlic") ? "garlic" : ""].filter(Boolean).join(" and ")} and cook 1 minute.`
          : "Add turmeric and chili. Stir for 20 seconds so the spices fry in the oil.",
        `Add the ${main}. Toss so every piece gets some oil and spice. Spread it in the pan rather than piling it up.`,
        has(s.needs, "tomato")
          ? "Add the tomato. Cook uncovered, stirring every couple of minutes, until the tomato dries into the vegetables and you no longer see loose liquid."
          : "Cook uncovered, stirring every 2 minutes. Add a spoon of water only if the pan is browning too fast.",
        has(s.needs, "coconut")
          ? "When the vegetables are nearly tender, add the coconut and toss for 1 minute. Coconut burns if it sits still."
          : "Keep the heat at medium. You want light browning on the edges, not a boil.",
        `The ${main} is done when a piece yields to a spoon but still holds its shape. Taste for salt.`,
        has(s.needs, "lemon")
          ? "Take it off the heat and add the lemon. Serve at once so it stays dry."
          : "Take it off the heat and serve at once. A dry sabzi turns soggy if it sits covered."
      ];
    },

    dal(s) {
      const extras = words(s.needs).filter((name) => name !== "lentils");
      return [
        "Rinse the lentils until the water is no longer cloudy. Pick out any stones. Soak for 15 minutes if you have the time; they cook faster and more evenly.",
        s.tip,
        "Put the lentils in a pot with turmeric and enough water to cover them by two fingers. Bring to a boil, skim the foam, then simmer until a lentil crushes easily between your fingers. Split lentils take about 20 minutes; whole ones take longer.",
        "Salt the lentils only after they are soft. Salt too early can keep them firm.",
        extras.length
          ? `While they simmer, heat oil, add cumin, and cook the ${extras.join(" and ")} until soft.`
          : "For the tadka, heat oil until it shimmers. Add cumin and chili and let them crackle for 20 seconds.",
        has(s.needs, "tomato")
          ? "Add the tomato to the tadka and cook until it turns into a paste and the oil shows at the edges, about 5 minutes."
          : "Keep the tadka on the heat just long enough for the spices to smell toasted, under a minute.",
        has(s.needs, "spinach") || has(s.needs, "methi")
          ? "Add the greens to the tadka and cook until they wilt and turn a deep green, about 3 minutes. Watery greens will thin the dal."
          : "Do not burn the chili. If the oil smokes, pull the pan off the heat for 10 seconds.",
        "Pour the tadka into the cooked lentils. It should sizzle. Simmer together for 5 minutes so the flavours meet.",
        "The dal should be thick enough to coat a spoon. Add hot water if it is stiff, or simmer uncovered if it is thin.",
        "Rest 3 minutes off the heat. Serve hot. The surface should look glossy from the tadka."
      ];
    },

    paratha(s) {
      const filling = mainOf(s.needs, new Set(["atta"]));
      if (/knead/i.test(s.tip)) {
        return [
          `Chop the ${filling} fine. If it is a leaf, wash it and squeeze out the water.`,
          s.tip,
          `Put the atta in a bowl with salt and the chopped ${filling}. Add water a spoon at a time and bring it into a soft dough.`,
          "Knead for 3 minutes until the dough is smooth and the filling is spread through it, not sitting in a clump.",
          "Cover with a damp cloth and rest 10 minutes.",
          "Divide into balls the size of a lime. Roll each into a disc about as thick as two coins, dusting with atta so it does not stick.",
          "Cook on a hot dry pan. When the surface dulls, flip it, add a little oil, and press with a spatula until both sides have brown spots.",
          "The centre is done when the dough at the edge no longer looks raw and pale. Wrap the parathas in a cloth so they stay soft."
        ];
      }
      return [
        `Boil or steam the ${filling} until a knife goes in with no resistance. Drain well and mash it while it is hot, with salt and chili. A wet mash makes the paratha tear, so let steam escape for 2 minutes.`,
        s.tip,
        "Put the atta in a bowl. Add water a spoon at a time and bring it into a soft dough, softer than a chapati dough. Knead for 3 minutes until it is smooth.",
        "Cover the dough with a damp cloth and rest it for 10 minutes. Rested dough rolls without springing back.",
        "Divide the dough into balls about the size of a lime. Roll each into a small disc, put a spoon of the mash in the centre, and pinch the edges shut so the filling is sealed.",
        "Dust with a little atta and roll gently into a disc about as thick as two coins. If the filling breaks through, patch it with a scrap of dough.",
        "Heat a dry pan until a drop of water skitters. Put the paratha on. When the surface dulls and bubbles, flip it.",
        "Spread a little oil on the cooked side, flip again, and press with a spatula so it browns in spots. Both sides should have dark toasted patches, not a pale centre.",
        "Keep finished parathas wrapped in a cloth so they stay soft. Eat warm. The centre is done when the dough no longer looks raw at the seam."
      ];
    },

    breakfast(s) {
      const base = mainOf(s.needs, new Set(["onion", "tomato", "lemon", "potato", "peas", "carrot"]));
      return [
        `Measure the ${base} before you start. Drain it until it stops dripping.`,
        s.tip,
        has(s.needs, "poha")
          ? "Rinse the poha in a sieve and leave it damp for 5 minutes. It should bend, not smash. If it is still hard, sprinkle a little more water."
          : `If you are using ${base}, have it ready in a bowl so you are not chopping once the pan is hot.`,
        "Heat oil over medium heat. Add cumin and let it crackle.",
        has(s.needs, "onion")
          ? "Add the onion and a pinch of salt. Cook until it is soft and the edges turn gold, about 5 minutes."
          : "Add turmeric and chili to the oil and stir for 15 seconds.",
        has(s.needs, "tomato") || has(s.needs, "potato")
          ? `Add the ${[has(s.needs, "potato") ? "potato, cut very small" : "", has(s.needs, "tomato") ? "tomato" : ""].filter(Boolean).join(" and ")}. ${has(s.needs, "potato") ? "Cover and cook 6 to 8 minutes, stirring once, until the potato is tender." : "Cook 3 minutes, stirring, until the tomato softens."}`
          : "Keep the heat at medium so the spices toast instead of burning.",
        `Add the ${base}, turmeric, chili, and salt. Toss gently. Hard stirring turns it to paste.`,
        has(s.needs, "suji")
          ? "Pour in water about one and a half times the volume of the suji, while stirring, so lumps do not form. Cook until the mixture leaves the sides of the pan."
          : "Cook for 3 to 5 minutes, until everything is hot and the raw smell of the grain or batter has gone.",
        has(s.needs, "lemon")
          ? "Turn off the heat and add the lemon. Taste. It should be savoury, a little hot, and not wet."
          : "Taste for salt. It is ready when the mixture is loose enough to eat with a spoon but not soupy.",
        "Serve immediately. These dishes firm up as they cool and do not reheat well."
      ];
    },

    pasta(s) {
      const extras = words(s.needs).filter((name) => name !== "pasta" && name !== "noodles");
      const noodle = has(s.needs, "noodles") ? "noodles" : "pasta";
      return [
        `Boil a pot of water with a heavy pinch of salt. It should taste like the sea. Add the ${noodle} and cook until it is tender but still has a bite. Drain and save a cup of the cooking water.`,
        s.tip,
        "While that boils, heat oil in a wide pan over medium heat.",
        has(s.needs, "garlic")
          ? "Add the garlic and cook for 30 seconds, only until it smells sweet. Garlic that turns brown tastes bitter in a sauce."
          : "Add cumin and let it crackle.",
        has(s.needs, "onion")
          ? "Add the onion and cook until soft, about 6 minutes."
          : "Keep the fat moving so nothing sits and burns.",
        extras.length
          ? `Add the ${extras.filter((name) => name !== "onion" && name !== "garlic").join(" and ") || "sauce ingredients"} with salt and chili. Cook until they soften, 5 to 8 minutes.`
          : "Add chili and a pinch of salt to the oil.",
        `Add the drained ${noodle} and a splash of the saved cooking water. Toss for 1 minute so the sauce clings instead of sitting in a puddle.`,
        has(s.needs, "cheese")
          ? "Turn off the heat and fold in the cheese so it melts in the residual heat and does not split."
          : "Taste. If it is dull, it needs salt, not more oil.",
        `Serve at once in warm bowls. The ${noodle} keeps cooking from its own heat, so slightly firm is the right place to stop.`
      ];
    },

    drink(s) {
      return [
        "Chill the glass if you can. These are meant to be drunk as soon as they are mixed.",
        s.tip,
        has(s.needs, "banana")
          ? "Peel the banana and slice it. Brown spots are fine; green banana will taste starchy, so use a ripe one."
          : "Have everything measured before you start. Drinks like this take under 5 minutes and do not wait.",
        has(s.needs, "milk")
          ? "Pour the milk in. Use cold milk for a shake. If it is about to boil for masala milk, watch it: milk climbs the pot as soon as it simmers."
          : "Put the curd in a bowl and beat it with a spoon until it is smooth and has no lumps.",
        has(s.needs, "curd") && has(s.needs, "milk")
          ? "Whisk the curd into the milk until there are no lumps."
          : "Add a pinch of salt even to a sweet drink. Salt makes the fruit taste sweeter.",
        "Mash, whisk, or shake in a jar with the lid on tight for 30 seconds. You want it smooth enough to drink, with a little texture left.",
        "Taste. A shake that tastes flat needs a pinch more salt or a few more seconds of mashing, not more sugar first.",
        "Pour and drink. Do not store it. Dairy and fruit separate and turn sour in the fridge within a few hours.",
        `This should take about ${s.minutes} minutes from start to glass.`
      ];
    },

    egg(s) {
      return [
        "Crack the eggs into a bowl and beat them with a pinch of salt and chili until the yolk and white are one colour. A few streaks of white means it is not beaten enough.",
        s.tip,
        has(s.needs, "onion") || has(s.needs, "tomato") || has(s.needs, "spinach") || has(s.needs, "capsicum") || has(s.needs, "potato") || has(s.needs, "mushroom")
          ? `Prep the ${words(s.needs).filter((name) => name !== "egg" && name !== "bread" && name !== "cheese" && name !== "rice").join(" and ")} before the pan is hot. Egg cooks in about 2 minutes, so have everything else cut and ready.`
          : "Have the beaten egg next to the stove. Once the pan is hot you should not be walking away.",
        has(s.needs, "potato")
          ? "Cook the potato first in oil, covered, until a piece is tender, about 8 minutes. Egg added too early coats raw potato."
          : "Heat oil in a pan over medium heat until it shimmers but does not smoke.",
        has(s.needs, "onion")
          ? "Cook the onion until it is soft, about 4 minutes. Add the other vegetables and cook until they give up their water."
          : "Swirl the oil so the base of the pan is covered.",
        has(s.needs, "bread")
          ? "Dip both sides of the bread in the beaten egg so it is coated, not dripping in a puddle. Fry until both sides are brown and the egg is set, about 2 minutes a side."
          : "Pour in the egg. For a bhurji, stir slowly so it sets in soft curds. For an omelette, let the bottom set, then fold. Stop while the centre is just set, not rubbery.",
        has(s.needs, "rice")
          ? "Fold the egg through the rice off the highest heat so the grains stay separate and the egg does not turn into leather."
          : "Take it off the heat as soon as the egg loses its shine. It keeps cooking on the plate.",
        has(s.needs, "cheese")
          ? "Add the cheese at the end, off the heat, so it melts instead of oiling out."
          : "Taste a piece. Egg takes more salt than you expect.",
        "Eat at once. Reheated egg turns spongy and smells of sulphur."
      ];
    },

    salad(s) {
      return [
        "Wash everything and drain it until it stops dripping. This dish is not cooked.",
        s.tip,
        `Chop the ${list(s.needs)} into small pieces so every bite has some of each.`,
        has(s.needs, "onion")
          ? "Slice the onion thin. If it is harsh, rinse it under cold water and squeeze it dry."
          : "Taste a piece of the main ingredient. If it is still hard, it is the wrong kind for a raw salad.",
        has(s.needs, "tomato")
          ? "Cut the tomato, salt it in a sieve for 5 minutes, and discard the water so the salad is not a puddle."
          : "Salt just before you eat. Salted too early, the vegetables weep.",
        has(s.needs, "lemon")
          ? "Add lemon juice, salt, and chili. Toss once."
          : "Add salt and chili. Toss once. There is no lemon in this version.",
        "Taste. It should be sharp and fresh. If it tastes flat, add a pinch more salt.",
        "Eat it the same day. It does not keep, and it should not be reheated."
      ];
    },

    meat(s) {
      const meat = ["chicken", "mutton", "fish", "prawns"].find((id) => has(s.needs, id));
      const meatName = labelOf[meat].toLowerCase();
      const simmer = meat === "mutton" ? "Mutton needs a long, low simmer, 45 to 60 minutes, with water coming halfway up the meat. It is done when a piece pulls apart with a spoon, not when the outside merely looks brown."
        : meat === "fish" ? "Fish is done when it turns opaque and flakes. That is often 8 to 12 minutes. Past that it dries and breaks into dust."
        : meat === "prawns" ? "Prawns are done when they curl and turn pink-white, usually 4 to 6 minutes. A grey, tight prawn has been cooked too long."
        : "Chicken is done when the juices at a cut run clear and the centre is no longer pink, usually 20 to 25 minutes of simmering for pieces.";
      return [
        `Pat the ${meatName} dry. ${meat === "fish" ? "Pull out any pin bones you can feel, and leave the pieces in a single layer." : meat === "prawns" ? "Leave them in one layer so they sear instead of steaming." : "Cut it into even pieces so the centre and the edges finish together."}`,
        s.tip,
        "Heat oil over medium heat until it shimmers. Add cumin and let it crackle.",
        has(s.needs, "onion")
          ? "Add the onion and a pinch of salt. Cook until it is properly brown at the edges, 8 to 10 minutes. Pale onion makes a pale, raw-tasting curry."
          : "Season the oil with turmeric and chili and stir for 20 seconds.",
        has(s.needs, "ginger") || has(s.needs, "garlic")
          ? `Add the ${[has(s.needs, "ginger") ? "ginger" : "", has(s.needs, "garlic") ? "garlic" : ""].filter(Boolean).join(" and ")} and cook 1 minute, until the raw smell turns sweet.`
          : has(s.needs, "onion")
            ? "Keep stirring so the onion colours evenly and does not burn in one spot."
            : "Keep the spices moving so they colour evenly.",
        has(s.needs, "tomato")
          ? "Add the tomato, turmeric, and chili. Cook until the tomato is a thick paste and the oil separates, about 6 minutes."
          : "Add turmeric and chili and fry them in the oil for 30 seconds.",
        `Add the ${meatName} and salt. Stir for 3 minutes so the surface loses its raw colour and picks up the masala.`,
        simmer,
        "If you are making a dry dish, keep the lid off near the end so the liquid cooks away and the edges brown. If you want gravy, add a splash of water and cover.",
        "Rest 5 minutes off the heat before you eat. Cutting or serving straight from the boil pushes the juices out onto the plate."
      ];
    }
  };

  // name, minutes, needs, method, the one instruction that makes this dish itself
  const specs = [
    ["Jeera rice", 20, ["rice", "cumin"], "rice", "Toast the cumin until it smells nutty before the rice goes in. Pale cumin tastes dusty."],
    ["Curd rice", 15, ["rice", "curd"], "rice", "Mash a little of the cooked rice into the curd first so the curd does not stay in lumps, then fold that through the rest. The rice should be warm, not hot, or the curd splits."],
    ["Tomato rice", 30, ["rice", "tomato", "onion"], "rice", "Cook the tomato until it is a paste before the rice is added. Raw tomato makes the rice sour and wet."],
    ["Peas pulao", 30, ["rice", "peas", "onion"], "rice", "Fry the onion to pale gold, then cook the peas for 3 minutes with a spoon of water before the rice goes in."],
    ["Spinach rice", 30, ["rice", "spinach", "onion"], "rice", "Wilt the spinach and cook off its water before adding rice, or the rice turns green and soggy."],
    ["Lemon rice", 20, ["rice", "lemon"], "rice", "Add the lemon only after the heat is off. Lemon boiled in the rice tastes bitter and the grains harden."],
    ["Coconut rice", 25, ["rice", "coconut"], "rice", "Stir the coconut through the hot rice at the end. Coconut left in the oil burns and tastes soapy."],
    ["Carrot rice", 30, ["rice", "carrot", "onion"], "rice", "Cut the carrot into small dice. Thick batons stay raw inside soft rice."],
    ["Capsicum rice", 25, ["rice", "capsicum", "onion"], "rice", "Add the capsicum near the end of the onion's cooking so it stays a little crisp, not stewed."],
    ["Mushroom pulao", 30, ["rice", "mushroom", "onion"], "rice", "Fry the mushrooms until they stop releasing water and start to brown, then add the rice."],
    ["Corn rice", 25, ["rice", "corn", "onion"], "rice", "If the corn is raw, cook it 4 minutes in the onion before the rice. Tinned corn only needs 1 minute."],
    ["Cabbage rice", 30, ["rice", "cabbage", "onion"], "rice", "Salt the cabbage in the pan and cook until it shrinks by half. A mountain of raw cabbage becomes a wet layer in the pot."],
    ["Beans rice", 30, ["rice", "beans", "onion"], "rice", "Slice the beans thin on a diagonal and give them 4 minutes in the pan before the rice, or they squeak and stay raw."],
    ["Methi rice", 25, ["rice", "methi", "onion"], "rice", "Use a small handful of methi. A lot of it turns the rice bitter. Strip the leaves off the thick stems."],
    ["Pumpkin rice", 35, ["rice", "pumpkin", "onion"], "rice", "Cut the pumpkin small and cook it until the edges slump before adding rice. Hard pumpkin never catches up."],
    ["Lauki rice", 30, ["rice", "lauki", "onion"], "rice", "Salt the lauki and let it sit 5 minutes, then squeeze out the water. Lauki is mostly water."],
    ["Sweet potato rice", 35, ["rice", "sweetpotato", "onion"], "rice", "Cube the sweet potato small and cook it until just tender. Overcooked sweet potato dissolves into the rice."],
    ["Paneer pulao", 30, ["rice", "paneer", "onion"], "rice", "Pan-fry the paneer cubes until the faces are spotted brown, then fold them in at the end so they do not turn to rubber in the steam."],
    ["Chickpea pulao", 35, ["rice", "chickpeas", "onion"], "rice", "The chickpeas must already be cooked tender. A hard chickpea will still be hard when the rice is done."],
    ["Rajma rice", 40, ["rice", "rajma", "onion"], "rice", "Use rajma that is fully cooked, almost creamy. Stir it through the rice gently so the rajma does not mash."],
    ["Tofu rice", 25, ["rice", "tofu", "onion"], "rice", "Press the tofu in a cloth for 10 minutes, cube it, and brown it before it meets the rice."],
    ["Soya pulao", 35, ["rice", "soya", "onion"], "rice", "Soak the soya chunks in hot water for 10 minutes, then squeeze them dry. Unsoaked soya tastes of cardboard."],
    ["Potato rice", 35, ["rice", "potato", "onion"], "rice", "Par-cook the potato cubes until a knife meets a little resistance, then finish them with the rice so they do not dissolve."],
    ["Cauliflower rice", 30, ["rice", "cauliflower", "onion"], "rice", "Break the cauliflower into tiny florets and brown them in the oil before adding rice. Steamed cauliflower tastes flat here."],
    ["Paneer tomato rice", 30, ["rice", "paneer", "tomato"], "rice", "Brown the paneer, set it aside, cook the tomato to a paste, then return the paneer with the rice."],
    ["Peas tomato rice", 30, ["rice", "peas", "tomato"], "rice", "Cook peas and tomato together until the tomato is a paste and the peas are bright, then add the rice."],
    ["Spinach garlic rice", 25, ["rice", "spinach", "garlic"], "rice", "Fry the garlic only until it smells sweet, then wilt the spinach. Burnt garlic will dominate the whole pot."],
    ["Lemon coconut rice", 20, ["rice", "lemon", "coconut"], "rice", "Fold coconut and lemon through the rice off the heat. Both turn harsh if they boil."],
    ["Carrot peas rice", 30, ["rice", "carrot", "peas"], "rice", "Start the carrot 3 minutes before the peas. Peas overcook into dull balls if they wait for the carrot."],

    ["Dal fry", 35, ["lentils", "onion", "tomato"], "dal", "The tadka should be cooked until the tomato paste leaves oil at the edges, then poured into the dal so it sizzles."],
    ["Tomato dal", 30, ["lentils", "tomato"], "dal", "Cook the tomato down to a paste in the tadka. A raw tomato floating in dal tastes sharp."],
    ["Garlic dal", 25, ["lentils", "garlic"], "dal", "Slice the garlic and fry it in the tadka until the edges are gold, not brown. Brown garlic is bitter in dal."],
    ["Palak dal", 35, ["lentils", "spinach", "onion"], "dal", "Wilt the spinach in the tadka until it is a deep green and the water is gone, then combine with the dal."],
    ["Methi dal", 30, ["lentils", "methi"], "dal", "A small bunch of methi is enough. Chop it fine and fry it in the tadka for 2 minutes to take the bitterness off."],
    ["Carrot dal", 35, ["lentils", "carrot", "onion"], "dal", "Grate the carrot into the tadka so it melts into the dal instead of staying in chunks."],
    ["Lauki dal", 35, ["lentils", "lauki"], "dal", "Peel the lauki, cube it small, and simmer it in the dal for the last 10 minutes until it turns translucent."],
    ["Pumpkin dal", 35, ["lentils", "pumpkin"], "dal", "Add pumpkin cubes halfway through the lentil simmer so they go soft without disappearing."],
    ["Coconut dal", 25, ["lentils", "coconut"], "dal", "Stir the coconut in at the end, off a hard boil. Boiled coconut turns oily."],
    ["Peanut dal", 35, ["lentils", "peanuts", "onion"], "dal", "Crush the peanuts roughly and fry them in the tadka until they smell roasted, then pour that over the dal."],
    ["Tadka dal", 30, ["lentils", "garlic", "onion"], "dal", "Fry onion until deep gold and garlic until just blond. That contrast is the whole dish."],
    ["Spinach garlic dal", 30, ["lentils", "spinach", "garlic"], "dal", "Garlic first, 30 seconds, then spinach until it collapses. Then the dal."],
    ["Tomato garlic dal", 30, ["lentils", "tomato", "garlic"], "dal", "Fry garlic, add tomato, and cook to a paste before it meets the lentils."],
    ["Methi tomato dal", 30, ["lentils", "methi", "tomato"], "dal", "Fry methi for a minute to dull the bitterness, then the tomato, then the dal."],
    ["Carrot spinach dal", 35, ["lentils", "carrot", "spinach"], "dal", "Carrot needs 5 minutes in the pot before the spinach, or the spinach overcooks while you wait."],

    ["Rajma masala", 50, ["rajma", "onion", "tomato"], "gravy", "Rajma must be fully boiled until creamy before it goes into the masala. Firm rajma will not soften in the gravy."],
    ["Chole", 50, ["chickpeas", "onion", "tomato"], "gravy", "Mash a spoonful of chickpeas into the masala. That starch is what makes chole thick without flour."],
    ["Dry chickpeas", 35, ["chickpeas", "onion", "tomato"], "dry", "Keep the heat high at the end so the masala coats the chickpeas and does not become a curry."],
    ["Sprout curry", 30, ["sprouts", "onion", "tomato"], "gravy", "Sprouts cook fast. Simmer only 8 to 10 minutes or they turn to mush and the skins float off."],
    ["Sprout salad", 15, ["sprouts", "onion", "lemon"], "salad", "Do not cook this. Toss sprouts with onion, salt, chili, and lemon. The crunch is the point."],
    ["Chickpea salad", 15, ["chickpeas", "onion", "tomato"], "salad", "Use cooked chickpeas, cooled. Toss, do not fry. Salt and chili are enough."],
    ["Soya curry", 35, ["soya", "onion", "tomato"], "gravy", "Soak soya chunks in hot salted water for 10 minutes, squeeze hard, then simmer them in the masala for 12 minutes so they drink it in."],
    ["Tofu curry", 30, ["tofu", "onion", "tomato"], "gravy", "Press and brown the tofu first. Soft tofu dropped into gravy breaks apart."],
    ["Peanut sabzi", 30, ["peanuts", "onion", "tomato"], "gravy", "Roast the peanuts in the dry pan until they smell sweet, then make the gravy around them."],
    ["Chickpea spinach", 35, ["chickpeas", "spinach", "onion"], "gravy", "Wilt the spinach into the onion before the chickpeas go in, and cook off the water."],
    ["Rajma spinach", 40, ["rajma", "spinach", "onion"], "gravy", "The rajma should be cooked through first. Spinach is added at the end so it stays green."],
    ["Soya dry fry", 25, ["soya", "onion", "capsicum"], "dry", "After soaking and squeezing, fry the soya until the edges colour, then add capsicum for the last 3 minutes."],
    ["Peanut spinach", 25, ["peanuts", "spinach", "garlic"], "dry", "Crush peanuts, fry them with garlic, then wilt the spinach. You want crunch against the leaves."],
    ["Sprout potato", 30, ["sprouts", "potato", "onion"], "dry", "Cook the potato until tender before the sprouts. Sprouts only need 5 minutes at the end."],

    ["Aloo tamatar", 30, ["potato", "onion", "tomato"], "gravy", "Boil or steam the potato until just tender, then simmer it in the tomato masala for 5 minutes so it takes up the spice without falling apart."],
    ["Jeera aloo", 25, ["potato", "cumin"], "dry", "The potato should be boiled, peeled, and crushed lightly, then tossed in crackling cumin until the edges bronze."],
    ["Aloo palak", 30, ["potato", "spinach", "onion"], "dry", "Cook the potato first. Spinach goes in at the end and should wilt, not boil into a green soup."],
    ["Aloo gobi", 35, ["potato", "cauliflower", "onion"], "dry", "Brown the cauliflower florets in oil before you cover the pan. Covered from the start, they steam and taste boiled."],
    ["Aloo matar", 30, ["potato", "peas", "onion"], "gravy", "Potato first, until nearly done, then peas for 5 minutes. Peas cooked as long as potato turn grey."],
    ["Aloo beans", 30, ["potato", "beans", "onion"], "dry", "Cut the potato and beans the same size. Start them together and cook uncovered so they fry, not stew."],
    ["Aloo methi", 25, ["potato", "methi"], "dry", "Use a modest amount of methi and fry it with the potato. A heavy hand of methi makes the potato bitter."],
    ["Aloo baingan", 35, ["potato", "eggplant", "onion"], "dry", "Salt the eggplant and let it sit 10 minutes, then pat it dry, or it will spit and steam."],
    ["Dum aloo", 40, ["potato", "onion", "tomato"], "gravy", "Fry the baby potatoes or large cubes until the skins blister, then simmer them in a small amount of masala, covered, on the lowest heat."],
    ["Aloo capsicum", 25, ["potato", "capsicum", "onion"], "dry", "Add capsicum in the last 4 minutes. It should stay a little crisp."],
    ["Bhindi masala", 30, ["okra", "onion", "tomato"], "dry", "Wipe the okra dry, do not wash it just before cooking. Cook uncovered on medium-high so the slime cooks off."],
    ["Bhindi fry", 25, ["okra", "onion"], "dry", "Whole okra, slit, fried until the ridges brown. Stir less. Stirring spreads the slime."],
    ["Baingan bharta", 40, ["eggplant", "onion", "tomato"], "gravy", "Roast the eggplant until the skin blackens and the flesh collapses, scoop it out, then mash it into the cooked onion and tomato."],
    ["Baingan masala", 30, ["eggplant", "onion", "tomato"], "gravy", "Cube the eggplant, salt it, pat it dry, and brown it before it goes into the masala or it drinks all the oil."],
    ["Gobi masala", 30, ["cauliflower", "onion", "tomato"], "gravy", "Brown the florets first in a little oil, set them aside, make the masala, then fold them back for 8 minutes."],
    ["Gobi fry", 25, ["cauliflower", "onion"], "dry", "High heat, small florets, lid off. You want spots of brown, not a pale steam."],
    ["Cabbage sabzi", 25, ["cabbage", "onion", "tomato"], "dry", "Cook uncovered until the cabbage shrinks and the tomato dries. Covered cabbage tastes boiled."],
    ["Cabbage thoran", 20, ["cabbage", "coconut"], "dry", "Toss shredded cabbage with coconut, salt, and chili, and cook only until the cabbage turns bright and loses its raw bite, about 8 minutes."],
    ["Carrot beans", 25, ["carrot", "beans", "coconut"], "dry", "Cut the carrot and beans into thin strips. Cook until just tender, then toss with coconut off the highest heat."],
    ["Carrot stir", 20, ["carrot", "onion"], "dry", "Cut the carrot thin. It is done when it bends but still has a snap."],
    ["Palak paneer", 30, ["spinach", "paneer", "onion"], "gravy", "Wilt the spinach, blend it or chop it fine, and add fried paneer at the end. Paneer boiled in spinach turns chewy."],
    ["Matar paneer", 30, ["peas", "paneer", "onion", "tomato"], "gravy", "Brown the paneer, make the tomato masala, add peas for 6 minutes, then return the paneer for 2 minutes only."],
    ["Kadai paneer", 30, ["paneer", "capsicum", "onion", "tomato"], "gravy", "Keep the capsicum in large pieces and add it near the end so it stays crisp against the soft paneer."],
    ["Paneer bhurji", 20, ["paneer", "onion", "tomato"], "dry", "Crumble the paneer with your hands. Cook the onion and tomato first, then the paneer for only 3 minutes or it dries out."],
    ["Paneer masala", 30, ["paneer", "onion", "tomato"], "gravy", "Fry paneer cubes until spotted, soak them in warm water for 5 minutes if they feel hard, then simmer briefly in the masala."],
    ["Milk paneer", 25, ["paneer", "onion", "milk"], "gravy", "Simmer the fried paneer in onion and a splash of milk. Do not boil hard or the milk splits."],
    ["Mushroom masala", 25, ["mushroom", "onion", "tomato"], "gravy", "Fry mushrooms until they release water and that water cooks away. Only then add them to the masala."],
    ["Mushroom fry", 20, ["mushroom", "onion", "garlic"], "dry", "High heat, don't crowd the pan. Mushrooms steam if they are piled up."],
    ["Corn masala", 25, ["corn", "onion", "tomato"], "gravy", "Cook corn in the masala for 8 minutes if it is raw, 3 if it is already cooked."],
    ["Lauki sabzi", 30, ["lauki", "onion", "tomato"], "gravy", "Peel the lauki. It is done when the cubes turn translucent and a spoon goes through with no crunch."],
    ["Lauki chana", 40, ["lauki", "chickpeas", "onion"], "gravy", "Chickpeas should be cooked already. Lauki goes in for the last 15 minutes."],
    ["Pumpkin sabzi", 30, ["pumpkin", "onion", "tomato"], "gravy", "Pumpkin collapses suddenly. Check at 12 minutes. You want it soft, not a puree, unless you prefer it that way."],
    ["Methi sabzi", 20, ["methi", "onion", "garlic"], "dry", "Discard thick stems. Fry with garlic until the raw, bitter smell softens, about 6 minutes."],
    ["Methi paneer", 25, ["methi", "paneer", "onion"], "dry", "Cook the methi first until it wilts and darkens, then fold in crumbled paneer for 2 minutes."],
    ["Capsicum masala", 25, ["capsicum", "onion", "tomato"], "gravy", "Cut capsicum in squares. Add after the masala is done and cook 5 minutes so it stays a little firm."],
    ["Beans thoran", 20, ["beans", "coconut"], "dry", "Chop the beans fine. Cook with salt until bright green and just tender, then toss with coconut."],
    ["Garlic potatoes", 25, ["potato", "garlic"], "dry", "Boiled potatoes, crushed, fried with sliced garlic until the garlic is gold and the potato has crisp edges."],
    ["Peas masala", 25, ["peas", "onion", "tomato"], "gravy", "Peas need 8 minutes in a simmering masala. Longer and they wrinkle."],
    ["Cauliflower peas", 30, ["cauliflower", "peas", "onion"], "dry", "Brown the cauliflower, add peas for the last 6 minutes."],
    ["Spinach corn", 20, ["spinach", "corn", "onion"], "dry", "Wilt spinach, squeeze it, then fold through corn so the dish is not a puddle."],
    ["Tofu bhurji", 20, ["tofu", "onion", "tomato"], "dry", "Crumble firm tofu and cook it like a bhurji, 4 minutes, so it picks up the masala and does not weep."],
    ["Tofu palak", 25, ["tofu", "spinach", "onion"], "dry", "Press the tofu, brown it, and fold it into wilted, squeezed spinach."],
    ["Soya palak", 30, ["soya", "spinach", "onion"], "gravy", "Soak and squeeze the soya, simmer it 10 minutes in onion, then add spinach to wilt."],
    ["Sweet potato fry", 25, ["sweetpotato", "onion"], "dry", "Slice into rounds and fry until the centres are soft and the faces are browned. Cover for the first 8 minutes, then uncover to crisp."],
    ["Sweet potato mash", 20, ["sweetpotato", "milk"], "drink", "Boil the sweet potato until very soft, mash with a splash of warm milk, salt, and chili. It should be a thick mash, not a soup."],
    ["Okra garlic", 25, ["okra", "garlic"], "dry", "Dry okra, hot pan, garlic added near the end so it does not burn while the okra browns."],
    ["Eggplant fry", 25, ["eggplant", "onion"], "dry", "Salt, rest, pat dry, then fry in a single layer. Turn once. Crowded eggplant steams."],
    ["Potato peas gravy", 30, ["potato", "peas", "tomato"], "gravy", "No onion in this one. The tomato and potato make the body. Peas go in for the last 6 minutes."],
    ["Corn capsicum", 20, ["corn", "capsicum", "onion"], "dry", "High heat, 6 to 8 minutes. Corn and capsicum should keep a bite."],
    ["Cabbage carrot", 20, ["cabbage", "carrot", "onion"], "dry", "Shred both. Carrot takes 2 minutes longer, so start it first."],
    ["Garlic spinach", 15, ["spinach", "garlic"], "dry", "A fast dish. Garlic 30 seconds, spinach in, lid off, done when it wilts and the water cooks off."],
    ["Garlic beans", 20, ["beans", "garlic"], "dry", "Thin diagonal slices. Garlic at the end. Beans should be bright, not olive coloured."],
    ["Ginger potatoes", 25, ["potato", "ginger"], "dry", "Julienne the ginger and fry it with crushed boiled potato until both smell sweet and the potato browns."],
    ["Ginger cauliflower", 25, ["cauliflower", "ginger"], "dry", "Ginger fried until fragrant, then cauliflower browned. Do not cover."],
    ["Lemon potatoes", 20, ["potato", "lemon"], "dry", "Toss hot fried or boiled potato with lemon off the heat, salt, and chili."],
    ["Coconut beans", 20, ["beans", "coconut", "garlic"], "dry", "Beans cooked until just tender, then garlic and coconut tossed through for 1 minute."],
    ["Paneer capsicum", 25, ["paneer", "capsicum", "onion"], "dry", "Brown paneer, add onion, then capsicum for 4 minutes. No gravy."],
    ["Mushroom peas", 25, ["mushroom", "peas", "onion"], "dry", "Mushrooms browned until dry, peas added for 5 minutes."],
    ["Lauki coconut", 25, ["lauki", "coconut"], "dry", "Cook peeled lauki with salt until translucent, then fold in coconut."],
    ["Pumpkin coconut", 25, ["pumpkin", "coconut"], "dry", "Soft pumpkin mashed lightly with coconut, salt, and chili. Not a soup."],
    ["Methi aloo dry", 25, ["methi", "potato", "garlic"], "dry", "Potato nearly done, then methi and garlic for 4 minutes."],
    ["Chickpea tomato", 30, ["chickpeas", "tomato", "garlic"], "gravy", "No onion. Garlic and tomato cooked to a paste, chickpeas simmered 10 minutes."],
    ["Tofu capsicum", 20, ["tofu", "capsicum", "garlic"], "dry", "Pressed tofu, browned, capsicum and garlic for the last 3 minutes."],

    ["Aloo paratha", 35, ["atta", "potato"], "paratha", "The potato mash must be dry and well salted. A wet filling bursts the dough."],
    ["Paneer paratha", 35, ["atta", "paneer"], "paratha", "Crumble paneer and mix with salt and chili. Do not add water to the filling."],
    ["Gobi paratha", 40, ["atta", "cauliflower"], "paratha", "Grate the cauliflower, salt it, and squeeze hard. The water you squeeze out is what makes gobi paratha soggy."],
    ["Methi paratha", 30, ["atta", "methi"], "paratha", "Chop methi fine and knead it into the dough itself, with salt and chili, rather than using a wet stuffing."],
    ["Onion paratha", 30, ["atta", "onion"], "paratha", "Slice onion very fine, salt it, and squeeze. Mix with chili and use as stuffing."],
    ["Carrot paratha", 35, ["atta", "carrot"], "paratha", "Grate the carrot fine and squeeze it. Coarse carrot tears the dough when you roll."],
    ["Peas paratha", 35, ["atta", "peas"], "paratha", "Mash cooked peas roughly. A smooth paste leaks; a coarse one stays put."],
    ["Spinach paratha", 30, ["atta", "spinach"], "paratha", "Wilt spinach, squeeze it dry, chop it, and knead it into the dough."],
    ["Paneer onion paratha", 35, ["atta", "paneer", "onion"], "paratha", "Fine onion, squeezed, mixed with crumbled paneer. Seal the dough well."],

    ["Kanda poha", 20, ["poha", "onion", "potato"], "breakfast", "Rinse poha and leave it damp. Potato must be cooked soft before the poha is folded in, gently, or it turns to paste."],
    ["Onion poha", 15, ["poha", "onion"], "breakfast", "The onion should be properly soft and sweet before the damp poha goes in. Toss, do not mash."],
    ["Lemon poha", 15, ["poha", "lemon", "onion"], "breakfast", "Lemon goes in off the heat, after the poha is hot."],
    ["Potato poha", 20, ["poha", "potato"], "breakfast", "Tiny potato cubes, cooked covered until tender, then poha folded through."],
    ["Peas poha", 20, ["poha", "peas", "onion"], "breakfast", "Peas need 5 minutes in the onion before the poha, or they stay raw and cold in the middle."],
    ["Upma", 20, ["suji", "onion"], "breakfast", "Roast the suji in a dry pan until it smells nutty, then add it to boiling seasoned water while stirring so lumps do not form."],
    ["Tomato upma", 25, ["suji", "tomato", "onion"], "breakfast", "Cook the tomato down before the water and suji. Watery tomato makes thin upma."],
    ["Vegetable upma", 25, ["suji", "carrot", "peas"], "breakfast", "Cook carrot and peas until tender, add water, then rain in the roasted suji while you stir."],
    ["Rava dosa", 25, ["suji", "onion"], "breakfast", "Mix suji with water to a thin batter, rest 10 minutes, and pour it on a hot pan like a lacy crepe. It should look full of holes."],
    ["Besan chilla", 20, ["besan", "onion"], "breakfast", "Whisk besan with water to a dosa-batter thickness, stir in onion, and cook thin pancakes until the edges lift and brown."],
    ["Onion chilla", 20, ["besan", "onion", "tomato"], "breakfast", "A spoon of chopped tomato in the besan batter. Cook on medium or the centre stays raw."],
    ["Spinach chilla", 20, ["besan", "spinach"], "breakfast", "Chop spinach fine and fold it into a thick besan batter. Thin batter cannot hold the leaves."],
    ["Bread upma", 20, ["bread", "onion", "tomato"], "breakfast", "Tear the bread, not cut it into neat cubes. Toss it through a cooked onion-tomato masala until it is hot and coated."],
    ["Potato sandwich", 20, ["bread", "potato", "onion"], "breakfast", "Mash boiled potato with raw onion, salt, and chili. Spread it thick and toast the sandwich in a little oil until the bread is crisp."],
    ["Tomato sandwich", 15, ["bread", "tomato", "onion"], "breakfast", "Slice, salt the tomato, and pat it dry or the bread goes soggy. Onion thin. Toast if you want it hot."],
    ["Paneer sandwich", 20, ["bread", "paneer", "onion"], "breakfast", "Crumble paneer with onion, salt, and chili. Spread thick and toast both sides."],
    ["Cheese toast", 10, ["bread", "cheese"], "breakfast", "Cover the bread edge to edge. Toast until the cheese melts and bubbles. A bare centre of bread tastes unfinished."],
    ["Curd sandwich", 15, ["bread", "curd", "onion"], "breakfast", "Hang the curd in a cloth for 15 minutes or whisk it thick. Thin curd soaks the bread."],
    ["Oats upma", 20, ["oats", "onion", "carrot"], "breakfast", "Roast the oats for 2 minutes, cook the onion and carrot, add water, then the oats. Cook until the water is gone and the oats are soft, about 5 minutes."],
    ["Banana oats", 10, ["oats", "banana", "milk"], "breakfast", "Cook oats in milk until thick, then mash in the banana off the heat. Banana boiled in the pot turns gluey."],
    ["Vermicelli upma", 20, ["vermicelli", "onion", "carrot"], "breakfast", "Roast the vermicelli in a little oil until it smells toasty and turns gold, then cook it with the onion and carrot and a measured cup of water."],
    ["Lemon vermicelli", 15, ["vermicelli", "lemon"], "breakfast", "Cook or soak the vermicelli until soft, drain, and add lemon off the heat with salt and chili."],
    ["Tomato pasta", 25, ["pasta", "tomato", "onion"], "pasta", "The tomato should cook down until it coats a spoon before the pasta goes in."],
    ["Spinach pasta", 20, ["pasta", "spinach", "garlic"], "pasta", "Wilt spinach with garlic, add a splash of pasta water, and toss. Do not boil the spinach."],
    ["Garlic pasta", 15, ["pasta", "garlic"], "pasta", "Garlic only until fragrant, pasta, a splash of pasta water, chili. This fails if the garlic browns."],
    ["Cheese pasta", 20, ["pasta", "cheese", "milk"], "pasta", "Melt cheese into warm milk off a hard boil, then toss with pasta. A rolling boil makes the cheese grainy."],
    ["Corn pasta", 20, ["pasta", "corn", "onion"], "pasta", "Brown the corn a little in the pan so it tastes roasted, then toss with pasta."],
    ["Mushroom pasta", 25, ["pasta", "mushroom", "garlic"], "pasta", "Brown the mushrooms until the pan is dry again, then garlic for 30 seconds, then pasta."],
    ["Veg noodles", 20, ["noodles", "cabbage", "carrot"], "pasta", "The vegetables should be in thin strips and still a little crisp. Noodles go in last and get tossed, not boiled again."],
    ["Garlic noodles", 15, ["noodles", "garlic"], "pasta", "Garlic sweet, not brown. Toss the noodles glossy with a spoon of their cooking water."],
    ["Cabbage noodles", 20, ["noodles", "cabbage", "onion"], "pasta", "Cook the cabbage until it sweetens and shrinks, then toss the noodles through."],
    ["Suji halwa", 25, ["suji", "milk"], "breakfast", "Roast suji in a spoon of oil until it smells of nuts and turns a shade darker. Add hot milk carefully; it splutters. Stir until it leaves the sides."],
    ["Vermicelli kheer", 25, ["vermicelli", "milk"], "drink", "Simmer vermicelli in milk on low, stirring, until the milk thickens and the vermicelli is soft. Do not walk away; milk boils over."],
    ["Rice kheer", 40, ["rice", "milk"], "drink", "Rinse a small handful of rice and simmer it in plenty of milk on the lowest heat, stirring often, until the rice is swollen and the milk is thick. This takes patience, about 35 minutes."],
    ["Banana shake", 5, ["banana", "milk"], "drink", "Ripe banana, cold milk, a pinch of salt. Mash or shake until mostly smooth. Drink immediately."],
    ["Sweet lassi", 5, ["curd", "milk"], "drink", "Whisk curd and milk until frothy. A pinch of salt. It should pour, not sit like yogurt."],
    ["Salty lassi", 5, ["curd"], "drink", "Beat curd with cold water, salt, and a pinch of cumin until it is thin and frothy. No milk."],
    ["Masala milk", 15, ["milk"], "drink", "Simmer milk with a pinch of turmeric and chili or black pepper if you like it savoury-warm. Watch the pot. Milk rises the moment it boils."],
    ["Banana curd", 5, ["banana", "curd"], "drink", "Chop ripe banana into thick curd, a pinch of salt. Do not blend it to nothing; a little texture is better."],
    ["Besan kadhi", 30, ["besan", "curd", "onion"], "gravy", "Whisk besan into curd until there are no lumps, add water, and simmer, stirring, until it thickens. A tadka of onion goes on at the end. If you stop stirring, it lumps."],
    ["Aloo tikki", 30, ["potato", "bread"], "breakfast", "Mash dry boiled potato, salt and chili, bind with a little soaked bread if it cracks, shape thick patties, and pan-fry until both sides are crusty."],
    ["Paneer tikki", 25, ["paneer", "potato"], "breakfast", "Equal parts crumbled paneer and mashed potato. Too much paneer and they fall apart. Fry until brown."],
    ["Stuffed capsicum", 35, ["capsicum", "potato", "onion"], "gravy", "Cut the tops off the capsicums, stuff with a dry potato-onion mash, and cook covered in a lightly oiled pan, turning, until the capsicum skin softens, about 20 minutes."],
    ["Palak pakora", 25, ["besan", "spinach"], "breakfast", "A thick besan batter, spinach leaves coated, fried in a shallow pool of oil until the coating is brown and crisp. Thin batter slides off."],
    ["Onion pakora", 25, ["besan", "onion"], "breakfast", "Slice onion, salt it, mix with besan and a splash of water only if needed. The onion's own water should make the batter. Fry until deep gold."],
    ["Bread pakora", 15, ["bread", "besan"], "breakfast", "Dip bread in a thin besan batter with salt and chili. Fry until the coating is lacy and brown."],
    ["Lauki kofta", 40, ["lauki", "besan", "onion", "tomato"], "gravy", "Grate lauki, squeeze it dry, mix with a little besan, salt, and chili, fry small balls, then simmer them briefly in onion-tomato gravy. A long simmer dissolves them."],
    ["Cabbage kofta", 40, ["cabbage", "besan", "onion", "tomato"], "gravy", "Grate the cabbage fine and squeeze it hard. Mix it with a little besan, salt, and chili, because a wet mix will not hold a ball."],
    ["Oats chilla", 20, ["oats", "onion", "curd"], "breakfast", "Grind or beat oats with curd and a little water into a thick batter, stir in onion, and cook as pancakes."],
    ["Cheese onion toast", 15, ["bread", "cheese", "onion"], "breakfast", "Very fine onion, squeezed dry, under the cheese. Toast until the cheese browns in spots."],
    ["Garlic bread", 15, ["bread", "garlic", "butter"], "breakfast", "Mash garlic into soft butter, spread it to the edges, and toast until the butter bubbles and the bread is crisp."],
    ["Lemon curd rice", 15, ["rice", "curd", "lemon"], "rice", "Fold the rice into the curd while the rice is warm, not hot, or the curd splits. Add the lemon at the end, off the heat."],

    ["Egg bhurji", 15, ["egg", "onion", "tomato"], "egg", "Cook onion and tomato until the tomato's water is gone, then the egg, stirred into soft curds. Stop while it is still shiny."],
    ["Masala omelette", 12, ["egg", "onion", "tomato"], "egg", "Beat onion and tomato into the egg. Cook without stirring, just until the bottom sets, and fold. The centre should be just set."],
    ["Bread omelette", 15, ["bread", "egg", "onion"], "egg", "Onion beaten into the egg, bread dipped both sides, fried until the coating is brown and no liquid egg remains."],
    ["Spinach omelette", 15, ["egg", "spinach", "onion"], "egg", "Wilt the spinach first and squeeze it. Raw spinach in the egg leaks water and the omelette never sets."],
    ["Tomato egg curry", 25, ["egg", "tomato", "onion"], "egg", "Boil the eggs, peel them, nick the whites, and simmer them in a finished onion-tomato gravy for 5 minutes so they take up the sauce."],
    ["Egg curry", 25, ["egg", "onion", "tomato"], "gravy", "The gravy is cooked fully before the peeled boiled eggs go in. Raw egg poached in this masala is a different dish and easy to overcook."],
    ["Potato egg", 25, ["egg", "potato", "onion"], "egg", "Potato cooked tender first, then beaten egg poured over and stirred until just set."],
    ["Capsicum egg", 15, ["egg", "capsicum", "onion"], "egg", "Capsicum cooked until it sweetens, about 4 minutes, then egg. You want soft strips, not blackened skin."],
    ["Egg fried rice", 25, ["egg", "rice", "onion"], "egg", "Scramble the egg and set it aside. Fry the rice with onion, then fold the egg back so it stays in pieces."],
    ["Egg pulao", 30, ["egg", "rice", "tomato"], "rice", "Boil and peel the eggs. Make tomato rice, then nestle the halved eggs in at the end to warm through."],
    ["Garlic eggs", 12, ["egg", "garlic"], "egg", "Garlic in the oil for 30 seconds, then the beaten egg. This is ruined by brown garlic."],
    ["Onion eggs", 15, ["egg", "onion"], "egg", "Slow onion, 6 minutes, until sweet, then egg scrambled through it."],
    ["Egg bhaji", 20, ["egg", "onion", "tomato"], "gravy", "A thicker, drier cousin of egg curry. Cook the masala until it holds a spoon, then add halved boiled eggs and coat them."],
    ["Anda ghotala", 20, ["egg", "onion", "bread"], "egg", "A soft scramble with onion, finished with torn bread folded through so it soaks the egg. Take it off while it is still custardy."],
    ["Boiled egg masala", 20, ["egg", "tomato", "garlic"], "gravy", "No onion. Garlic and tomato cooked to a paste, halved eggs warmed in it for 4 minutes."],
    ["Egg sandwich", 15, ["egg", "bread", "onion"], "egg", "Hard-boil the eggs, chop them, mix with onion, salt, and chili, and spread. The onion must be very fine."],
    ["Cheese omelette", 12, ["egg", "cheese"], "egg", "Cheese goes on after the bottom sets, then fold. Cheese beaten into the raw egg makes it watery."],
    ["Mushroom omelette", 15, ["egg", "mushroom", "onion"], "egg", "Brown the mushrooms until the pan is dry, then pour in the egg."],
    ["Spinach egg curry", 30, ["egg", "spinach", "onion"], "gravy", "Wilt and squeeze the spinach, simmer it with onion, add peeled eggs for 5 minutes."],
    ["Peas egg", 20, ["egg", "peas", "onion"], "egg", "Peas cooked tender, then egg scrambled through. Frozen peas need the water cooked off first."],

    ["Chicken curry", 40, ["chicken", "onion", "tomato"], "meat", "Brown the onion properly. Chicken simmered in pale onion tastes boiled, however long you cook it."],
    ["Chicken masala", 35, ["chicken", "onion", "tomato", "garlic"], "meat", "Garlic fried until sweet, tomato cooked until the oil splits, then chicken. This is a thicker masala than a soupy curry."],
    ["Garlic chicken", 30, ["chicken", "garlic"], "meat", "A dry dish. Lots of sliced garlic, fried gold, chicken cooked uncovered until the edges brown and the garlic is crisp in places."],
    ["Ginger chicken", 35, ["chicken", "ginger", "onion"], "meat", "Matchstick ginger fried until the edges curl, then onion, then chicken. The ginger should still be visible at the end."],
    ["Chicken fry", 30, ["chicken", "onion"], "meat", "Little water, lid off for the last 10 minutes, so the chicken fries in its own fat and the onion sticks to it."],
    ["Palak chicken", 40, ["chicken", "spinach", "onion"], "meat", "Wilt and chop the spinach. Simmer the chicken in onion first, then the spinach for 8 minutes so it stays green."],
    ["Peas chicken", 35, ["chicken", "peas", "onion"], "meat", "Chicken nearly done, then peas for 8 minutes. Do not add peas at the start."],
    ["Potato chicken", 45, ["chicken", "potato", "onion"], "meat", "Potato in large pieces so it does not vanish. Add it when the chicken has taken on colour, with a little water, and cook until both are tender."],
    ["Capsicum chicken", 30, ["chicken", "capsicum", "onion"], "meat", "A drier dish. Capsicum in big squares for the last 6 minutes."],
    ["Mushroom chicken", 35, ["chicken", "mushroom", "onion"], "meat", "Brown the mushrooms separately and add them at the end. Cooked with the chicken from the start, they go grey and watery."],
    ["Corn chicken", 35, ["chicken", "corn", "onion"], "meat", "Chicken simmered tender, corn stirred in for the last 5 minutes."],
    ["Tomato chicken", 35, ["chicken", "tomato", "garlic"], "meat", "No onion. The tomato must cook down to a thick paste before the chicken goes in, or the curry is watery and sharp."],
    ["Coconut chicken", 40, ["chicken", "coconut", "onion"], "meat", "Simmer the chicken in onion with a little water, then stir in coconut off a hard boil for the last 3 minutes."],
    ["Chicken pulao", 40, ["chicken", "rice", "onion"], "rice", "Brown the chicken with onion first, add water and rice, and cook covered like pulao. The chicken must be in small pieces or the rice is done first."],
    ["Chicken rice", 35, ["chicken", "rice", "tomato"], "rice", "Cook a thick tomato chicken, then fold through cooked rice rather than steaming them together. Easier to get both right."],
    ["Kadai chicken", 35, ["chicken", "capsicum", "onion", "tomato"], "meat", "High heat, less water, capsicum added near the end in large pieces. It should taste fried, not boiled."],
    ["Onion chicken", 30, ["chicken", "onion"], "meat", "Twice as much onion as you think. Cook it down until it is brown and sweet and clings to the chicken."],
    ["Methi chicken", 35, ["chicken", "methi", "onion"], "meat", "A small bunch of methi, chopped, added once the chicken is nearly done, cooked 5 minutes to soften the bitterness."],
    ["Cauliflower chicken", 40, ["chicken", "cauliflower", "onion"], "meat", "Brown the cauliflower first and set it aside. Return it for the last 10 minutes so it does not turn to paste."],
    ["Beans chicken", 35, ["chicken", "beans", "onion"], "meat", "Beans cut small, added when the chicken is halfway, so they finish tender not olive and limp."],
    ["Chicken sandwich", 20, ["chicken", "bread", "onion"], "meat", "Shred cooked chicken, mix with onion, salt, and chili, and toast it in the bread with a little oil."],
    ["Chicken pasta", 30, ["chicken", "pasta", "tomato"], "pasta", "Cook the chicken in small pieces until done and browned, make a thick tomato sauce in the same pan, then toss with pasta."],
    ["Ginger garlic chicken", 35, ["chicken", "ginger", "garlic"], "meat", "A dry fry. Ginger and garlic cooked until sweet, chicken cooked uncovered until browned. No tomato, no onion."],
    ["Lemon chicken", 30, ["chicken", "lemon", "garlic"], "meat", "Cook the chicken with garlic until done, then lemon off the heat so it stays bright."],

    ["Mutton curry", 70, ["mutton", "onion", "tomato"], "meat", "Mutton is not done when it looks brown. It is done when a piece falls apart under a spoon. Give it a low simmer and enough water, and do not rush it."],
    ["Mutton masala", 70, ["mutton", "onion", "tomato", "garlic"], "meat", "Same long cook as mutton curry, but the masala is cooked drier, until oil shows, before the water and meat go in."],
    ["Potato mutton", 75, ["mutton", "potato", "onion"], "meat", "Add potato only in the last 25 minutes. In from the start, it dissolves into the gravy."],
    ["Peas mutton", 70, ["mutton", "peas", "onion"], "meat", "Peas in the last 10 minutes, once the mutton is already tender."],
    ["Spinach mutton", 70, ["mutton", "spinach", "onion"], "meat", "Mutton cooked tender first. Spinach wilted, squeezed, and simmered in for 10 minutes."],
    ["Tomato mutton", 70, ["mutton", "tomato", "garlic"], "meat", "A sharper curry. Cook a large amount of tomato down with garlic until thick, then the long mutton simmer."],
    ["Garlic mutton", 65, ["mutton", "garlic", "onion"], "meat", "Brown a lot of sliced garlic with the onion. The long simmer turns it sweet."],
    ["Onion mutton", 70, ["mutton", "onion"], "meat", "Onion cooked to a deep brown paste, then mutton and water. No tomato."],
    ["Mutton pulao", 80, ["mutton", "rice", "onion"], "rice", "Cook the mutton until tender in plenty of water first. Use that stock, measured, to cook the rice. Raw mutton will not cook in the time rice needs."],
    ["Mutton rice", 75, ["mutton", "rice", "tomato"], "rice", "Make the mutton curry fully, then fold cooked rice through. Cooking rice on top of raw mutton undercooks the meat."],
    ["Ginger mutton", 70, ["mutton", "ginger", "onion"], "meat", "A heavy hand of ginger, fried first. It stands up to the long cook and still tastes sharp at the end."],
    ["Capsicum mutton", 70, ["mutton", "capsicum", "onion"], "meat", "Capsicum still goes in at the end, even in a long mutton dish, or it vanishes."],

    ["Fish curry", 25, ["fish", "onion", "tomato"], "meat", "Make the gravy first. Lay the fish in gently and do not stir. It is done when it flakes. Stirring breaks it to pieces."],
    ["Fish fry", 20, ["fish", "garlic"], "meat", "Pat the fish very dry, salt it, and fry in a single layer until the skin is crisp and the centre flakes. Turn once."],
    ["Tomato fish", 25, ["fish", "tomato", "garlic"], "meat", "A sharp, thick tomato gravy with garlic. Fish laid in for 8 to 10 minutes."],
    ["Coconut fish", 25, ["fish", "coconut", "onion"], "meat", "Simmer onion with a little water, add coconut, then the fish. Do not boil hard after the coconut goes in."],
    ["Garlic fish", 20, ["fish", "garlic", "lemon"], "meat", "Garlic in the oil, fish fried, lemon off the heat."],
    ["Potato fish", 30, ["fish", "potato", "onion"], "meat", "Cook the potato in the masala until tender, then add fish on top for 10 minutes. Do not stir the fish."],
    ["Spinach fish", 25, ["fish", "spinach", "onion"], "meat", "Wilt the spinach, then lay the fish on it, cover, and steam until the fish flakes."],
    ["Onion fish", 25, ["fish", "onion"], "meat", "Slow brown onion, fish on top, lid on for 10 minutes. A dry, sweet dish."],
    ["Fish masala", 25, ["fish", "onion", "tomato", "garlic"], "meat", "A thicker coat of masala than fish curry. Still, do not stir once the fish is in."],
    ["Lemon fish", 20, ["fish", "lemon", "garlic"], "meat", "Fry or steam the fish with garlic. Lemon juice after the heat is off."],
    ["Capsicum fish", 25, ["fish", "capsicum", "onion"], "meat", "Capsicum cooked with onion until soft, fish laid on top to steam."],
    ["Fish rice", 30, ["fish", "rice", "onion"], "rice", "Cook the fish separately until it flakes, bone it if you can, and fold it through onion rice at the end."],

    ["Prawn curry", 25, ["prawns", "onion", "tomato"], "meat", "The gravy is finished before the prawns go in. They only need a few minutes. Pink and curled means stop."],
    ["Prawn masala", 20, ["prawns", "onion", "tomato", "garlic"], "meat", "A drier masala. Prawns added at the end and tossed until they curl. Extra minutes make them rubber."],
    ["Garlic prawns", 15, ["prawns", "garlic"], "meat", "Hot pan, garlic 30 seconds, prawns in one layer, done when pink. Do not crowd them."],
    ["Coconut prawns", 20, ["prawns", "coconut", "onion"], "meat", "Onion cooked soft, coconut stirred in, prawns for 4 minutes off a hard boil."],
    ["Tomato prawns", 20, ["prawns", "tomato", "garlic"], "meat", "Tomato cooked to a thick paste with garlic, prawns folded through until just pink."],
    ["Onion prawns", 20, ["prawns", "onion"], "meat", "A pile of slow onion, prawns at the end. The onion should be sweet and brown."],
    ["Prawn pulao", 30, ["prawns", "rice", "onion"], "rice", "Cook the rice. Sear the prawns separately with onion until just pink, then fold them through so they do not overcook in the steam."],
    ["Prawn rice", 30, ["prawns", "rice", "tomato"], "rice", "A quick tomato prawn masala, folded through hot rice."],
    ["Capsicum prawns", 20, ["prawns", "capsicum", "onion"], "meat", "High heat. Capsicum and onion, then prawns for the last 4 minutes."],
    ["Spinach prawns", 20, ["prawns", "spinach", "garlic"], "meat", "Wilt and squeeze the spinach with garlic, then prawns for 4 minutes."],
    ["Ginger prawns", 15, ["prawns", "ginger", "garlic"], "meat", "Ginger and garlic fried until sweet, prawns in, done when they curl."],
    ["Prawn fry", 15, ["prawns", "garlic", "lemon"], "meat", "Dry fry with garlic. Lemon after the pan comes off the heat."]
  ];

  // Dishes people search for and cook at home. Same writers, keywords, and meal rules as the book above.
  const popular = [
    ["Chicken biryani", 50, ["chicken", "rice", "onion", "curd"], "rice", "Marinate the chicken in curd, cook it with onion until the centre is done, then layer it with the rice and steam on low heat."],
    ["Mutton biryani", 60, ["mutton", "rice", "onion", "curd"], "rice", "Cook the mutton in curd and onion until it pulls apart, then layer it with the rice and steam until the grains are separate."],
    ["Vegetable biryani", 40, ["rice", "potato", "peas", "carrot", "onion"], "rice", "Cook the potato, peas, and carrot with onion until tender, then layer them through the rice and steam."],
    ["Paneer biryani", 40, ["paneer", "rice", "peas", "onion"], "rice", "Brown the paneer, cook the peas and onion, then fold both through the rice and steam for a few minutes."],
    ["Egg biryani", 35, ["egg", "rice", "onion", "tomato"], "rice", "Boil the eggs, simmer them in onion and tomato, then layer them through the rice."],
    ["Prawn biryani", 35, ["prawns", "rice", "onion"], "rice", "Sear the prawns with onion until they turn pink, then fold them through the rice at the end so they stay tender."],
    ["Fish biryani", 35, ["fish", "rice", "onion", "tomato"], "rice", "Cook the fish with onion and tomato until it flakes, then fold it through the rice in large pieces."],
    ["Khichdi", 30, ["rice", "lentils"], "rice", "Rinse the rice and lentils together and cook them soft in one pot. Khichdi should be loose enough to eat with a spoon."],
    ["Masala khichdi", 35, ["rice", "lentils", "onion", "tomato"], "rice", "Cook onion and tomato first, then simmer the rice and lentils in that masala until both are soft."],
    ["Veg khichdi", 35, ["rice", "lentils", "carrot", "peas"], "rice", "Add the carrot and peas once the rice and lentils have started to soften, so the vegetables stay bright."],
    ["Pongal", 30, ["rice", "lentils"], "rice", "Cook the rice and lentils very soft, then finish with a cumin tadka. Pongal should be creamy, almost pourable."],
    ["Bisi bele bath", 40, ["rice", "lentils", "carrot", "beans"], "rice", "Cook the lentils soft, then simmer the rice, carrot, and beans in that dal until the grains break a little."],
    ["Tawa pulao", 25, ["rice", "onion", "tomato", "capsicum", "peas"], "rice", "Use cooked rice. Fry onion, tomato, capsicum, and peas on a hot tawa, then toss the rice through until every grain is coated."],
    ["Veg fried rice", 20, ["rice", "carrot", "peas", "capsicum"], "rice", "Use cold cooked rice. Fry the carrot, peas, and capsicum on high heat, then toss the rice through for 2 minutes."],
    ["Chicken fried rice", 25, ["chicken", "rice", "onion", "capsicum"], "rice", "Sear the chicken and set it aside. Fry the onion and capsicum, then toss the cooked rice and chicken together."],
    ["Paneer fried rice", 20, ["paneer", "rice", "onion", "capsicum"], "rice", "Brown the paneer, fry the onion and capsicum, then toss cold cooked rice through until it is hot."],
    ["Butter rice", 20, ["rice", "butter"], "rice", "Melt the butter until it smells nutty, then fold it through hot cooked rice with salt."],

    ["Paneer butter masala", 30, ["paneer", "butter", "tomato", "onion"], "gravy", "Cook the onion and tomato in butter until the masala is thick and glossy, then slide the paneer in and simmer for 5 minutes."],
    ["Shahi paneer", 30, ["paneer", "curd", "onion", "tomato"], "gravy", "Whisk the curd smooth and stir it in off a hard boil, after the onion and tomato have turned into a paste."],
    ["Paneer tikka masala", 30, ["paneer", "onion", "tomato", "capsicum", "curd"], "gravy", "Brown the paneer with capsicum, then simmer it in onion, tomato, and curd until the gravy coats a spoon."],
    ["Paneer tikka", 25, ["paneer", "curd", "capsicum", "onion"], "dry", "Coat the paneer in curd and roast it with capsicum and onion until the edges char and the centre stays soft."],
    ["Chilli paneer", 20, ["paneer", "capsicum", "onion", "garlic"], "dry", "Fry the paneer until the faces are golden, then toss it on high heat with garlic, onion, and capsicum."],
    ["Paneer do pyaza", 25, ["paneer", "onion", "tomato"], "gravy", "Use plenty of onion and cook it until sweet and brown before the paneer goes in."],
    ["Paneer korma", 30, ["paneer", "curd", "onion"], "gravy", "Cook the onion until pale and sweet, then stir in beaten curd and the paneer and simmer gently."],
    ["Methi malai paneer", 30, ["paneer", "methi", "milk", "onion"], "gravy", "Fry the methi for 2 minutes to soften its bite, then simmer the paneer in milk and onion."],
    ["Malai kofta", 40, ["paneer", "potato", "onion", "tomato"], "gravy", "Mash paneer and potato into balls, brown them, and simmer the balls in onion and tomato gravy for 5 minutes."],

    ["Dal makhani", 50, ["lentils", "rajma", "butter", "tomato"], "dal", "Cook the lentils and rajma until they are completely soft, then simmer them in butter and tomato until the dal turns glossy."],
    ["Sambar", 40, ["lentils", "tomato", "onion", "carrot"], "dal", "Cook the lentils soft, then simmer the carrot, onion, and tomato in the dal until the carrot yields to a spoon."],
    ["Tomato rasam", 20, ["tomato", "lentils"], "dal", "Crush the tomato and simmer it with a little cooked dal until the rasam smells sharp and the surface shows tiny bubbles."],
    ["Moong dal", 25, ["lentils", "ginger"], "dal", "Cook the lentils until they collapse, then finish with ginger fried in the tadka."],
    ["Masoor dal", 30, ["lentils", "onion", "tomato"], "dal", "Masoor cooks quickly. Simmer until the lentils break, then pour on an onion and tomato tadka."],
    ["Chana dal", 40, ["lentils", "onion", "tomato"], "dal", "Chana dal should stay a little whole. Stop cooking when a lentil is soft but still holds its shape."],
    ["Pakora kadhi", 30, ["besan", "curd", "onion"], "gravy", "Whisk besan into curd until the batter is smooth, simmer until it thickens, and add fried onion at the end."],

    ["Butter chicken", 40, ["chicken", "butter", "tomato", "curd"], "meat", "Brown the chicken, then simmer it in butter, tomato, and curd until the gravy is thick and the centre of the chicken is cooked."],
    ["Chicken tikka masala", 40, ["chicken", "tomato", "onion", "curd"], "meat", "Cook onion and tomato to a paste, stir in curd, and simmer the chicken until the juices at a cut run clear."],
    ["Chicken tikka", 30, ["chicken", "curd", "capsicum", "onion"], "dry", "Coat the chicken in curd and cook it with capsicum and onion until the edges char and the centre is opaque."],
    ["Tandoori chicken", 35, ["chicken", "curd", "lemon", "garlic"], "dry", "Marinate the chicken in curd, lemon, and garlic, then roast it until the surface is spotted dark and the meat is cooked through."],
    ["Chicken korma", 40, ["chicken", "curd", "onion"], "meat", "Cook the onion until sweet and pale, add the chicken, then stir in curd and simmer on low heat."],
    ["Chicken chettinad", 40, ["chicken", "coconut", "onion", "tomato"], "meat", "Fry onion and tomato with coconut until the masala smells toasted, then simmer the chicken in it."],
    ["Chicken do pyaza", 35, ["chicken", "onion", "tomato"], "meat", "Cook a large quantity of onion until brown and sweet, then simmer the chicken in that onion and tomato."],
    ["Chicken pakora", 25, ["chicken", "besan"], "dry", "Coat small pieces of chicken in a thick besan batter and fry until the coating is crisp and the meat is cooked through."],
    ["Chicken 65", 30, ["chicken", "curd", "garlic"], "dry", "Marinate the chicken in curd, fry it until crisp, then toss it with fried garlic."],
    ["Chilli chicken", 25, ["chicken", "capsicum", "onion", "garlic"], "dry", "Fry the chicken, then toss it on high heat with garlic, onion, and capsicum for 2 minutes."],
    ["Chicken manchurian", 30, ["chicken", "onion", "garlic", "capsicum"], "dry", "Fry the chicken until browned, then simmer it briefly with garlic, onion, and capsicum so a light sauce clings to it."],
    ["Kerala chicken stew", 40, ["chicken", "potato", "carrot", "coconut"], "meat", "Simmer the chicken with potato and carrot in coconut until the vegetables are tender and the chicken is cooked through."],
    ["Chicken soup", 30, ["chicken", "onion", "carrot", "garlic"], "gravy", "Simmer the chicken with onion, carrot, and garlic until the meat is tender, then shred it back into the broth."],
    ["Chicken fried noodles", 25, ["chicken", "noodles", "onion", "capsicum"], "pasta", "Sear the chicken, fry the onion and capsicum, then toss boiled noodles through on high heat."],
    ["Chicken kathi roll", 25, ["atta", "chicken", "onion", "capsicum"], "paratha", "Cook the chicken with onion and capsicum, then roll it inside a warm paratha."],

    ["Mutton rogan josh", 60, ["mutton", "onion", "curd", "tomato"], "meat", "Brown the onion, add the mutton, then simmer it in curd and tomato until the meat pulls apart with a spoon."],
    ["Mutton korma", 60, ["mutton", "curd", "onion"], "meat", "Cook the onion until sweet, add the mutton, and simmer in curd on low heat until the meat is tender."],
    ["Keema matar", 40, ["mutton", "peas", "onion", "tomato"], "meat", "Cook the minced mutton with onion and tomato until the raw smell is gone, then add the peas for the last 8 minutes."],
    ["Mutton do pyaza", 55, ["mutton", "onion", "tomato"], "meat", "Use a large amount of onion and cook it brown before the long mutton simmer."],
    ["Kosha mutton", 60, ["mutton", "onion", "potato"], "meat", "Brown the mutton and onion until the masala is dark and thick, and cook the potato in the same pot until soft."],

    ["Goan fish curry", 30, ["fish", "coconut", "onion", "tomato"], "meat", "Simmer onion, tomato, and coconut into a gravy first, then lay the fish in and cook only until it flakes."],
    ["Malabar fish curry", 30, ["fish", "coconut", "onion"], "meat", "Cook the onion in coconut until soft, then add the fish and stop as soon as it turns opaque."],
    ["Fish tikka", 25, ["fish", "curd", "lemon"], "dry", "Coat the fish in curd and lemon and cook it until the surface colours and the flesh flakes."],
    ["Fish pakora", 20, ["fish", "besan"], "dry", "Pat the fish dry, dip it in thick besan batter, and fry until the coating is crisp and the fish is opaque."],
    ["Fish jhol", 30, ["fish", "potato", "tomato", "onion"], "meat", "Cook the potato in onion and tomato until nearly tender, then lay the fish on top and simmer until it flakes."],
    ["Prawn malai curry", 25, ["prawns", "coconut", "onion", "tomato"], "meat", "Finish the onion, tomato, and coconut gravy first. The prawns only need a few minutes, until they curl and turn pink."],

    ["Dosa", 30, ["rice", "lentils"], "breakfast", "Soak the rice and lentils, grind them smooth, and spread a ladle of batter thin on a hot pan until the underside is crisp and lacy."],
    ["Masala dosa", 40, ["rice", "lentils", "potato", "onion"], "breakfast", "Spread the dosa thin and crisp, then fill it with potato and onion that have been cooked soft and spiced."],
    ["Idli", 30, ["rice", "lentils", "curd"], "breakfast", "Grind soaked rice and lentils with a little curd and steam the batter until a skewer comes out clean."],
    ["Uttapam", 30, ["rice", "lentils", "onion", "tomato"], "breakfast", "Pour a thicker round than a dosa and press onion and tomato into the top. Cook until the base is golden."],
    ["Rava idli", 25, ["suji", "curd"], "breakfast", "Whisk suji into curd and steam it until the idli springs back when pressed."],
    ["Onion rava dosa", 20, ["suji", "onion"], "breakfast", "Pour a thin suji batter with onion onto a hot pan and cook until the edges turn lacy and crisp."],
    ["Adai", 30, ["lentils", "rice", "onion"], "breakfast", "Grind the lentils and rice to a coarse batter, stir in onion, and cook thick rounds until both sides are spotted brown."],
    ["Pesarattu", 20, ["lentils", "onion"], "breakfast", "Grind soaked green lentils with onion and spread the batter thin. Cook until the surface looks dry and the edges lift."],
    ["Masala poha", 15, ["poha", "onion", "potato", "peanuts"], "breakfast", "Cook the potato and onion first, fold in rinsed poha, and finish with roasted peanuts."],
    ["Masala oats", 15, ["oats", "onion", "tomato"], "breakfast", "Cook the onion and tomato, then stir the oats in with a little water until they turn creamy."],
    ["Tomato chilla", 15, ["besan", "tomato", "onion"], "breakfast", "Whisk besan with chopped tomato and onion into a batter and cook small rounds until both sides are golden."],
    ["Aloo poori", 30, ["potato", "atta", "onion"], "paratha", "Cook the potato and onion into a dry bhaji, and fry small rounds of dough until they puff."],
    ["Ghugni", 30, ["chickpeas", "potato", "onion"], "gravy", "Simmer cooked chickpeas with potato and onion until the potato is soft and the gravy is thick."],

    ["Samosa", 40, ["atta", "potato", "peas"], "paratha", "Mash the potato with peas, seal it in dough triangles, and fry until the pastry is deep gold and crisp."],
    ["Aloo pakora", 20, ["potato", "besan"], "dry", "Slice the potato thin, coat it in thick besan batter, and fry until the coating is crisp and the potato is cooked."],
    ["Paneer pakora", 20, ["paneer", "besan"], "dry", "Coat paneer slices in thick besan batter and fry until the crust is golden and the paneer is hot."],
    ["Batata vada", 30, ["potato", "besan", "onion"], "dry", "Mash the potato with onion, wrap balls of it in besan batter, and fry until the crust is crisp."],
    ["Vada pav", 30, ["potato", "bread", "besan"], "dry", "Fry a spiced potato ball in besan batter and tuck it into a soft bread roll."],
    ["Medu vada", 30, ["lentils", "onion"], "breakfast", "Grind soaked lentils with onion to a fluffy batter, shape rings, and fry until they are golden and crisp outside."],
    ["Dhokla", 25, ["besan", "curd"], "breakfast", "Whisk besan with curd and steam it until a skewer comes out clean. The crumb should be spongy."],
    ["Khandvi", 30, ["besan", "curd"], "breakfast", "Cook besan and curd into a smooth paste, spread it thin, and roll it while it is still warm."],
    ["Handvo", 40, ["lauki", "rice", "lentils", "curd"], "breakfast", "Grate the lauki, squeeze it, and fold it into a rice and lentil batter with curd. Bake or pan-cook until the crust is brown."],
    ["Pav bhaji", 35, ["potato", "tomato", "onion", "peas", "butter", "capsicum"], "gravy", "Mash potato, peas, tomato, onion, and capsicum together in butter until the bhaji is thick enough to spread."],
    ["Misal pav", 30, ["sprouts", "onion", "tomato", "bread"], "gravy", "Simmer the sprouts in onion and tomato until they are soft, and serve the curry with bread."],
    ["Ragda pattice", 35, ["chickpeas", "potato", "onion"], "gravy", "Mash potato into cakes and pan-cook them, then spoon a chickpea and onion curry over the top."],
    ["Chana chaat", 15, ["chickpeas", "onion", "tomato", "lemon"], "salad", "Toss cooked chickpeas with onion, tomato, and lemon just before eating so the chaat stays crisp."],
    ["Aloo chaat", 20, ["potato", "onion", "tomato", "lemon"], "salad", "Boil the potato, cut it, and toss it with onion, tomato, and lemon while it is still warm."],
    ["Samosa chaat", 20, ["potato", "chickpeas", "curd", "onion"], "salad", "Break a potato samosa, spoon chickpeas and onion over it, and finish with beaten curd."],
    ["Bhel poha", 15, ["poha", "onion", "tomato", "peanuts"], "salad", "Toss dry poha with onion, tomato, and peanuts just before eating so it stays crisp."],
    ["Veg cutlet", 30, ["potato", "peas", "carrot"], "dry", "Mash boiled potato with peas and carrot, shape cakes, and pan-cook until both sides are brown."],
    ["Aloo tikki burger", 25, ["potato", "bread", "onion"], "dry", "Pan-cook a potato tikki and tuck it into bread with raw onion."],
    ["Paneer kathi roll", 25, ["atta", "paneer", "onion", "capsicum"], "paratha", "Cook the paneer with onion and capsicum, then roll it inside a warm paratha."],
    ["Egg roll", 20, ["atta", "egg", "onion"], "paratha", "Cook the egg with onion on a warm paratha and roll it while the egg is just set."],
    ["Cheese chilli toast", 15, ["bread", "cheese", "capsicum"], "breakfast", "Cover the bread with cheese and capsicum and toast until the cheese melts and bubbles."],
    ["Grilled veg sandwich", 15, ["bread", "onion", "tomato", "capsicum"], "breakfast", "Layer onion, tomato, and capsicum in the bread and toast both sides until the bread is crisp."],

    ["Gobi manchurian", 25, ["cauliflower", "onion", "capsicum", "garlic"], "dry", "Fry the cauliflower until the edges brown, then toss it with garlic, onion, and capsicum."],
    ["Veg manchurian", 25, ["cabbage", "carrot", "onion", "garlic"], "dry", "Bind grated cabbage and carrot into balls, fry them, then toss with garlic and onion."],
    ["Gobi 65", 25, ["cauliflower", "curd", "garlic"], "dry", "Coat the cauliflower in curd, fry until crisp, and toss with fried garlic."],
    ["Paneer 65", 20, ["paneer", "curd", "capsicum"], "dry", "Coat the paneer in curd, fry the slices, and toss them with capsicum."],
    ["Chilli potato", 25, ["potato", "capsicum", "onion"], "dry", "Fry the potato until crisp, then toss it on high heat with onion and capsicum."],
    ["Chilli mushroom", 20, ["mushroom", "capsicum", "onion", "garlic"], "dry", "Fry the mushrooms until they stop releasing water, then toss with garlic, onion, and capsicum."],
    ["Crispy corn", 20, ["corn", "capsicum", "onion"], "dry", "Fry the corn until some kernels blister, then toss with onion and capsicum."],
    ["Hakka noodles", 20, ["noodles", "onion", "capsicum", "carrot"], "pasta", "Boil the noodles, then toss them on high heat with onion, capsicum, and carrot so they char in spots."],
    ["Egg noodles", 20, ["egg", "noodles", "onion"], "pasta", "Scramble the egg and set it aside, toss the noodles with onion, then fold the egg back in."],
    ["White sauce pasta", 25, ["pasta", "milk", "butter", "cheese"], "pasta", "Melt the butter, stir in the milk, and fold the boiled pasta and cheese through until the sauce clings."],
    ["Mac and cheese", 20, ["pasta", "cheese", "milk"], "pasta", "Boil the pasta, then fold it with cheese and a splash of milk until the cheese melts and coats every piece."],
    ["Tomato soup", 25, ["tomato", "onion", "garlic"], "gravy", "Cook the tomato, onion, and garlic until soft, then mash the soup until it is smooth."],
    ["Sweet corn soup", 20, ["corn", "onion", "garlic"], "gravy", "Simmer the corn with onion and garlic, and mash a few spoons of corn so the soup turns thick."],

    ["Chole bhature", 45, ["chickpeas", "atta", "onion", "tomato"], "gravy", "Simmer the chickpeas in onion and tomato until thick, and fry rounds of dough until they puff."],
    ["Aloo chole", 40, ["chickpeas", "potato", "onion", "tomato"], "gravy", "Cook the potato in the chickpea masala until a piece yields to a spoon."],
    ["Mixed vegetable", 30, ["potato", "peas", "carrot", "beans"], "dry", "Start the potato and beans first, then add the carrot and peas so everything finishes tender together."],
    ["Veg korma", 35, ["carrot", "peas", "potato", "curd"], "gravy", "Cook the vegetables until nearly tender, then stir in beaten curd and simmer gently."],
    ["Kadai vegetable", 30, ["capsicum", "onion", "tomato", "peas"], "dry", "Cook onion and tomato down, then toss capsicum and peas through on high heat so the capsicum stays a little crisp."],
    ["Bhindi do pyaza", 25, ["okra", "onion"], "dry", "Cook a large amount of onion until sweet, then add dry okra and cook uncovered so it stays free of slime."],
    ["Kashmiri dum aloo", 40, ["potato", "curd", "onion"], "gravy", "Fry the potatoes until the skins blister, then simmer them in onion and curd until the gravy is thick."],
    ["Kadai mushroom", 25, ["mushroom", "capsicum", "onion", "tomato"], "dry", "Fry the mushrooms until dry, then toss with capsicum, onion, and tomato on high heat."],
    ["Avial", 30, ["carrot", "beans", "pumpkin", "coconut", "curd"], "gravy", "Cook the carrot, beans, and pumpkin until just tender, then stir in coconut and curd off a hard boil."],
    ["Vegetable stew", 30, ["potato", "carrot", "beans", "coconut"], "gravy", "Simmer the potato, carrot, and beans in coconut until every piece yields to a spoon."],
    ["Egg devil", 25, ["egg", "potato", "bread"], "dry", "Wrap a boiled egg in mashed potato, coat it with bread crumbs if you have them, and pan-cook until brown. The potato covering should be cooked through."],

    ["Gajar ka halwa", 40, ["carrot", "milk"], "gravy", "Grate the carrot and cook it in milk, stirring, until the milk disappears and the carrot turns glossy."],
    ["Moong dal halwa", 40, ["lentils", "butter", "milk"], "gravy", "Cook the ground lentils in butter until they smell toasted, then stir in milk a little at a time."],
    ["Besan ladoo", 25, ["besan", "butter"], "dry", "Roast the besan in butter until it smells like nuts, then shape warm handfuls into balls."],
    ["Coconut ladoo", 20, ["coconut", "milk"], "dry", "Cook the coconut in a little milk until the mixture holds together, then shape it into balls while warm."],
    ["Mishti doi", 15, ["curd", "milk"], "drink", "Warm the milk, stir in the curd, and let it set until the surface is firm and the centre wobbles."],
    ["Masala chaas", 10, ["curd", "cumin"], "drink", "Whisk the curd with water and toasted cumin until it is thin enough to drink."],

    ["Onion raita", 10, ["curd", "onion"], "salad", "Beat the curd smooth and stir in finely cut onion just before serving."],
    ["Palak raita", 10, ["curd", "spinach"], "salad", "Wilt the spinach, squeeze it dry, chop it, and fold it into beaten curd."],
    ["Cumin raita", 10, ["curd", "cumin"], "salad", "Toast the cumin until it smells nutty, then stir it into beaten curd."],
    ["Kachumber", 10, ["onion", "tomato", "carrot", "lemon"], "salad", "Cut the onion, tomato, and carrot small and toss with lemon and salt just before the meal."]
  ];

  const street = [
    [
      "Jhal muri",
      15,
      [
        "puffedrice",
        "onion",
        "potato",
        "tomato",
        "peanuts",
        "lemon",
        "coconut"
      ],
      "salad",
      "Toss puffed rice with boiled potato, onion, tomato, peanuts, and coconut. Lemon goes on last. Eat it at once or the puffed rice turns soft."
    ],
    [
      "Churumuri",
      15,
      [
        "puffedrice",
        "onion",
        "tomato",
        "carrot",
        "lemon",
        "coconut"
      ],
      "salad",
      "Mysore style. Keep the carrot raw and fine. Toss the puffed rice only when you are ready to eat."
    ],
    [
      "Puchka",
      40,
      [
        "atta",
        "potato",
        "chickpeas",
        "onion",
        "lemon"
      ],
      "paratha",
      "Roll the dough into bite-size discs and fry them until they puff. Crack a hole, fill with mashed potato and chickpeas, and finish with lemon water."
    ],
    [
      "Golgappa",
      40,
      [
        "atta",
        "potato",
        "lemon",
        "onion"
      ],
      "paratha",
      "The puri must be thin enough to shatter. Fill it with potato and onion and eat it before the shell softens."
    ],
    [
      "Dahi vada",
      30,
      [
        "lentils",
        "onion",
        "curd"
      ],
      "breakfast",
      "Grind soaked lentils with onion, fry small rounds until golden, dip them in water, squeeze, and cover with beaten curd."
    ],
    [
      "Papdi chaat",
      25,
      [
        "atta",
        "potato",
        "chickpeas",
        "onion",
        "curd"
      ],
      "breakfast",
      "Fry small crisp discs of dough. Top them with potato, chickpeas, onion, and thick curd just before serving."
    ],
    [
      "Masala puri chaat",
      30,
      [
        "atta",
        "peas",
        "onion",
        "tomato"
      ],
      "gravy",
      "Bengaluru style. Break crisp puris into a thin peas gravy so they stay a little crunchy."
    ],
    [
      "Dabeli",
      25,
      [
        "potato",
        "peanuts",
        "onion",
        "bread",
        "lemon"
      ],
      "breakfast",
      "Mash the potato with peanuts, raw onion, and lemon, and pack it into a toasted bread roll."
    ],
    [
      "Dal kachori",
      40,
      [
        "atta",
        "lentils",
        "onion"
      ],
      "paratha",
      "Cook the lentils dry with onion, seal a spoonful in dough, and fry until the crust blisters."
    ],
    [
      "Banana bajji",
      20,
      [
        "banana",
        "besan"
      ],
      "dry",
      "Use ripe but firm banana. Dip thick slices in a stiff besan batter and fry until the coating is deep gold."
    ],
    [
      "Egg chaat",
      15,
      [
        "egg",
        "onion",
        "tomato",
        "lemon"
      ],
      "salad",
      "Halve boiled eggs and toss them with onion, tomato, and lemon. Do not cook it again."
    ],
    [
      "Peanut chaat",
      15,
      [
        "peanuts",
        "onion",
        "tomato",
        "lemon"
      ],
      "salad",
      "Roast the peanuts until they smell sweet, then toss them with raw onion, tomato, and lemon."
    ],
    [
      "Sprouts chaat",
      15,
      [
        "sprouts",
        "onion",
        "tomato",
        "lemon"
      ],
      "salad",
      "Use crunchy sprouts. Toss with onion, tomato, and lemon and eat the same hour."
    ],
    [
      "Keema pav",
      35,
      [
        "mutton",
        "onion",
        "tomato",
        "bread"
      ],
      "meat",
      "Cook the minced mutton with onion and tomato until the pan is dry, then tuck it into toasted bread."
    ],
    [
      "Corn chaat",
      15,
      [
        "corn",
        "onion",
        "tomato",
        "lemon"
      ],
      "salad",
      "Boil the corn, drain it well, and toss with raw onion, tomato, and lemon."
    ],
    [
      "Aloo bonda",
      25,
      [
        "potato",
        "besan",
        "onion"
      ],
      "dry",
      "Mash the potato with onion, wrap balls in thick besan batter, and fry until the crust is crisp."
    ],
    [
      "Sev puri chaat",
      20,
      [
        "besan",
        "potato",
        "onion",
        "tomato"
      ],
      "breakfast",
      "Fry a thin besan batter into crisp sev. Pile it on potato, onion, and tomato and eat at once."
    ],
    [
      "Potato bread roll",
      30,
      [
        "bread",
        "potato",
        "onion"
      ],
      "dry",
      "Flatten a slice of bread, roll mashed potato and onion inside, and pan-cook until the outside is crisp."
    ],
    [
      "Paneer bread roll",
      25,
      [
        "bread",
        "paneer",
        "onion"
      ],
      "dry",
      "Crumble paneer with onion, roll it in bread, and pan-cook until the bread is brown and the filling is hot."
    ],
    [
      "Chicken pav",
      30,
      [
        "chicken",
        "onion",
        "tomato",
        "bread"
      ],
      "meat",
      "Cook the chicken in onion and tomato until the gravy clings, then serve it in a soft bread roll."
    ],
    [
      "Egg pav",
      20,
      [
        "egg",
        "onion",
        "tomato",
        "bread"
      ],
      "egg",
      "Scramble the egg with onion and tomato until just set, and spoon it into a toasted roll."
    ],
    [
      "Rajma chaat",
      20,
      [
        "rajma",
        "onion",
        "tomato",
        "lemon"
      ],
      "salad",
      "Use cooked rajma, cooled. Toss with onion, tomato, and lemon. Do not heat it."
    ],
    [
      "Paneer chaat",
      15,
      [
        "paneer",
        "onion",
        "tomato",
        "lemon"
      ],
      "salad",
      "Cube the paneer and toss it with onion, tomato, and lemon. Warm paneer weeps, so keep it cool."
    ],
    [
      "Sweet potato chaat",
      20,
      [
        "sweetpotato",
        "onion",
        "lemon"
      ],
      "salad",
      "Boil the sweet potato, cube it, and toss with raw onion and lemon while it is still warm."
    ],
    [
      "Capsicum chaat",
      15,
      [
        "capsicum",
        "onion",
        "tomato",
        "lemon"
      ],
      "salad",
      "Cut the capsicum small and raw. Toss with onion, tomato, and lemon."
    ],
    [
      "Cabbage pakora",
      25,
      [
        "cabbage",
        "besan"
      ],
      "dry",
      "Shred the cabbage fine and fold it into a thick besan batter. Fry spoonfuls until the edges are lacy and brown."
    ],
    [
      "Cauliflower pakora",
      25,
      [
        "cauliflower",
        "besan"
      ],
      "dry",
      "Use small florets. Coat them in thick besan batter and fry until the stem is tender and the crust is crisp."
    ],
    [
      "Corn pakora",
      20,
      [
        "corn",
        "besan",
        "onion"
      ],
      "dry",
      "Fold corn and onion into a stiff besan batter and fry small cakes until both sides are brown."
    ],
    [
      "Methi pakora",
      25,
      [
        "methi",
        "besan",
        "onion"
      ],
      "dry",
      "Chop the methi fine, mix it with besan and onion, and fry until the leaves turn crisp, not black."
    ],
    [
      "Lauki pakora",
      25,
      [
        "lauki",
        "besan"
      ],
      "dry",
      "Grate the lauki and squeeze it hard. Mix with besan and fry until the centre is cooked and the outside is brown."
    ],
    [
      "Potato peas tikki",
      30,
      [
        "potato",
        "peas"
      ],
      "dry",
      "Mash boiled potato with cooked peas, shape thick cakes, and pan-cook until both sides have a crust."
    ],
    [
      "Corn tikki",
      25,
      [
        "corn",
        "potato",
        "onion"
      ],
      "dry",
      "Mash potato with corn and onion. The cakes should be dry enough to hold, then fry until brown."
    ],
    [
      "Prawn pakora",
      20,
      [
        "prawns",
        "besan"
      ],
      "dry",
      "Pat the prawns dry, dip them in thick besan batter, and fry only until they curl and the coating is gold."
    ],
    [
      "Egg pakora",
      20,
      [
        "egg",
        "besan",
        "onion"
      ],
      "dry",
      "Slice boiled eggs, coat them in besan batter with onion, and fry until the crust is crisp."
    ],
    [
      "Mutton tikki",
      30,
      [
        "mutton",
        "potato",
        "onion"
      ],
      "dry",
      "Cook the minced mutton with onion until dry, mix with mashed potato, and pan-cook thick cakes until brown."
    ],
    [
      "Onion tomato chaat",
      10,
      [
        "onion",
        "tomato",
        "lemon",
        "peanuts"
      ],
      "salad",
      "A raw chaat. Fine onion, tomato, roasted peanuts, and lemon. Salt at the last minute."
    ],
    [
      "Bread chaat",
      15,
      [
        "bread",
        "onion",
        "tomato",
        "lemon"
      ],
      "salad",
      "Toast the bread, break it into pieces, and toss with onion, tomato, and lemon so it stays crisp."
    ],
    [
      "Mushroom chaat",
      15,
      [
        "mushroom",
        "onion",
        "tomato",
        "lemon"
      ],
      "salad",
      "Boil or steam the mushrooms, drain them well, and toss with onion, tomato, and lemon."
    ],
    [
      "Banana peanut chaat",
      10,
      [
        "banana",
        "peanuts",
        "lemon"
      ],
      "salad",
      "Slice ripe banana, add roasted peanuts and lemon, and eat it straight away."
    ],
    [
      "Ghugni chaat",
      20,
      [
        "chickpeas",
        "potato",
        "onion",
        "lemon"
      ],
      "salad",
      "Warm cooked chickpeas and potato, then finish with raw onion and lemon like a street plate."
    ],
    [
      "Palak poori",
      30,
      [
        "atta",
        "spinach"
      ],
      "paratha",
      "Knead wilted, squeezed spinach into the dough and fry small rounds until they puff."
    ],
    [
      "Methi poori",
      30,
      [
        "atta",
        "methi"
      ],
      "paratha",
      "Knead fine methi into the dough. Fry until the bread puffs and the leaves no longer taste raw."
    ],
    [
      "Onion poori",
      30,
      [
        "atta",
        "onion"
      ],
      "paratha",
      "Knead very fine, squeezed onion into the dough and fry until the rounds puff and brown in spots."
    ],
    [
      "Carrot poori",
      30,
      [
        "atta",
        "carrot"
      ],
      "paratha",
      "Grate the carrot, squeeze it, and knead it into the dough. Fry until the carrot no longer looks raw at the edge."
    ],
    [
      "Peas poori",
      35,
      [
        "atta",
        "peas"
      ],
      "paratha",
      "Mash cooked peas dry, seal a spoonful in dough, and fry until the crust is gold and crisp."
    ],
    [
      "Aloo bhature",
      40,
      [
        "atta",
        "potato",
        "onion"
      ],
      "paratha",
      "Cook potato and onion into a dry bhaji, and fry the dough until it balloons."
    ],
    [
      "Besan poori",
      25,
      [
        "atta",
        "besan"
      ],
      "paratha",
      "Knead besan into the atta. The poori should taste toasted, not raw flour."
    ],
    [
      "Spinach poori",
      30,
      [
        "atta",
        "spinach",
        "garlic"
      ],
      "paratha",
      "Knead squeezed spinach and a little garlic into the dough, then fry until puffed."
    ],
    [
      "Paneer poori",
      35,
      [
        "atta",
        "paneer",
        "onion"
      ],
      "paratha",
      "Crumble paneer with onion, seal it in dough, and fry until the crust is crisp and the filling is hot."
    ],
    [
      "Cheese paratha",
      30,
      [
        "atta",
        "cheese"
      ],
      "paratha",
      "Grate the cheese and seal it in the dough. Cook until the outside is spotted and the cheese has melted."
    ],
    [
      "Lauki paratha",
      35,
      [
        "atta",
        "lauki"
      ],
      "paratha",
      "Grate the lauki and squeeze it hard. A wet filling tears the dough."
    ],
    [
      "Beans paratha",
      35,
      [
        "atta",
        "beans"
      ],
      "paratha",
      "Chop the beans very fine and cook them dry before they go into the dough."
    ],
    [
      "Capsicum paratha",
      30,
      [
        "atta",
        "capsicum",
        "onion"
      ],
      "paratha",
      "Cook capsicum and onion until the water is gone, then use that as a dry filling."
    ],
    [
      "Corn paratha",
      30,
      [
        "atta",
        "corn"
      ],
      "paratha",
      "Crush the corn so it stays in the dough. Whole kernels tear the bread when you roll it."
    ],
    [
      "Mushroom paratha",
      35,
      [
        "atta",
        "mushroom",
        "onion"
      ],
      "paratha",
      "Cook the mushrooms until the pan is dry, mix with onion, and seal the filling well."
    ],
    [
      "Egg paratha",
      25,
      [
        "atta",
        "egg",
        "onion"
      ],
      "paratha",
      "Cook the egg with onion until dry, then use it as a filling. Wet egg makes the dough soggy."
    ],
    [
      "Chicken paratha",
      40,
      [
        "atta",
        "chicken",
        "onion"
      ],
      "paratha",
      "Cook the chicken with onion until it shreds and the pan is dry, then stuff and cook the paratha through."
    ],
    [
      "Soya paratha",
      35,
      [
        "atta",
        "soya",
        "onion"
      ],
      "paratha",
      "Soak the soya, squeeze it, and cook it dry with onion before it goes into the dough."
    ],
    [
      "Tofu paratha",
      30,
      [
        "atta",
        "tofu",
        "onion"
      ],
      "paratha",
      "Crumble firm tofu with cooked onion. Press the tofu first or the filling weeps."
    ],
    [
      "Rajma paratha",
      40,
      [
        "atta",
        "rajma",
        "onion"
      ],
      "paratha",
      "Mash cooked rajma with onion until it holds together, then stuff and cook until the dough is done."
    ],
    [
      "Chickpea paratha",
      40,
      [
        "atta",
        "chickpeas",
        "onion"
      ],
      "paratha",
      "Mash the chickpeas coarse. A smooth wet paste leaks out of the dough."
    ],
    [
      "Banana paratha",
      25,
      [
        "atta",
        "banana"
      ],
      "paratha",
      "Mash ripe banana into the dough and knead it smooth. Cook on a medium pan so the centre sets."
    ],
    [
      "Coconut paratha",
      30,
      [
        "atta",
        "coconut"
      ],
      "paratha",
      "Knead fresh coconut into the dough. Cook until the coconut smells toasted, not burnt."
    ],
    [
      "Garlic paratha",
      25,
      [
        "atta",
        "garlic"
      ],
      "paratha",
      "Crush the garlic and knead it into the dough with salt. Cook until the raw garlic smell is gone."
    ],
    [
      "Ginger paratha",
      25,
      [
        "atta",
        "ginger"
      ],
      "paratha",
      "Grate the ginger, knead it into the dough, and cook until the bread is spotted and fragrant."
    ],
    [
      "Lemon paratha",
      25,
      [
        "atta",
        "lemon"
      ],
      "paratha",
      "Knead lemon juice into the dough in place of some of the water. Cook until the surface is dry and spotted."
    ],
    [
      "Potato onion paratha",
      35,
      [
        "atta",
        "potato",
        "onion"
      ],
      "paratha",
      "Mash potato with cooked onion and keep the filling dry, or the paratha bursts."
    ],
    [
      "Cauliflower peas paratha",
      40,
      [
        "atta",
        "cauliflower",
        "peas"
      ],
      "paratha",
      "Grate the cauliflower, squeeze it, and mix with mashed peas. Both must be dry."
    ],
    [
      "Cabbage paratha",
      30,
      [
        "atta",
        "cabbage"
      ],
      "paratha",
      "Shred the cabbage, salt it, and squeeze hard before you knead it into the dough."
    ],
    [
      "Pumpkin paratha",
      35,
      [
        "atta",
        "pumpkin"
      ],
      "paratha",
      "Cook the pumpkin until dry and mash it. Wet pumpkin makes the dough slack."
    ],
    [
      "Palak khichdi",
      30,
      [
        "rice",
        "lentils",
        "spinach"
      ],
      "rice",
      "Cook rice and lentils until soft, then fold in spinach for the last 3 minutes so it stays green."
    ],
    [
      "Tomato khichdi",
      30,
      [
        "rice",
        "lentils",
        "tomato"
      ],
      "rice",
      "Cook the tomato down before the rice and lentils, or the khichdi tastes raw and watery."
    ],
    [
      "Carrot khichdi",
      30,
      [
        "rice",
        "lentils",
        "carrot"
      ],
      "rice",
      "Grate the carrot so it melts into the rice and lentils instead of staying in hard pieces."
    ],
    [
      "Peas khichdi",
      30,
      [
        "rice",
        "lentils",
        "peas"
      ],
      "rice",
      "Add the peas when the rice is almost done. Peas cooked for the full time turn grey."
    ],
    [
      "Lauki khichdi",
      35,
      [
        "rice",
        "lentils",
        "lauki"
      ],
      "rice",
      "Cube the lauki small and simmer it with the rice until it turns translucent."
    ],
    [
      "Pumpkin khichdi",
      35,
      [
        "rice",
        "lentils",
        "pumpkin"
      ],
      "rice",
      "Pumpkin sweetens the pot. Check at 20 minutes so it softens without becoming a puree."
    ],
    [
      "Methi khichdi",
      30,
      [
        "rice",
        "lentils",
        "methi"
      ],
      "rice",
      "A small handful of methi is enough. Add it near the end so the khichdi is not bitter."
    ],
    [
      "Corn khichdi",
      30,
      [
        "rice",
        "lentils",
        "corn"
      ],
      "rice",
      "Add the corn in the last 8 minutes so the kernels stay a little firm."
    ],
    [
      "Mushroom khichdi",
      30,
      [
        "rice",
        "lentils",
        "mushroom"
      ],
      "rice",
      "Brown the mushrooms until the pan is dry, then stir them through the cooked khichdi."
    ],
    [
      "Garlic khichdi",
      30,
      [
        "rice",
        "lentils",
        "garlic"
      ],
      "rice",
      "Fry the garlic until just gold and stir it through at the end. Brown garlic turns the pot bitter."
    ],
    [
      "Besan dosa",
      20,
      [
        "besan",
        "onion"
      ],
      "breakfast",
      "Whisk besan to a thin batter with onion and pour it like a crepe. Cook until the edges lift."
    ],
    [
      "Oats dosa",
      20,
      [
        "oats",
        "onion",
        "curd"
      ],
      "breakfast",
      "Soak oats in curd until soft, mix to a pourable batter with onion, and cook thin rounds."
    ],
    [
      "Carrot upma",
      25,
      [
        "suji",
        "carrot",
        "onion"
      ],
      "breakfast",
      "Cook the carrot until tender before the roasted suji goes in, or you get hard bits in soft upma."
    ],
    [
      "Capsicum upma",
      25,
      [
        "suji",
        "capsicum",
        "onion"
      ],
      "breakfast",
      "Add capsicum near the end so it stays a little crisp against the soft suji."
    ],
    [
      "Coconut upma",
      20,
      [
        "suji",
        "coconut",
        "onion"
      ],
      "breakfast",
      "Fold the coconut in at the end. Coconut boiled from the start turns oily."
    ],
    [
      "Lemon upma",
      20,
      [
        "suji",
        "lemon",
        "onion"
      ],
      "breakfast",
      "Lemon goes in off the heat, after the suji has absorbed the water."
    ],
    [
      "Poha chaat",
      15,
      [
        "poha",
        "onion",
        "tomato",
        "peanuts",
        "lemon"
      ],
      "salad",
      "Use thick dry poha, not the washed soft kind. Toss with onion, tomato, peanuts, and lemon."
    ],
    [
      "Peanut poha",
      15,
      [
        "poha",
        "peanuts",
        "onion"
      ],
      "breakfast",
      "Roast the peanuts first, cook the onion, then fold in damp poha without mashing it."
    ],
    [
      "Corn poha",
      20,
      [
        "poha",
        "corn",
        "onion"
      ],
      "breakfast",
      "Cook the corn until some kernels brown, then fold the damp poha through."
    ],
    [
      "Carrot poha",
      20,
      [
        "poha",
        "carrot",
        "onion"
      ],
      "breakfast",
      "Grate the carrot and cook it with onion until soft before the poha goes in."
    ],
    [
      "Tomato poha",
      15,
      [
        "poha",
        "tomato",
        "onion"
      ],
      "breakfast",
      "Cook the tomato until it is a paste, then fold in the poha. Watery tomato makes it soggy."
    ],
    [
      "Beans upma",
      25,
      [
        "suji",
        "beans",
        "onion"
      ],
      "breakfast",
      "Chop the beans fine and cook them until bright and tender before adding water and suji."
    ],
    [
      "Peas upma",
      25,
      [
        "suji",
        "peas",
        "onion"
      ],
      "breakfast",
      "Peas need 5 minutes in the onion before the water and suji, or they stay raw."
    ],
    [
      "Methi upma",
      25,
      [
        "suji",
        "methi",
        "onion"
      ],
      "breakfast",
      "Fry the methi for a minute to take the bitterness off, then make the upma."
    ],
    [
      "Spinach upma",
      25,
      [
        "suji",
        "spinach",
        "onion"
      ],
      "breakfast",
      "Wilt the spinach and cook off its water before the suji, or the upma stays wet."
    ],
    [
      "Okra potato",
      30,
      [
        "okra",
        "potato",
        "onion"
      ],
      "dry",
      "Cook the potato first. Add dry okra for the last 8 minutes, uncovered, so it does not turn slimy."
    ],
    [
      "Cabbage peas",
      25,
      [
        "cabbage",
        "peas",
        "onion"
      ],
      "dry",
      "Cook the cabbage uncovered until it shrinks, then add peas for 5 minutes."
    ],
    [
      "Capsicum peas",
      20,
      [
        "capsicum",
        "peas",
        "onion"
      ],
      "dry",
      "Peas first, until tender, then capsicum for 4 minutes so it keeps a bite."
    ],
    [
      "Spinach mushroom",
      20,
      [
        "spinach",
        "mushroom",
        "garlic"
      ],
      "dry",
      "Brown the mushrooms until dry, then wilt the spinach with garlic. Squeeze nothing; cook the water off."
    ],
    [
      "Tofu peas",
      25,
      [
        "tofu",
        "peas",
        "onion"
      ],
      "dry",
      "Press and brown the tofu, cook the peas, and fold them together for 2 minutes."
    ],
    [
      "Soya peas",
      30,
      [
        "soya",
        "peas",
        "onion"
      ],
      "dry",
      "Soak and squeeze the soya, brown it with onion, and add peas for the last 6 minutes."
    ],
    [
      "Corn paneer",
      25,
      [
        "corn",
        "paneer",
        "onion"
      ],
      "dry",
      "Brown the paneer, then toss with corn and onion on high heat for 4 minutes. No gravy."
    ],
    [
      "Lauki peas",
      30,
      [
        "lauki",
        "peas",
        "onion"
      ],
      "gravy",
      "Cook the lauki until translucent, then add peas for 6 minutes so they do not overcook."
    ],
    [
      "Pumpkin peas",
      30,
      [
        "pumpkin",
        "peas",
        "onion"
      ],
      "gravy",
      "Pumpkin first, until soft, then peas. Stop before the pumpkin collapses into a puree."
    ],
    [
      "Okra tomato",
      25,
      [
        "okra",
        "tomato",
        "onion"
      ],
      "dry",
      "Dry the okra and cook it uncovered until the ridges brown, then add tomato and cook the liquid off."
    ],
    [
      "Methi mushroom",
      25,
      [
        "methi",
        "mushroom",
        "garlic"
      ],
      "dry",
      "Brown the mushrooms, then add methi and garlic for 4 minutes until the leaves wilt."
    ],
    [
      "Lauki tomato",
      30,
      [
        "lauki",
        "tomato",
        "onion"
      ],
      "gravy",
      "Peel the lauki. It is done when a cube turns clear and a spoon goes through."
    ],
    [
      "Beans capsicum",
      20,
      [
        "beans",
        "capsicum",
        "garlic"
      ],
      "dry",
      "Cook the beans until just tender, then toss capsicum and garlic through for 3 minutes."
    ],
    [
      "Cauliflower carrot",
      30,
      [
        "cauliflower",
        "carrot",
        "onion"
      ],
      "dry",
      "Start the carrot, brown the cauliflower, and finish uncovered so neither one steams."
    ],
    [
      "Cabbage tomato",
      25,
      [
        "cabbage",
        "tomato",
        "onion"
      ],
      "dry",
      "Cook uncovered until the cabbage shrinks and the tomato dries into it."
    ],
    [
      "Eggplant tomato",
      30,
      [
        "eggplant",
        "tomato",
        "garlic"
      ],
      "gravy",
      "Salt the eggplant, pat it dry, brown it, then simmer briefly in tomato and garlic."
    ],
    [
      "Mushroom tomato",
      25,
      [
        "mushroom",
        "tomato",
        "garlic"
      ],
      "gravy",
      "Brown the mushrooms until the pan is dry, then cook them in tomato for 5 minutes."
    ],
    [
      "Corn tomato",
      20,
      [
        "corn",
        "tomato",
        "onion"
      ],
      "dry",
      "High heat. The corn should brown in spots and the tomato should dry, not pool."
    ],
    [
      "Pumpkin tomato",
      30,
      [
        "pumpkin",
        "tomato",
        "onion"
      ],
      "gravy",
      "Cook the pumpkin until soft but still in pieces, then fold it into the tomato."
    ],
    [
      "Paneer palak fry",
      25,
      [
        "paneer",
        "spinach",
        "garlic"
      ],
      "dry",
      "Wilt and squeeze the spinach, brown the paneer, and toss them with garlic. This one has no gravy."
    ],
    [
      "Tofu mushroom",
      25,
      [
        "tofu",
        "mushroom",
        "garlic"
      ],
      "dry",
      "Brown the tofu and the mushrooms separately, then toss with garlic for 1 minute."
    ],
    [
      "Chickpea potato dry",
      35,
      [
        "chickpeas",
        "potato",
        "onion"
      ],
      "dry",
      "Cook the potato until tender and toss it with chickpeas on high heat so the masala coats them and stays dry."
    ],
    [
      "Rajma potato",
      40,
      [
        "rajma",
        "potato",
        "onion"
      ],
      "gravy",
      "The rajma must be fully cooked first. Potato goes in until a piece yields to a spoon."
    ],
    [
      "Sprout tomato",
      25,
      [
        "sprouts",
        "tomato",
        "onion"
      ],
      "dry",
      "Sprouts only need 6 minutes. Cook the tomato first, then the sprouts, or they turn to mush."
    ],
    [
      "Chicken potato curry",
      40,
      [
        "chicken",
        "potato",
        "onion"
      ],
      "meat",
      "Start the potato with the chicken so it drinks the masala. It is done when a piece splits with a spoon."
    ],
    [
      "Chicken spinach",
      35,
      [
        "chicken",
        "spinach",
        "onion"
      ],
      "meat",
      "Cook the chicken through, then wilt the spinach at the end so it stays green."
    ],
    [
      "Chicken peas",
      35,
      [
        "chicken",
        "peas",
        "onion"
      ],
      "meat",
      "Peas go in for the last 6 minutes. Longer and they wrinkle while you wait for the chicken."
    ],
    [
      "Chicken capsicum",
      30,
      [
        "chicken",
        "capsicum",
        "onion"
      ],
      "meat",
      "Cook the chicken first. Capsicum goes in for the last 4 minutes so it stays a little crisp."
    ],
    [
      "Chicken coconut",
      35,
      [
        "chicken",
        "coconut",
        "onion"
      ],
      "meat",
      "Simmer the chicken in onion, then stir in coconut off a hard boil so it does not turn oily."
    ],
    [
      "Mutton potato curry",
      55,
      [
        "mutton",
        "potato",
        "onion"
      ],
      "meat",
      "Mutton needs the long simmer. Add potato in the last 20 minutes so it softens without disappearing."
    ],
    [
      "Mutton spinach",
      50,
      [
        "mutton",
        "spinach",
        "onion"
      ],
      "meat",
      "The mutton should be tender before the spinach goes in. Spinach only needs to wilt."
    ],
    [
      "Mutton peas",
      50,
      [
        "mutton",
        "peas",
        "onion"
      ],
      "meat",
      "Add peas at the end. They will not survive the full mutton simmer."
    ],
    [
      "Fish spinach",
      25,
      [
        "fish",
        "spinach",
        "onion"
      ],
      "meat",
      "Wilt the spinach first, lay the fish on top, and stop when the fish flakes."
    ],
    [
      "Fish capsicum",
      25,
      [
        "fish",
        "capsicum",
        "onion"
      ],
      "meat",
      "Cook the capsicum with onion, then the fish. Fish that sits too long falls apart."
    ],
    [
      "Prawn capsicum",
      20,
      [
        "prawns",
        "capsicum",
        "onion"
      ],
      "meat",
      "Capsicum and onion first. Prawns only until they curl and turn pink."
    ],
    [
      "Prawn peas",
      20,
      [
        "prawns",
        "peas",
        "onion"
      ],
      "meat",
      "Cook the peas, then add prawns for 4 minutes. A tight grey prawn is overcooked."
    ],
    [
      "Prawn spinach",
      20,
      [
        "prawns",
        "spinach",
        "garlic"
      ],
      "meat",
      "Wilt the spinach with garlic, then fold the prawns through until they just turn pink."
    ],
    [
      "Capsicum egg curry",
      25,
      [
        "egg",
        "capsicum",
        "onion",
        "tomato"
      ],
      "gravy",
      "Boil and peel the eggs. Finish the capsicum masala, then warm the eggs in it for 4 minutes."
    ],
    [
      "Chicken corn",
      30,
      [
        "chicken",
        "corn",
        "onion"
      ],
      "meat",
      "Cook the chicken through, then toss the corn in for 5 minutes so the kernels stay bright."
    ],
    [
      "Mutton corn",
      50,
      [
        "mutton",
        "corn",
        "onion"
      ],
      "meat",
      "Corn goes in near the end. It should not sit through the whole mutton simmer."
    ],
    [
      "Fish corn",
      25,
      [
        "fish",
        "corn",
        "onion"
      ],
      "meat",
      "Cook the corn with onion, lay the fish in, and stop when it flakes."
    ],
    [
      "Prawn corn",
      20,
      [
        "prawns",
        "corn",
        "garlic"
      ],
      "meat",
      "Brown the corn a little, add garlic, then prawns only until they curl."
    ],
    [
      "Chicken lauki",
      40,
      [
        "chicken",
        "lauki",
        "onion"
      ],
      "meat",
      "Cube the lauki small. It should turn clear in the same pot as the chicken."
    ],
    [
      "Mutton beans",
      50,
      [
        "mutton",
        "beans",
        "onion"
      ],
      "meat",
      "Add the beans in the last 15 minutes so they are tender and still green."
    ]
  ];

  const book = specs.concat(popular, street);

  // One major per recipe: the ingredient the title is about.
  // A base such as rice or atta is the major only when the title names nothing else.
  const BASES = new Set(["rice", "atta", "bread", "poha", "suji", "besan", "oats", "vermicelli", "pasta", "noodles", "lentils", "puffedrice"]);
  const PROTEINS = new Set(["chicken", "mutton", "fish", "prawns", "egg", "paneer", "tofu", "soya"]);
  const NAME_HITS = [
    ["sweet potato", "sweetpotato"],
    ["soya", "soya"],
    ["paneer", "paneer"],
    ["chicken", "chicken"],
    ["mutton", "mutton"],
    ["prawn", "prawns"],
    ["fish", "fish"],
    ["omelette", "egg"],
    ["anda", "egg"],
    ["egg", "egg"],
    ["aloo", "potato"],
    ["potato", "potato"],
    ["palak", "spinach"],
    ["spinach", "spinach"],
    ["gobi", "cauliflower"],
    ["cauliflower", "cauliflower"],
    ["bhindi", "okra"],
    ["okra", "okra"],
    ["baingan", "eggplant"],
    ["eggplant", "eggplant"],
    ["matar", "peas"],
    ["peas", "peas"],
    ["kanda", "onion"],
    ["onion", "onion"],
    ["chole", "chickpeas"],
    ["chana", "chickpeas"],
    ["chickpea", "chickpeas"],
    ["rajma", "rajma"],
    ["tofu", "tofu"],
    ["dal", "lentils"],
    ["lentil", "lentils"],
    ["poha", "poha"],
    ["upma", "suji"],
    ["rava", "suji"],
    ["suji", "suji"],
    ["halwa", "suji"],
    ["besan", "besan"],
    ["kadhi", "besan"],
    ["oats", "oats"],
    ["vermicelli", "vermicelli"],
    ["noodle", "noodles"],
    ["pasta", "pasta"],
    ["paratha", "atta"],
    ["bread", "bread"],
    ["biryani", "rice"],
    ["khichdi", "rice"],
    ["pongal", "rice"],
    ["dosa", "rice"],
    ["idli", "rice"],
    ["uttapam", "rice"],
    ["pulao", "rice"],
    ["sambar", "lentils"],
    ["medu", "lentils"],
    ["adai", "lentils"],
    ["pesarattu", "lentils"],
    ["batata", "potato"],
    ["gajar", "carrot"],
    ["keema", "mutton"],
    ["doi", "curd"],
    ["chaas", "curd"],
    ["dhokla", "besan"],
    ["khandvi", "besan"],
    ["misal", "sprouts"],
    ["sandwich", "bread"],
    ["rice", "rice"],
    ["lassi", "curd"],
    ["curd", "curd"],
    ["milk", "milk"],
    ["banana", "banana"],
    ["puffed rice", "puffedrice"],
    ["muri", "puffedrice"],
    ["churumuri", "puffedrice"],
    ["tomato", "tomato"],
    ["garlic", "garlic"],
    ["ginger", "ginger"],
    ["lemon", "lemon"],
    ["coconut", "coconut"],
    ["methi", "methi"],
    ["lauki", "lauki"],
    ["pumpkin", "pumpkin"],
    ["carrot", "carrot"],
    ["cabbage", "cabbage"],
    ["capsicum", "capsicum"],
    ["mushroom", "mushroom"],
    ["corn", "corn"],
    ["beans", "beans"],
    ["peanut", "peanuts"],
    ["sprout", "sprouts"],
    ["cheese", "cheese"],
    ["butter", "butter"],
    ["kheer", "milk"]
  ];

  function majorFor(name, needs) {
    const title = " " + name.toLowerCase() + " ";
    const found = [];
    for (const [word, id] of NAME_HITS) {
      if (!needs.includes(id)) continue;
      const at = title.indexOf(word);
      if (at >= 0 && !found.some((hit) => hit.id === id)) found.push({ id, at });
    }
    if (found.length === 0) {
      const plain = needs.filter((id) => !BASES.has(id));
      return (plain.length ? plain : needs)[0];
    }
    const proteins = found.filter((hit) => PROTEINS.has(hit.id));
    if (proteins.length) {
      proteins.sort((a, b) => a.at - b.at);
      return proteins[0].id;
    }
    const specific = found.filter((hit) => !BASES.has(hit.id));
    const pool = specific.length ? specific : found;
    pool.sort((a, b) => a.at - b.at);
    return pool[0].id;
  }

  // Each dish has its own meal, or two when people really eat it at both.
  // Nothing is filed under every meal.
  function mealsFor(name, method) {
    const n = name.toLowerCase();
    const order = ["breakfast", "lunch", "snack", "dinner"];
    const set = new Set();
    const add = (...ids) => {
      for (const id of ids) set.add(id);
    };

    if (/pakora|tikki|samosa|\bvada\b|cutlet|bhajiya|chaat|bhel|dhokla|khandvi|handvo|\bdevil\b|puchka|muri|churumuri|dabeli|kachori|bajji|bonda|golgappa/.test(n)) add("snack");
    else if (/manchurian|\b65\b|chilli paneer|chilli chicken|chilli potato|chilli mushroom|crispy corn/.test(n)) add("snack", "dinner");
    else if (/roll|burger|pav bhaji|\bpav\b/.test(n)) add("snack", "lunch");
    else if (/halwa|kheer|ladoo|payasam/.test(n)) add("snack");
    else if (/shake|lassi|masala milk|banana curd|chaas|mishti/.test(n)) add("breakfast");
    else if (/toast|sandwich|garlic bread|bread omelette/.test(n)) add("breakfast");
    else if (/poha|upma|idli|dosa|uttapam|oats|vermicelli|chilla|pesarattu|\badai\b|appam|puttu|pongal|misal|\bmash\b/.test(n)) add("breakfast");
    else if (/omelette|bhurji/.test(n) || ["garlic eggs", "onion eggs", "anda ghotala", "potato egg", "capsicum egg", "peas egg"].includes(n)) add("breakfast");
    else if (method === "breakfast") add("breakfast");
    else if (method === "paratha" || /paratha|poori|\bpuri\b|bhature|bhatura/.test(n)) add("breakfast", "lunch");
    else if (/khichdi|ghugni|\bdal\b|sambar|rasam|kadhi|rajma|chole|jeera rice/.test(n) || method === "dal") add("lunch", "dinner");
    else if (/salad|raita|kachumber/.test(n) || method === "salad") add("lunch", "dinner");
    else if (/\b(chicken|fish|prawn) fry\b/.test(n)) add("snack", "dinner");
    else if (/biryani/.test(n)) add("dinner");
    else if (/pulao|fried rice|\brice\b/.test(n) || method === "rice") add("lunch");
    else if (/korma|makhani|butter chicken|tikka|\broast\b|noodle|pasta|hakka|chowmein|soup|kofta|nihari|haleem|vindaloo|do pyaza|chettinad|kadai|keema|egg curry|egg bhaji|egg masala|boiled egg/.test(n) || method === "pasta" || method === "meat" || method === "egg" || /chicken|mutton|fish|prawn/.test(n)) add("dinner");
    else if (method === "dry" || /sabzi|\bfry\b|poriyal|thoran/.test(n)) add("lunch", "dinner");
    else if (/paneer|malai|shahi|lababdar/.test(n)) add("dinner");
    else add("lunch");

    const meals = order.filter((id) => set.has(id));
    if (meals.length === 0 || meals.length > 2) throw new Error(name + " has a bad meal menu");
    return meals;
  }

  const seen = new Set();
  const dishes = book.map((spec) => {
    const [name, minutes, needs, method, tip] = spec;
    if (seen.has(name)) throw new Error("Duplicate recipe: " + name);
    seen.add(name);
    for (const id of needs) {
      if (!labelOf[id]) throw new Error(name + " has unknown ingredient " + id);
    }
    const steps = writers[method]({ name, minutes, needs, tip });
    if (steps.length < 6) throw new Error(name + " has too few steps");
    const major = majorFor(name, needs);
    if (!needs.includes(major)) throw new Error(name + " major is not in the recipe: " + major);
    const meals = mealsFor(name, method);
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const diet = needs.some((item) => NONVEG.has(item)) ? "non-veg" : "veg";
    // Keywords are what the filters match. Diet is one word. A meal can be several.
    const keyword = diet === "non-veg" ? "Non-veg" : "Veg";
    const mealWords = { breakfast: "Breakfast", lunch: "Lunch", snack: "Snacks", dinner: "Dinner" };
    const ingredientWords = [major, ...needs.filter((id) => id !== major)].map((id) => labelOf[id]);
    const keywords = [keyword, ...meals.map((meal) => mealWords[meal]), ...ingredientWords];
    if (keywords.some((word) => !word)) throw new Error(name + " has a missing keyword");
    return {
      id,
      name,
      minutes,
      needs,
      major,
      meals,
      diet,
      keyword,
      keywords,
      steps
    };
  });

  // Ingredients named in the steps, in the order the cook meets them.
  // A clause that says "no onion", "not from tomato", or "without X" does not count.
  const WORDS = {
    rice: "rice", atta: "atta", bread: "bread", poha: "poha", suji: "suji",
    besan: "besan", oats: "oats", vermicelli: "vermicelli", noodles: "noodles",
    pasta: "pasta", paneer: "paneer", tofu: "tofu", soya: "soya(?: chunks?)?",
    lentils: "lentils?", chickpeas: "chickpeas?", rajma: "rajma", sprouts: "sprouts?",
    peanuts: "peanuts?", milk: "milk", curd: "curd", butter: "butter", cheese: "cheese",
    onion: "onions?", tomato: "tomato(?:es)?", potato: "potato(?:es)?", spinach: "spinach",
    peas: "peas?", carrot: "carrots?", beans: "beans?", cabbage: "cabbage",
    cauliflower: "cauliflower", capsicum: "capsicum", eggplant: "eggplants?|aubergine",
    okra: "okra", mushroom: "mushrooms?", corn: "corn", lauki: "lauki",
    pumpkin: "pumpkins?", sweetpotato: "sweetpotato", methi: "methi",
    lemon: "lemons?", ginger: "ginger", garlic: "garlic", coconut: "coconut",
    banana: "bananas?", puffedrice: "puffed rice", egg: "eggs?", chicken: "chicken", mutton: "mutton",
    fish: "fish", prawns: "prawns?", salt: "salt", oil: "oil", water: "water",
    cumin: "cumin", turmeric: "turmeric", chili: "chil+i(?:es)?"
  };
  const compiled = Object.entries(WORDS).map(([id, src]) => [id, new RegExp(`\\b(?:${src})\\b`, "i")]);
  // A mention is negated when "no", "not", "without", or "from" sits within two words before it.
  const NEGATED_BEFORE = /\b(no|not|without|nor|never|from)\s+(?:\w+\s+){0,2}$/i;

  function mentionedIn(steps) {
    const first = new Map();
    steps.forEach((step, stepIndex) => {
      const normal = step.replace(/sweet potato(?:es)?/gi, "sweetpotato");
      let offset = 0;
      for (const clause of normal.split(/[.;,]/)) {
        for (const [id, pattern] of compiled) {
          const at = clause.search(pattern);
          if (at < 0 || first.has(id)) continue;
          if (NEGATED_BEFORE.test(clause.slice(0, at))) continue;
          first.set(id, stepIndex * 10000 + offset + at);
        }
        offset += clause.length + 1;
      }
    });
    return [...first.entries()].sort((a, b) => a[1] - b[1]).map(([id]) => id);
  }

  window.PantryData = {
    ingredients,
    staples,
    dishes,
    minTicks: 3,
    mentionedIn
  };
})();
