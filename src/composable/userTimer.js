import { ref, onMounted, onUnmounted } from 'vue'

export function useTimer(initialValue = 0) {
  const time = ref(initialValue)

  let timer
  onMounted(() => {
      timer = setInterval(() => {
          time.value++
      }, 1000)
  })

  onUnmounted(() => {
      clearInterval(timer)
  })
  return { time, clearTimer () {
    time.value = 0
  } }
}