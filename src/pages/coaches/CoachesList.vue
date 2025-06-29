<template>
    <div>
      <base-dialog :show="!!error" title="An error Occured!" @close="handleError">
      <p>{{error}}</p>
    </base-dialog>
     <section>
       <coach-filter @change-filter="setFilters" />
     </section>
     <section>
       <base-card>
         <div class="controls">
           <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
           <base-button link to="/auth?redirect=register" v-if="!isLoggedIn">Login to Register As Coach</base-button>
           <base-button link to="/register" v-if="qualifyToRegister">Register as Coach</base-button>
         </div>
         <div v-if="isLoading">
          <base-spinner></base-spinner>
         </div>
         <ul v-else-if="hasFilteredCoaches">
           <coach-item 
             v-for="coach in filteredCoaches" :key="coach.id"
             :id="coach.id" 
             :first-name="coach.firstName" :last-name="coach.lastName" 
             :rate="coach.hourlyRate" :areas="coach.areas"
           />
         </ul>
         <h3 v-else>No coaches found</h3>
       </base-card>
     </section>
    </div>
   </template>
   
   <script>
   import CoachItem from "../../components/coaches/CoachItem.vue"
   import CoachFilter from "../../components/coaches/CoachFilter.vue"
   
   export default {
     components: {
       CoachItem,
       CoachFilter
     },
     data() {
       return {
         activeFilters: {
           frontend: true,
           backend: true,
           career: true
         },
         isLoading: false,
         error: null
       }
    },
     
     computed: {
       filteredCoaches() {
         const coaches = this.$store.getters['coaches/coaches']
         return coaches.filter(coach => {
           return (
             (this.activeFilters.frontend && coach.areas.includes('frontend')) ||
             (this.activeFilters.backend && coach.areas.includes('backend')) ||
             (this.activeFilters.career && coach.areas.includes('career'))
           )
         })
       },
       hasFilteredCoaches() {
         return !this.isLoading && this.filteredCoaches.length > 0
      },
      isCoach() {
          return this.$store.getters['coaches/isCoach']
       },
       isLoggedIn() {
        return this.$store.getters.isAuthenticated
       },
       qualifyToRegister() {
        return !this.isCoach && !this.isLoading && this.isLoggedIn
      }
          
    },
    created() {
      if (!this.$store.getters['coaches/hasCoaches']) {
        this.loadCoaches()
      }
    },
    
     methods: {
       setFilters(updatedFilters) {
         this.activeFilters = updatedFilters
       },
       async loadCoaches(refresh = false) {
         this.isLoading = true
        try {
          
          await this.$store.dispatch('coaches/loadCoaches', {forceRefresh: refresh})
        } catch (error) {
          console.log(error);
          this.error = error.message || "Something went wrong"
        } finally {

          this.isLoading = false
        }
        
       },
       handleError() {
        this.error = null
       }
     }
   }
   </script>


   

<style  scoped>
     ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>