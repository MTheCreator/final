const firebase = require("firebase/app");
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyB4loZHSQYuwCPk35cn_YBx8ls_nfqiQ0k",
  authDomain: "um6p-course-16976.firebaseapp.com",
  projectId: "um6p-course-16976",
  storageBucket: "um6p-course-16976.appspot.com",
  messagingSenderId: "1010071718174",
  appId: "1:1010071718174:web:e69f0bf51a160cc5b2a10f"
};


firebase.initializeApp(firebaseConfig);

// Access Firestore
const db = firebase.firestore();

// Data to add
const usersData = [
 
      {
        id:"",
        lastSignInTime: "",
        creationTime: "",
        email: "",
        location:"",
        user_name:"",
      
      },
];

// Collection commentaires
const categories = [
  {
    name: "Omnivore",
    recipes: [
      {
        name: "Roasted Salmon with Roasted Asparagus",
        description: "A delicious and nutritious dish, easy to prepare",
        ingredients: [
          { name: "Salmon fillets", quantity: 450, unit: "g" },
          { name: "Green asparagus", quantity: 250, unit: "g" },
          { name: "Olive oil", quantity: "2 tablespoons", unit: "" },
          { name: "Salt and pepper", quantity: "to taste", unit: "" },
          { name: "Lemon juice", quantity: "1/2", unit: "unit" },
        ],
        instructions: [
          "Preheat the oven to 200°C.",
          "Pat dry the salmon fillets with paper towels and season them with salt, pepper, and fresh herbs (optional).",
          "Place the salmon fillets on a baking sheet lined with parchment paper.",
          "Wash and dry the green asparagus.",
          "Trim the tough ends of the asparagus and coat them with olive oil.",
          "Arrange the asparagus around the salmon fillets.",
          "Bake for 15-20 minutes, or until the salmon is cooked through and the asparagus is tender.",
          "Serve immediately with a squeeze of lemon juice.",
        ],
        prep_time: 10,
        cook_time: 20,
        diet: "Omnivore",
        servings: 2,
        tags: ["easy", "quick", "healthy", "fish"],
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIk_E42gMs0mOWj4liRk-QkA04nFFy6i999Q&s"
      },
      {
        name: "Chicken Curry with Basmati Rice",
        description: "A flavorful and aromatic dish, perfect for a family meal",
        ingredients: [
          { name: "Boneless, skinless chicken thighs", quantity: 600, unit: "g" },
          { name: "Red onion", quantity: "1", unit: "" },
          { name: "Garlic cloves", quantity:" 2", unit: "" },
          { name: "Curry powder", quantity: "2 tablespoons", unit: "" },
          { name: "Coconut milk", quantity: "400 ml", unit: "" },
          { name: "Basmati rice", quantity: "200 g", unit: "" },
          { name: "Fresh coriander", quantity: "1 handful", unit: "" },
          { name: "Salt and pepper", quantity: "to taste", unit: "" },
        ],
        instructions: [
          "Cut the chicken into pieces and brown them in a skillet with a little olive oil.",
          "Finely chop the onion and garlic and add them to the skillet.",
          "Sprinkle with curry powder and cook for a few minutes.",
          "Pour in the coconut milk and bring to a boil.",
          "Reduce the heat, cover, and simmer for 20 minutes, or until the chicken is cooked through.",
          "Cook the basmati rice according to the instructions on the package.",
          "Serve the chicken curry with the basmati rice and garnish with fresh coriander.",
        ],
        prep_time: 15,
        cook_time: 25,
        diet: "Omnivore",
        servings: 4,
        tags: ["easy", "family-friendly", "curry", "rice"],
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIk_E42gMs0mOWj4liRk-QkA04nFFy6i999Q&s"
      },
    ],
  },
  {
    name: "Vegetarian",
    recipes: [
      {
        name: "Vegetable and Goat Cheese Lasagna",
        description: "A comforting and flavorful vegetarian dish",
        ingredients: [
          { name: "Dry lasagna sheets", quantity: 250, unit: "g" },
          { name: "Zucchini", quantity: 2, unit: "" },
          { name: "Eggplant", quantity: 1, unit: "" },
          { name: "Red bell peppers", quantity: 1, unit: "" },
          { name: "Canned peeled tomatoes", quantity: 400, unit: "g" },
          { name: "Olive oil", quantity: "3 tablespoons", unit: "" },
          { name: "Fresh basil", quantity: "1 handful", unit: "" },
          { name: "Salt and pepper", quantity: "to taste", unit: "" },
          { name: "Goat cheese", quantity: 200, unit: "g" }
        ],
        instructions: [
          "Preheat the oven to 180°C.",
          "Sauté the diced zucchini, eggplant, and red bell peppers in a skillet with a little olive oil.",
          "Add the canned peeled tomatoes and fresh basil, and simmer for 15 minutes.",
          "Season with salt and pepper.",
          "In a baking dish, alternate layers of dry lasagna sheets, vegetable tomato sauce, and goat cheese.",
          "Finish with a layer of goat cheese and bake for 30-35 minutes, or until the lasagna is golden and the cheese is melted.",
          "Let it rest for a few minutes before serving."
        ],
        prep_time: 20,
        cook_time: 40,
        diet: "Vegetarian",
        servings: 4,
        tags: ["easy", "family-friendly", "vegetables", "cheese"],
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIk_E42gMs0mOWj4liRk-QkA04nFFy6i999Q&s"
      },
      {
        name: "Chickpea and Grilled Vegetable Burger",
        description: "A flavorful and nutritious vegetarian burger",
        ingredients: [
          { name: "Dry chickpeas", quantity: 200, unit: "g" },
          { name: "Red onion", quantity: 1, unit: "" },
          { name: "Garlic cloves", quantity: 2, unit: "" },
          { name: "Fresh parsley", quantity: "1 handful", unit: "" },
          { name: "Ground cumin", quantity: "1 teaspoon", unit: "" },
          { name: "Breadcrumbs", quantity: "3 tablespoons", unit: "" },
          { name: "Eggplant", quantity: 1, unit: "" },
          { name: "Red bell pepper", quantity: 1, unit: "" },
          { name: "Burger buns", quantity: 4, unit: "" },
          { name: "Green salad", quantity: "for garnish", unit: "" },
          { name: "Tomato", quantity: 1, unit: "" },
          { name: "Onion", quantity: 1, unit: "" },
          { name: "Yogurt sauce", quantity: "for serving", unit: "" }
          ],
          instructions: [
            "Soak the chickpeas in water overnight.",
            "The next day, rinse the chickpeas and cook them in a pot of boiling water for 30 minutes.",
            "Drain the chickpeas and mash them in a bowl.",
            "Finely chop the onion and garlic and add them to the chickpeas.",
            "Chop the parsley and add it to the chickpeas.",
            "Add the ground cumin, breadcrumbs, salt, and pepper.",
            "Mix everything until you get a homogeneous mixture.",
            "Shape burgers with the chickpea mixture.",
            "Heat a little olive oil in a skillet and cook the chickpea burgers for 5 minutes on each side, or until golden and crispy.",
            "Slice the eggplant and red bell pepper.",
            "Grill the eggplant and red bell pepper slices in the same skillet as the burgers for 2-3 minutes on each side.",
            "Slice the tomato and onion into rounds.",
            "Top the burger buns with green salad, tomato, onion, chickpea burgers, and eggplant and red bell pepper slices.",
            "Serve with yogurt sauce."
          ],
          prep_time: 30,
          cook_time: 35,
          diet: "Vegetarian",
          servings: 4,
          tags: ["easy", "family-friendly", "vegetarian", "burger", "vegetables"],
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIk_E42gMs0mOWj4liRk-QkA04nFFy6i999Q&s"
        }
      ]
    }
  ];
  


const addcatToFirestore = async (categories) => {
  try {
    for (const user of categories) {
      await db
        .collection("categories")
        
        .add(user);
    }
    console.log("users added to Firestore successfully!");
  } catch (error) {
    console.error("Error adding users to Firestore: ", error);
  }
};

addcatToFirestore(categories);

const addusersToFirestore = async (usersData) => {
  try {
    for (const user of usersData) {
      await db
        .collection("users_forum")
        
        .add(user);
    }
    console.log("users added to Firestore successfully!");
  } catch (error) {
    console.error("Error adding users to Firestore: ", error);
  }
};


addusersToFirestore(usersData);



