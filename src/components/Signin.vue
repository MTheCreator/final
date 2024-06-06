<template>
  <div class="signup">
    <h2>Sign Up</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div class="form-group">
        <label for="diet">Diet</label>
        <div class="diet-input">
          <select v-model="selectedDiet">
            <option v-for="(diet, index) in diets" :key="index" :value="diet">{{ diet }}</option>
          </select>
        </div>
      </div>
      <button type="submit">Sign Up</button>
      <br><br>
      <button @click="GOOGLE()">Sign in Using Google</button>
    </form>
  </div>
</template>

<script>
import { setUser } from '../Firebase/userstate.js';
import { signInGoogle, projectFirestore, auth } from '../Firebase/config.js';

export default {
  data() {
    return {
      user: null,
      username: '',
      email: '',
      password: '',
      diets: [
        'Omnivore','Vegetarian','Vegan','Pescatarian','Flexitarian',
        'Fruitarian','Raw foodist','Paleo','Ketogenic (Keto)',
        'Gluten-free'
      ],
      selectedDiet: '',
    };
  },
  methods: {
    async register() {
      try {
        const userCredential = await auth.createUserWithEmailAndPassword(this.email, this.password);
        this.user = userCredential.user;
        console.log(`User ID: ${this.user.uid}`);

        const userToAdd = {
          id: this.user.uid,
          lastSignInTime: this.user.metadata.lastSignInTime,
          creationTime: this.user.metadata.creationTime,
          email: this.user.email,
          diet: this.selectedDiet, // Updated to use selectedDiet
          user_name: this.username,
        };

        await projectFirestore.collection('users_forum').doc(this.user.uid).set(userToAdd);
        console.log("User added successfully with ID:", this.user.uid);

        setUser(this.user);
        this.$router.push('/login');
      } catch (error) {
        console.error("Error creating user:", error);
      }
    },
    GOOGLE() {
      signInGoogle();
      this.$router.push('/home');
    }
  }
};
</script>

<style scoped>
.signup {
  max-width: 300px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
}

input[type="text"],
input[type="email"],
input[type="password"],
select {
  width: 100%;
  padding: 5px;
  font-size: 16px;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #333;
}

.diet-input {
  display: flex;
  gap: 10px;
}
</style>
