<template>
     <div>
          <base-dialog :show="!!error" title="An error occured" @close="handleError">
               <p>{{ error }}</p>
          </base-dialog>
          <base-dialog fixed :show="isLoading" title="Authenticating">
               <base-spinner></base-spinner>
          </base-dialog>
          <base-card>
          <form @submit.prevent="submitForm">
               <div class="form-control">
                    <label for="email">Email</label>
                    <input type="email" id="email" placeholder="Enter your email" name="email" v-model.trim="email" />

               </div>
               <div class="form-control">
                    <label for="password">Passoword</label>
                    <input type="password" id="password" name="password" v-model.trim="password" />
               </div>
               <p v-if="!formIsValid" class="error">Please enter a valid credentials</p>
               <base-button>{{submitButtonCaption}}</base-button>
               <base-button type="button" mode="flat" @click="switchAuthMode">{{switchModeButtonCaption}}</base-button>
          </form>
     </base-card>
     </div>
</template>


<script>
export default {
     data() {
          return {
               email: '',
               password: '',
               formIsValid: true,
               mode: 'login',
               isLoading: false,
               error: null
          }
     },

     computed: {
          submitButtonCaption() {
               return this.mode === 'login' ? "Login" : "Signup";
          },
          switchModeButtonCaption() {
               return this.mode === 'login' ? "Signup Instead" : "Login Instead";
          }

     },
     methods: {
          async submitForm() {
               this.formIsValid = true
               if (this.email === "" || !this.email.includes('@') || this.password.length < 6) {
                    this.formIsValid = false
                    return
               }

               this.isLoading = true

             try {
               if (this.mode === 'login') {
                    await this.$store.dispatch('login', {
                         email: this.email,
                         password: this.password
                    })
                    
               } else {
                   await  this.$store.dispatch('signup', {
                         email: this.email,
                         password: this.password
                   })
                  }
                  const redirectUrl = '/' + (this.$route.query.redirect || 'coaches')
                  this.$router.replace(redirectUrl)
             } catch (error) {
                  console.log(error);
               this.error = error.message || "Failed to authenticated Please try again."
             } finally {
                  this.isLoading = false
             }

          },
          switchAuthMode() {
               if (this.mode === 'login') {
                    this.mode = 'signup'
               } else {
                    this.mode = 'login'
               }
          },
          handleError() {
               this.error = null
          }

     },
}
</script>


<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.error {
     text-align: center;
     color: red;
}

</style>