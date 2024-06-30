<template>
    <div class="registration-container">
      <h1>Registrazione</h1>
      <!-- // when the form is submitted, it prevents the default browser behavior (reload the page) and calls the handleSubmit 
        method to process the form data -->
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Nome</label>
          <input
            type="text"
            id="name"
            v-model="name"
            required
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="form-control"
          />
        </div>
        <button type="submit" class="btn btn-primary">Registrati</button>
        <button type="button" class="btn btn-google" @click="handleGoogleRegister">
          Registrati con Google
        </button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
      };
    },
    methods: {
      async handleSubmit() {
        const payload = {
          name: this.name,
          email: this.email,
          password: this.password,
        };
  
        try {
          const response = await fetch('https://appart-backend-api-endpoint/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
  
          if (!response.ok) {
            throw new Error('Registration failed');
          }
  
          const data = await response.json();
          console.log('Registration successful:', data);
          // Handle successful registration (e.g., redirect to login or dashboard)
        } catch (error) {
          console.error('Error during registration:', error);
          alert('Registration failed. Please try again.');
        }
      },
      handleGoogleRegister() {
        // Implement Google registration integration here
        console.log('Google register clicked');
      },
    },
  };
  </script>
  
  <style scoped>
  .registration-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    text-align: center;
  }
  
  h1 {
    color: #4a148c;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
    text-align: left;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    color: #4a148c;
  }
  
  .form-control {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .btn {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn-primary {
    background-color: #7b1fa2;
    color: #fff;
  }
  
  .btn-google {
    background-color: #db4437;
    color: #fff;
  }
  
  .btn-primary:hover,
  .btn-google:hover {
    opacity: 0.9;
  }
  </style>
  