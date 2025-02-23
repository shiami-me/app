"use client"
import { useEffect, useRef } from 'react'
import { useTheme } from "next-themes"

export const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size with device pixel ratio for sharp rendering
    const pixelRatio = window.devicePixelRatio || 1
    const setCanvasSize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth * pixelRatio
      canvas.height = window.innerHeight * pixelRatio
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(pixelRatio, pixelRatio)
    }
    setCanvasSize()

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      update: () => void;
      draw: () => void;
    }> = []
    
    const particleCount = 100
    
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      
      constructor() {
        this.x = Math.random() * (canvas?.width || 0) / pixelRatio
        this.y = Math.random() * (canvas?.height || 0) / pixelRatio
        this.size = Math.random() * 2 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
      }

      update() {
        if (!canvas) return
        this.x += this.speedX
        this.y += this.speedY

        const width = canvas.width / pixelRatio
        const height = canvas.height / pixelRatio

        if (this.x > width) this.x = 0
        if (this.x < 0) this.x = width
        if (this.y > height) this.y = 0
        if (this.y < 0) this.y = height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = theme === 'dark' 
          ? 'rgba(74, 222, 128, 0.1)' 
          : 'rgba(22, 163, 74, 0.15)'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width / pixelRatio, canvas.height / pixelRatio)
      
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      particles.forEach(particleA => {
        particles.forEach(particleB => {
          const dx = particleA.x - particleB.x
          const dy = particleA.y - particleB.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            ctx.strokeStyle = theme === 'dark'
              ? `rgba(74, 222, 128, ${0.15 - distance/1000})`
              : `rgba(22, 163, 74, ${0.2 - distance/1000})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particleA.x, particleA.y)
            ctx.lineTo(particleB.x, particleB.y)
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      setCanvasSize()
      particles.length = 0
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [theme]) // Add theme as dependency to update colors when theme changes

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  )
}
