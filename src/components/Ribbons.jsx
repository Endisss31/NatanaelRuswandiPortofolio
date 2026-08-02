import React, { useEffect, useRef } from 'react'

const Ribbons = ({
  colors = ["#3B82F6"],
  baseSpring = 0.03,
  baseFriction = 0.9,
  baseThickness = 28,
  offsetFactor = 0.05,
  maxAge = 500,
  pointCount = 45,
  speedMultiplier = 0.6,
  enableFade = false,
  enableShaderEffect = false,
  effectAmplitude = 2,
}) => {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d', { alpha: true })
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.display = 'block'
    canvas.style.pointerEvents = 'none'
    container.appendChild(canvas)

    let width = container.clientWidth || window.innerWidth
    let height = container.clientHeight || window.innerHeight

    function resize() {
      if (!container) return
      width = container.clientWidth || window.innerWidth
      height = container.clientHeight || window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }

    resize()

    // Smooth interpolated mouse
    const mouse = { x: width / 2, y: height / 2 }
    const currMouse = { x: width / 2, y: height / 2 }
    let isMoving = false
    let moveTimeout

    function updateMouse(e) {
      if (!container) return
      const rect = container.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      isMoving = true
      clearTimeout(moveTimeout)
      moveTimeout = setTimeout(() => { isMoving = false }, 2500)
    }

    window.addEventListener('mousemove', updateMouse)
    window.addEventListener('resize', resize)

    // Ribbons trail points definition
    const ribbons = colors.map((color, colorIdx) => {
      const points = []
      for (let i = 0; i < pointCount; i++) {
        points.push({ x: width / 2, y: height / 2, vx: 0, vy: 0 })
      }
      return {
        color,
        points,
        spring: baseSpring + colorIdx * offsetFactor,
        friction: baseFriction,
      }
    })

    let rafId
    let time = 0

    function animate() {
      rafId = requestAnimationFrame(animate)
      time += 0.015 * speedMultiplier

      ctx.clearRect(0, 0, width, height)

      // Lerp mouse position for smooth motion
      currMouse.x += (mouse.x - currMouse.x) * 0.12
      currMouse.y += (mouse.y - currMouse.y) * 0.12

      ribbons.forEach((ribbon) => {
        const head = ribbon.points[0]

        let targetX = currMouse.x
        let targetY = currMouse.y

        if (!isMoving) {
          targetX = width / 2 + Math.sin(time * 1.5) * (width * 0.25) * (effectAmplitude * 0.5)
          targetY = height / 2 + Math.cos(time * 1.2) * (height * 0.18) * (effectAmplitude * 0.5)
        }

        // Spring acceleration to target
        head.vx += (targetX - head.x) * ribbon.spring
        head.vy += (targetY - head.y) * ribbon.spring
        head.vx *= ribbon.friction
        head.vy *= ribbon.friction

        head.x += head.vx
        head.y += head.vy

        // Smooth follow chain for subsequent points
        for (let i = 1; i < ribbon.points.length; i++) {
          const prev = ribbon.points[i - 1]
          const p = ribbon.points[i]
          p.x += (prev.x - p.x) * 0.35
          p.y += (prev.y - p.y) * 0.35
        }

        // Render ribbon with smooth quadratic bezier curves
        if (ribbon.points.length > 2) {
          ctx.beginPath()
          ctx.moveTo(ribbon.points[0].x, ribbon.points[0].y)

          for (let i = 1; i < ribbon.points.length - 1; i++) {
            const xc = (ribbon.points[i].x + ribbon.points[i + 1].x) / 2
            const yc = (ribbon.points[i].y + ribbon.points[i + 1].y) / 2
            ctx.quadraticCurveTo(ribbon.points[i].x, ribbon.points[i].y, xc, yc)
          }

          ctx.strokeStyle = ribbon.color
          ctx.lineWidth = baseThickness
          ctx.lineCap = 'round'
          ctx.lineJoin = 'round'
          ctx.globalAlpha = 0.45
          ctx.shadowBlur = 18
          ctx.shadowColor = ribbon.color
          ctx.stroke()
        }
      })
    }

    rafId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', updateMouse)
      window.removeEventListener('resize', resize)
      clearTimeout(moveTimeout)
      if (canvas && canvas.parentElement) {
        canvas.parentElement.removeChild(canvas)
      }
    }
  }, [
    colors,
    baseSpring,
    baseFriction,
    baseThickness,
    offsetFactor,
    maxAge,
    pointCount,
    speedMultiplier,
    enableFade,
    enableShaderEffect,
    effectAmplitude,
  ])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
    />
  )
}

export default Ribbons
