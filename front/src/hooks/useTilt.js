import { useRef } from 'react'

function useTilt() {
  const ref = useRef(null)

  function handleMouseMove(e) {
    const card = ref.current
    if (!card) return

    const { left, top, width, height } = card.getBoundingClientRect()
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    const rotateX = (y - 0.5) * -15
    const rotateY = (x - 0.5) * 15

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
  }

  function handleMouseLeave() {
    const card = ref.current
    if (!card) return
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    card.style.transition = 'transform 0.5s ease'
  }

  function handleMouseEnter() {
    const card = ref.current
    if (!card) return
    card.style.transition = 'transform 0.1s ease'
  }

  return { ref, handleMouseMove, handleMouseLeave, handleMouseEnter }
}

export default useTilt