<template>
  <div v-html="title"></div>

  <h2> Today coffee : </h2>  
  <button @click="count++">Add</button>
  <button @click="count--">Remove</button>
  <button v-on:click="increment" class="button-dark">One more?</button>
  <span :style="{ color: count > 4 ? '#ff0000' : ''}" :class="`color-${count} ml-5`">{{ count }}</span>

  <div class="mt-3" v-show="count > 4">
    <p>Wow, you drank {{ count }} cups of coffee today! It's enough to keep you awake for the next {{ Math.floor(4.8 * count) }} hours.</p>
  </div>

  <div class="mt-3" v-if="count > 10">
    <p>You're a coffee addict! Drinking {{ count }} cups of coffee is a serious commitment. Are you sure you're not addicted?</p>
  </div>

  <div class="mt-3" v-else-if="count == 2">
    <p>Perfect! You're drinking just the right amount of coffee. It's good for your health and your productivity.</p>
  </div>


  <div>
    <h2>Vue Syntaxe</h2>
    <p>Vue.js is a progressive JavaScript framework for building user interfaces. It's designed to be incrementally adoptable, meaning you can start with just a few components and add more as your application grows.</p>
  </div>


</template>

<script setup>
import { ref } from 'vue'

const lastname = 'Tillet'
const firstName = 'Tony'

const title = '<h1>Hello, Tony Tillet</h1>'

const count = ref(0)

const increment = () => {
  count.value++
}

</script>

<style>

/* Reset default styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: #080d10;
  color: #fff;
  line-height: 1.6;
  padding: 2rem;
}

/* Margin classes */
.m-1 {
  margin: 0.25rem;
}

.m-2 {
  margin: 0.5rem;
}

.m-3 {
  margin: 1rem;
}

.m-4 {
  margin: 1.5rem;
}

.m-5 {
  margin: 3rem;
}

/* Padding classes */
.p-1 {
  padding: 0.25rem;
}

.p-2 {
  padding: 0.5rem;
}

.p-3 {
  padding: 1rem;
}

.p-4 {
  padding: 1.5rem;
}

.p-5 {
  padding: 3rem;
}

/* Margin-top classes */
.mt-1 {
  margin-top: 0.25rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

.mt-3 {
  margin-top: 1rem;
}

.mt-4 {
  margin-top: 1.5rem;
}

.mt-5 {
  margin-top: 3rem;
}

/* Margin-bottom classes */
.mb-1 {
  margin-bottom: 0.25rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.mb-3 {
  margin-bottom: 1rem;
}

.mb-4 {
  margin-bottom: 1.5rem;
}

.mb-5 {
  margin-bottom: 3rem;
}

/* Margin-x (left & right) classes */
.mx-1 {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}

.mx-2 {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

.mx-3 {
  margin-left: 1rem;
  margin-right: 1rem;
}

.mx-4 {
  margin-left: 1.5rem;
  margin-right: 1.5rem;
}

.mx-5 {
  margin-left: 3rem;
  margin-right: 3rem;
}

/* Margin-left classes */
.ml-1 {
  margin-left: 0.25rem;
}

.ml-2 {
  margin-left: 0.5rem;
}

.ml-3 {
  margin-left: 1rem;
}

.ml-4 {
  margin-left: 1.5rem;
}

.ml-5 {
  margin-left: 3rem;
}

/* Margin-right classes */
.mr-1 {
  margin-right: 0.25rem;
}

.mr-2 {
  margin-right: 0.5rem;
}

.mr-3 {
  margin-right: 1rem;
}

.mr-4 {
  margin-right: 1.5rem;
}

.mr-5 {
  margin-right: 3rem;
}

/* Padding-left classes */
.pl-1 {
  padding-left: 0.25rem;
}

.pl-2 {
  padding-left: 0.5rem;
}

.pl-3 {
  padding-left: 1rem;
}

.pl-4 {
  padding-left: 1.5rem;
}

.pl-5 {
  padding-left: 3rem;
}

/* Padding-right classes */
.pr-1 {
  padding-right: 0.25rem;
}

.pr-2 {
  padding-right: 0.5rem;
}

.pr-3 {
  padding-right: 1rem;
}

.pr-4 {
  padding-right: 1.5rem;
}

.pr-5 {
  padding-right: 3rem;
}


/* Container styles */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Button styles */
button {
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
  padding: 0.8rem 1.5rem;
  margin: 0.5rem;
  background: linear-gradient(135deg, #ff7a00, #ff4d00);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 122, 0, 0.4);
  background: linear-gradient(135deg, #ff8c24, #ff6224);
}

button:active {
  transform: translateY(1px);
}

/* Dark button styles */
.button-dark {
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
  padding: 0.8rem 1.5rem;
  margin: 0.5rem;
  background: linear-gradient(135deg, #2c2c2c, #1a1a1a);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.button-dark:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
  background: linear-gradient(135deg, #3c3c3c, #2a2a2a);
}

.button-dark:active {
  transform: translateY(1px);
}

/* Color classes */
.color-3 {
  color: #ff7a00;
}

.color-4 {
  color: #ff4d00;
}

/* Header styles */
h1 {
  font-size: 4rem;
  font-weight: 700;
  background: linear-gradient(to right, #fff, #888);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 2rem 0 2rem;
}

h2 {
  font-size: 3rem;
  background: linear-gradient(to right, #fff, #ff8c24);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 2rem 0 1rem;
}

/* Text styles */
p {
  font-size: 1.25rem;
  color: white;
  margin-bottom: 1rem;
}

/* Counter styles */
span {
  font-size: 3rem;
  font-weight: 600;
  color: #fff;
  display: inline-block;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.1);
}

/* Hover effects */
span:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

/* Responsive design */
@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }
  
  p {
    font-size: 1rem;
  }
  
  span {
    font-size: 2rem;
  }
}

</style>