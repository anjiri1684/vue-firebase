<template>
     <div class="notfound-container">
       <div class="notfound-illustration">
         <!-- Inline SVG illustration -->
         <svg viewBox="0 0 500 500" class="svg-image" xmlns="http://www.w3.org/2000/svg">
           <circle cx="250" cy="250" r="200" fill="#E5E7EB" />
           <path d="M200 180 h100 v20 h-100zM180 220 h140 v20 h-140zM160 260 h180 v20 h-180z" fill="#9CA3AF" />
           <circle cx="180" cy="140" r="10" fill="#EF4444" />
           <circle cx="210" cy="140" r="10" fill="#F59E0B" />
           <circle cx="240" cy="140" r="10" fill="#10B981" />
         </svg>
       </div>
   
       <div class="notfound-content">
         <h1 class="notfound-code animate-float">404</h1>
         <p class="notfound-message animate-fade-in">We couldn’t find that page.</p>
         <router-link to="/" class="notfound-link animate-fade-in-delay">← Go back home</router-link>
       </div>
     </div>
   </template>
   
   <script setup>
   // No runtime logic
   </script>
   
   <style scoped>
   /* Layout */
   .notfound-container {
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;
     min-height: 100vh;
     background: linear-gradient(135deg, #f9fafb, #e2e8f0);
     padding: 2rem;
     color: #1a202c;
     text-align: center;
     overflow: hidden;
   }
   
   @media (min-width: 768px) {
     .notfound-container {
       flex-direction: row;
       text-align: left;
     }
   
     .notfound-illustration {
       flex: 1;
       max-width: 400px;
       margin-right: 2rem;
     }
   
     .notfound-content {
       flex: 1;
     }
   }
   
   /* SVG */
   .svg-image {
     width: 100%;
     max-width: 320px;
     margin-bottom: 2rem;
   }
   
   /* Text & Button */
   .notfound-code {
     font-size: 5rem;
     margin: 0;
     font-weight: 800;
     color: #ef4444;
     animation: float 3s ease-in-out infinite;
   }
   
   .notfound-message {
     font-size: 1.4rem;
     margin: 1rem 0;
     opacity: 0;
   }
   
   .notfound-link {
     display: inline-block;
     margin-top: 1.5rem;
     padding: 0.75rem 1.6rem;
     background: #1a202c;
     color: #ffffff;
     text-decoration: none;
     border-radius: 6px;
     font-weight: 600;
     transition: transform 0.2s ease, box-shadow 0.2s ease;
     box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
     opacity: 0;
   }
   
   .notfound-link:hover {
     transform: translateY(-2px);
     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
   }
   
   /* Animations */
   @keyframes float {
     0%, 100% {
       transform: translateY(0);
     }
     50% {
       transform: translateY(-10px);
     }
   }
   
   @keyframes fadeIn {
     to {
       opacity: 1;
     }
   }
   
   .animate-fade-in {
     animation: fadeIn 0.8s ease-out 0.4s forwards;
   }
   
   .animate-fade-in-delay {
     animation: fadeIn 0.8s ease-out 0.8s forwards;
   }
   </style>
   