<template>
    <nav class="navbar">
      <router-link to="/home" class="nav-link">Home</router-link>
      <router-link to="/profile" class="nav-link">Profile</router-link>
    </nav>
    <br><br>
    <div class="recipes">
      <h1>Recipes in Category {{ categoryName }}</h1>
      <input type="text" v-model="searchQuery" placeholder="Search recipes by name" class="search-bar">
      <select v-model="selectedTag" class="tag-filter">
        <option value="">All Tags</option>
        <option v-for="tag in allTags" :value="tag">{{ tag }}</option>
      </select>
      <div v-if="filteredRecipes.length === 0">
        <p>There are no recipes in this category yet.</p>
      </div>
      <div v-else>
        <div class="recipe-card" v-for="recipe in filteredRecipes" :key="recipe.id" @click="viewRecipe(recipe)">
          <div class="recipe-image">
            <img :src="recipe.image" alt="Recipe Image">
          </div>
          <div class="recipe-details">
            <h3>{{ recipe.name }}</h3>
            <p>{{ recipe.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal for detailed recipe information -->
    <div v-if="selectedRecipe" class="modal">
      <div class="modal-content">
        <h3>{{ selectedRecipe.name }}</h3>
        <img :src="selectedRecipe.image" alt="Image" class="recipe-image" />
        <p>{{ selectedRecipe.description }}</p>
        <h4>Ingredients:</h4>
        <div class="ingredients-list">
          <div v-for="ingredient in selectedRecipe.ingredients" :key="ingredient.name" class="ingredient">
            <p>{{ ingredient.name }}: {{ ingredient.quantity }} {{ ingredient.unit }}</p>
          </div>
        </div>
        <h4>Instructions:</h4>
        <div class="instructions-list">
          <div v-for="(instruction, index) in selectedRecipe.instructions" :key="index" class="instruction">
            <p>{{ instruction }}</p>
          </div>
        </div>
        <p><strong>Preparation Time:</strong> {{ selectedRecipe.prep_time }} minutes</p>
        <p><strong>Cooking Time:</strong> {{ selectedRecipe.cook_time }} minutes</p>
        <p><strong>Diet:</strong> {{ selectedRecipe.diet }}</p>
        <p><strong>Servings:</strong> {{ selectedRecipe.servings }}</p>
        <p><strong>Tags:</strong> {{ selectedRecipe.tags.join(', ') }}</p>
        <div>
          <br>
          <button @click="editRecipe(selectedRecipe.name, categoryId)" class="edit-button">Edit</button>
          <br>
          <button @click="closeModal" class="close-button">Close</button>
          <button @click="deleteRecipe(selectedRecipe.name)" class="delete-button">
                <i class="fas fa-trash"> Delete</i>
        </button>
        </div>
      </div>
    </div>
</template>
  
<script>
import { projectFirestore } from '@/Firebase/config.js';

export default {
  name: 'Recipes',

  data() {
    return {
      categoryId: this.$route.params.id,
      recipes: [],
      categoryName: '',
      selectedRecipe: null,
      searchQuery: '',
      selectedTag: '', // Add selectedTag
    };
  },

  async mounted() {
    try {
      // Fetch category document
      const categoryDoc = await projectFirestore
        .collection('categories')
        .doc(this.categoryId)
        .get();

      if (categoryDoc.exists) {
        this.categoryName = categoryDoc.data().name;
        this.recipes = categoryDoc.data().recipes || [];
      } else {
        console.error("No such category!");
      }
    } catch (err) {
      console.error(err.message);
    }
  },
  

  computed: {
    filteredRecipes() {
      return this.recipes.filter(recipe => 
        (recipe.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
        (this.selectedTag === '' || recipe.tags.includes(this.selectedTag)))
      );
    },
    allTags() {
      const tags = new Set();
      this.recipes.forEach(recipe => {
        recipe.tags.forEach(tag => tags.add(tag));
      });
      return Array.from(tags);
    },
  },

  methods: {
    editRecipe(name, cateid) {
      this.$router.push({ name: 'Edit Recipe', params: { id: name, catid: cateid } });
    },

    viewRecipe(recipe) {
      this.selectedRecipe = recipe;
    },

    closeModal() {
      this.selectedRecipe = null;
    },

    async addRecipe(event) {
        event.preventDefault(); // Ensure default form submission is prevented

      try {
        this.newRecipe.ingredients = this.newIngredients.split(',').map(ingredient => {
          const parts = ingredient.split(':').map(part => part && part.trim());
          if (parts.length >= 2) {
            return { name: parts[0], quantity: parseFloat(parts[1]), unit: parts[2] || '' };
          } else {
            console.error('Invalid ingredient format:', ingredient);
            return null;
          }
        }).filter(ingredient => ingredient);

        this.newRecipe.instructions = this.newInstructions.split(',').map(instruction => instruction && instruction.trim()).filter(instruction => instruction);
        this.newRecipe.tags = this.newTags.split(',').map(tag => tag && tag.trim()).filter(tag => tag);
        console.log('Adding new recipe:', this.newRecipe);

        const updatedRecipes = [...this.recipes, this.newRecipe];
        await projectFirestore
          .collection('categories')
          .doc(this.categoryId)
          .update({
            recipes: updatedRecipes
          });

        this.recipes = updatedRecipes;

        // Reset the form
        this.newRecipe = {
          name: '',
          description: '',
          image: '',
          ingredients: [],
          instructions: [],
          prep_time: 0,
          cook_time: 0,
          diet: '',
          servings: 0,
          tags: [],
        };
        this.newIngredients = '';
        this.newInstructions = '';
        this.newTags = '';

        // Hide the form after adding the recipe
        this.showAddForm = false;
      } catch (err) {
        console.error('Error adding recipe:', err.message);
      }
    
    },
    async deleteRecipe(recipeId) {
    try {
        const updatedRecipes = this.recipes.filter(recipe => recipe.name !== recipeId);
        await projectFirestore
        .collection('categories')
        .doc(this.categoryId)
        .update({ recipes: updatedRecipes });

        this.recipes = updatedRecipes;
        this.selectedRecipe = null;
    } catch (err) {
        console.error(err.message);
    }
    },
  },
};
</script>
  
<style scoped>
  .recipes {
    padding: 20px;
  }
  
  .navbar {
    background-color: #333;
    padding: 10px;
  }
  
  .nav-link {
    color: #fff;
    margin-right: 10px;
    text-decoration: none;
  }
  
  .nav-link:hover {
    text-decoration: underline;
  }
  
  h1 {
    margin-bottom: 20px;
  }
  
  .search-bar {
    margin-bottom: 20px;
    padding: 12px 15px; /* Increased padding for better aesthetics */
    width: 100%;
    max-width: 400px;
    border: none; /* Removed border to give a cleaner look */
    border-radius: 25px; /* Rounded border for a modern feel */
    background-color: #f4f4f4; /* Light gray background */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  }
  
  .tag-filter {
    padding: 12px 15px; /* Increased padding for better aesthetics */
    border: none; /* Removed border */
    border-radius: 25px; /* Rounded border */
    background-color: #f4f4f4; /* Light gray background */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
    cursor: pointer; /* Show pointer cursor on hover */
  }
  
  .recipe-card {
    display: flex;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 20px;
    cursor: pointer;
  }
  
  .recipe-card:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .recipe-image {
    flex: 1;
    max-width: 200px;
  }
  
  .recipe-image img {
    width: 100%;
    height: auto;
  }
  
  .recipe-details {
    flex: 1;
    padding: 10px;
  }
  
  .recipe-details h3 {
    margin: 0;
    color: #007bff;
  }
  
  .recipe-details p {
    margin: 5px 0;
  }
  
  /* Modal styles */
  .modal {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }
  
  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    border-radius: 8px;
    width: 80%;
  }
  
  .edit-button,
  .close-button,
  .delete-button {
    padding: 8px 16px; /* Smaller padding */
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    margin-right: 10px;
  }
  
  .edit-button {
    background-color: #555;
    color: #fff;
  }
  
  .close-button {
    background-color: #ccc;
    color: #000;
  }

  .delete-button {
    background-color: #dc3545;
    color: white;
  }
  
  .edit-button:hover,
  .close-button:hover,
  .delete-button:hover {
    background-color: #444;
  }
  
  .delete-button i {
    margin-right: 8px;
  }
</style>

  