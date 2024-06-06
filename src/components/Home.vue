<template>
  <div class="home">
    <nav class="navbar">
      <router-link to="/home" class="nav-link">Home</router-link>
      <router-link to="/profile" class="nav-link">Profile</router-link>
    </nav>

    <!-- Welcome message -->
    <div class="welcome-message">
      <p class="mess">Welcome to <span>EatYourWay</span>, where we offer the broadest ranges of choices to you.</p>
    </div>
    <div class="specialties">
      <p>Our specialties</p>
    </div>
    <div class="categories">
      <div 
        v-for="category in categories" 
        :key="category.id" 
        class="category"
        @click="navigateToRecipes(category.id)">
        <div class="category-name">
          {{ category.name }}
        </div>
        <div v-if="category.showDescription" class="category-description">
          <p>{{ category.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { projectFirestore } from '@/Firebase/config.js';

export default {
  name: 'Home',
  data() {
    return {
      categories: []
    };
  },
  async mounted() {
    try {
      let categoriesRes = await projectFirestore.collection('categories').get();
      this.categories = categoriesRes.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        showDescription: false 
      }));
    } catch (err) {
      console.error(err.message);
    }
  },
  methods: {
    async navigateToRecipes(categoryId) {
      try {
        let category = this.categories.find(cat => cat.id === categoryId);
        if (category) {
          let recipesRes = await projectFirestore.collection('categories').doc(categoryId).collection('recipes').get();
          let recipes = recipesRes.docs.map(doc => doc.data());
          this.$router.push({ 
            name: 'CategoryRecipes', 
            params: { 
              id: categoryId
            }
          });
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    }
  }
};
</script>



<style scoped>
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

.home {
  padding: 20px;
}

.welcome-message {
  padding: 40px;
  background-color: #333;
  border-top: 2px solid #f4f4f4;
  border-bottom: 2px solid #f4f4f4;
  margin-bottom: 20px;
}

.specialties {
  text-align: center;
  color: #333;
  text-decoration: solid;
  margin-bottom: 10px;
}


.mess {
  color: #f4f4f4;
  text-decoration: solid;
  text-align: center;
}

span {
  text-decoration: solid, 2px, #f4f4f4;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.category {
  position: relative;
  flex: 1 1 300px;
  padding: 15px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, background-color 0.3s;
}

.category:hover {
  transform: scale(1.05);
  background-color: #fafafa;
}

.category-name {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  cursor: pointer;
}

.category-description {
  font-size: 16px;
  color: #555;
}

button {
  padding: 10px 15px;
  margin: 5px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #555;
  color: #fff;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #444;
}
</style>

