<template>
  <div class="edit-recipe">
    <h2>Edit Recipe</h2>
    <form @submit.prevent="updateRecipe">
      <div>
        <label for="name">Recipe Name:</label>
        <input type="text" v-model="recipe.name" id="name" class="input-field">
      </div>
      <div>
        <label for="description">Description:</label>
        <input type="text" v-model="recipe.description" id="description" class="input-field">
      </div>
      <div>
        <label for="ingredients">Ingredients:</label>
        <textarea v-model="ingredientInput" id="ingredients" class="input-field" placeholder="Enter ingredients"></textarea>
        <button @click.prevent="addIngredient" class="add-button">Add Ingredient</button>
        <ul>
          <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
            {{ ingredient.name }}: {{ ingredient.quantity }} {{ ingredient.unit }}
            <button @click.prevent="removeIngredient(index)" class="remove-button">Remove</button>
          </li>
        </ul>
      </div>
      <div>
        <label for="instructions">Instructions:</label>
        <textarea v-model="instructionInput" id="instructions" class="input-field" placeholder="Enter instructions"></textarea>
        <button @click.prevent="addInstruction" class="add-button">Add Instruction</button>
        <ol>
          <li v-for="(instruction, index) in recipe.instructions" :key="index">
            {{ instruction }}
            <button @click.prevent="removeInstruction(index)" class="remove-button">Remove</button>
          </li>
        </ol>
      </div>
      <div>
        <label for="prepTime">Preparation Time (minutes):</label>
        <input type="number" v-model.number="recipe.prep_time" id="prepTime" class="input-field">
      </div>
      <div>
        <label for="cookTime">Cooking Time (minutes):</label>
        <input type="number" v-model.number="recipe.cook_time" id="cookTime" class="input-field">
      </div>
      
      <div>
        <label for="servings">Servings:</label>
        <input type="number" v-model.number="recipe.servings" id="servings" class="input-field">
      </div>
      <div>
        <label for="tags">Tags:</label>
        <input type="text" v-model="tagInput" id="tags" class="input-field" placeholder="Enter tags">
        <button @click.prevent="addTag" class="add-button">Add Tag</button>
        <ul>
          <li v-for="(tag, index) in recipe.tags" :key="index">
            {{ tag }}
            <button @click.prevent="removeTag(index)" class="remove-button">Remove</button>
          </li>
        </ul>
      </div>
      <button type="submit" class="submit-button">Save Changes</button>
      <button @click="goBack" class="submit-button">Cancel</button>
    </form>
  </div>
</template>

<script>
import { projectFirestore } from '@/Firebase/config.js';

export default {
  name: 'EditRecipe',
  data() {
    return {
      recipe: {
        name: '',
        description: '',
        ingredients: [],
        instructions: [],
        prep_time: 0,
        cook_time: 0,
        diet: '',
        servings: 0,
        tags: [],
        image: ''
      },
      ingredientInput: '',
      instructionInput: '',
      tagInput: ''
    };
  },
  async beforeMount() {
    try {
      const categoryId = this.$route.params.catid;
      const recipeName = this.$route.params.id;

      const categoryDoc = await projectFirestore
        .collection('categories')
        .doc(categoryId)
        .get();

      if (categoryDoc.exists) {
        const categoryData = categoryDoc.data();
        const recipe = categoryData.recipes.find(r => r.name === recipeName);

        if (recipe) {
          this.recipe = recipe;
        } else {
          console.error('Recipe not found');
        }
      } else {
        console.error('Category not found');
      }
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  },
  methods: {
    async updateRecipe() {
      try {
        const categoryId = this.$route.params.catid;
        const categoryDoc = await projectFirestore.collection('categories').doc(categoryId).get();

        if (categoryDoc.exists) {
          const categoryData = categoryDoc.data();
          const recipeIndex = categoryData.recipes.findIndex(r => r.name === this.recipe.name);

          if (recipeIndex !== -1) {
            categoryData.recipes[recipeIndex] = this.recipe;

            await projectFirestore.collection('categories').doc(categoryId).update({
              recipes: categoryData.recipes
            });

            console.log('Recipe updated successfully');
            this.$router.push('/home');
          } else {
            console.error('Recipe not found for update');
          }
        } else {
          console.error('Category not found for update');
        }
      } catch (error) {
        console.error('Error updating recipe:', error);
      }
    },
    goBack() {
      this.$router.push('/home');
    },
    addTag() {
      if (this.tagInput.trim() !== '') {
        this.recipe.tags.push(this.tagInput.trim());
        this.tagInput = '';
      }
    },
    removeTag(index) {
      this.recipe.tags.splice(index, 1);
    },
    addIngredient() {
      if (this.ingredientInput.trim() !== '') {
        this.recipe.ingredients.push(this.ingredientInput.trim());
        this.ingredientInput = '';
      }
    },
    removeIngredient(index) {
      this.recipe.ingredients.splice(index, 1);
    },
    addInstruction() {
      if (this.instructionInput.trim() !== '') {
        this.recipe.instructions.push(this.instructionInput.trim());
        this.instructionInput = '';
      }
    },
    removeInstruction(index) {
      this.recipe.instructions.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.edit-recipe {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f7f7f7;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.input-field {
  width: calc(100% - 100px); /* Adjust based on button width */
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #eaeaea;
}

.input-field:focus {
  border-color: #888;
  background-color: #fff;
}

.add-button {
  padding: 6px 10px;
  font-size: 14px; /* Adjust font size as needed */
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #0056b3;
}

.remove-button {
  padding: 4px 8px;
  font-size: 12px; /* Adjust font size as needed */
  cursor: pointer;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-left: 5px;
}

.remove-button:hover {
  background-color: #c82333;
}

.submit-button {
  padding: 8px 15px;
  font-size: 14px; /* Adjust font size as needed */
  cursor: pointer;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #218838;
}
</style>
