<template>
  <div v-html="title"></div>

  <h2> Hi, I'm Tony Tillet and you are 
    <input type="text" v-model="name" class="form-input transparent-input" placeholder="Enter your name">
  </h2>

  <section>
    <h3> Timer </h3>
    <p> Wait for it... {{ time }} </p>

    <button class="btn-dark" @click="clearTimer" v-if="time > 10"> Long time you've been waiting for this? </button>
  </section>
  

  <section>
  <h3> {{ name }} Tel me how many cups of coffee you drank today : </h3>  
  <button @click="count++">Add</button>
  <button @click="count--">Remove</button>
  <button v-on:click="increment" class="button-dark">The truth is out there</button>
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
</section>

<section>
  <div>
    <h3>My Top Series</h3>
    <div class="flex justify-center">
      <button class="sm-btn" @click="sortSeries">Sort by rating</button>
    </div>
    
    <ul>
      <li v-for="serie in topSeries" :key="serie.title">
        <div class="flex justify-between align-center">
          <div class="flex flex-column">
            <h4>{{ serie.title }}</h4>
            <p mb-0>{{ serie.year }} - {{ serie.rating }} / 10</p>
          </div>
          <div class="flex flex-column">
            <button class="sm-btn btn-dark" @click="deleteSerie(serie.title)">I don't approve</button>
            <button class="sm-btn" @click="approveSerie(serie.title)">Damn, it's good!</button>
          </div>
        </div>
      </li>
    </ul>
  </div>

  <div>
    <h3>Tell me your favorite serie</h3>
    <form class="form-container" @submit.prevent="addSerie">
      <div v-if="errorMessage" class="form-error">
        <p class="error-message">{{ errorMessage }}</p>
      </div>
      <div class="form-group">
        <label class="form-label" for="serie-title">Serie Title</label>
        <input class="form-input" type="text" id="serie-title" v-model="newSerie" placeholder="Enter the title of your favorite serie">
      </div>
      <div class="form-group">
        <label class="form-label" for="serie-year">Year</label>
        <input class="form-input" type="number" id="serie-year" v-model="newSerieYear" placeholder="Enter the year of your favorite serie">
      </div>
      <div class="form-group">
        <label class="form-label" for="serie-rating">Rating</label>
        <input class="form-input" step="0.5" type="number" id="serie-rating" v-model="newSerieRating" placeholder="Enter the rating of your favorite serie">
      </div>
      <div class="form-group">
        <button class="form-submit">Add</button>
      </div>
      
    </form>
  </div>
</section>



</template>

<script setup>
import { computed, ref , watch, watchEffect } from 'vue'
import { useTimer } from './composable/userTimer'
const page = ref({
  title: 'Home',
})

const name = ref('')

// watch is for when you want to watch a reactive object
watch(() => page.value.title, (newTitle, oldTitle) => {
  document.title = `Hello ${newTitle}`
}, {once: true})

// watchEffect is for when you want to watch a reactive object
watchEffect(() => {
  document.title = `Hello ${name.value}`
})
// Computed is for deriving a value from reactive data and caching the result until dependencies change
// Watch is for side effects and reacting to data changes without caching
// Examples:
// - Computed: Filtering a todo list, calculating totals, formatting data
// - Watch: Making API calls, updating DOM, triggering side effects when data changes
// The Trello example would actually be better with computed for derived board data
// And drag/drop would use watch to handle side effects of position changes

const {time, clearTimer} = useTimer()


const title = '<h1>Welcome to my Vue.js demo project</h1>'

const count = ref(0)
const newSerie = ref('')
const newSerieYear = ref('')
const newSerieRating = ref('')
const errorMessage = ref('')

const increment = () => {
  count.value++
}

const topSeries = ref([
  {
    title: 'Breaking Bad',
    year: 2008,
    rating: 7.5
  }, 
  { 
    title: 'Lucifer',
    year: 2016,
    rating: 8.5
  },
  {
    title: 'The Office',
    year: 2005,
    rating: 8.5
  },
  {
    title: 'The Mentalist',
    year: 2008,
    rating: 9.5
  }
])

const deleteSerie = (serie) => {
  topSeries.value = topSeries.value.filter(s => s.title !== serie)
}

const sortSeries = (serie) => {
  topSeries.value = topSeries.value.sort((a, b) => b.rating - a.rating)
}

const addSerie = () => {
  const existingSerie = topSeries.value.find(s => s.title.toLowerCase() === newSerie.value.toLowerCase())

  if (!newSerie.value) {
    errorMessage.value = 'Please enter a valid serie title'
    return
  }

  if (existingSerie) {
    errorMessage.value = 'This series is already in the list!'
    return
  }
  
  errorMessage.value = ''
  topSeries.value.push({
    title: newSerie.value,
    year: newSerieYear.value,
    rating: newSerieRating.value
  })
  
  newSerie.value = ''
  newSerieYear.value = ''
  newSerieRating.value = ''
}

</script>

<style>

/* Reset default styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

h1{
text-align: center;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: #080d10;
  color: #fff;
  line-height: 1.6;
  padding: 2rem;
}

/* Section styles */
section {
  margin: 3rem 0;
  padding: 2.5rem;
  background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
  border-radius: 1.5rem;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

section:hover {
  transform: translateY(-4px);
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.04));
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
}

section h3 {
  background: linear-gradient(to right, #fff, #ff8c24);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem;
}

section p {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
}


/* Basics flex styles */
.flex {
  display: flex;
}
.flex-column {
  flex-direction: column;
}
.justify-between {
  justify-content: space-between;
}

.justify-center {
  justify-content: center;
}

.justify-end {
  justify-content: flex-end;
}
.align-center {
  align-items: center;
}
.align-content-center {
  align-content: center;
}

/* Form styles */
.form-container {
  max-width: 100%;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #fff;
}

.form-input.transparent-input {
  font-size: 3rem;
  background: transparent;
  border: none;
  color: #fff;
  margin: 0;
  padding: 0 1rem;
  width: auto;
  display: inline-block;
  background: linear-gradient(to right, #fff, #ff8c24);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.form-input {
  width: 100%;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #ff7a00;
  box-shadow: 0 0 0 2px rgba(255, 122, 0, 0.2);
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
}

.form-error {
  color: #ff4d4d;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.form-submit {
  width: 100%;
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  padding: 1rem;
  background: linear-gradient(135deg, #ff7a00, #ff4d00);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.form-submit:hover {
  background: linear-gradient(135deg, #ff8c24, #ff6224);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 122, 0, 0.4);
}

.form-submit:active {
  transform: translateY(1px);
}

.form-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}



/* List styles */
ul {
  list-style: none;
  padding: 1rem;
  margin: 1rem 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.1);
}

li {
  font-size: 1.1rem;
  color: #fff;
  padding: 0.8rem 1.2rem;
  margin: 0.5rem 0;
  background: linear-gradient(135deg, rgba(255,122,0,0.2), rgba(255,77,0,0.1));
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

li:hover {
  transform: translateX(5px);
  background: linear-gradient(135deg, rgba(255,140,36,0.3), rgba(255,98,36,0.2));
  box-shadow: 0 2px 10px rgba(255, 122, 0, 0.2);
}

li:first-child {
  margin-top: 0;
}

li:last-child {
  margin-bottom: 0;
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

.sm-btn {
  font-size: 0.8rem;
  padding: 0.5rem 1rem;
  margin: 0.25rem;
}

.btn-dark {
  background: linear-gradient(135deg, #2c2c2c, #1a1a1a);
}

.btn-dark:hover {
  background: linear-gradient(135deg, #3c3c3c, #2a2a2a);
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

h3 {
  font-size: 2rem;
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