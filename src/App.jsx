import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Editor from './components/Editor'

export default function App() {
  const headerRef = useRef(null)
  const editorRef = useRef(null)

  useEffect(() => {
    // GSAP entrance animation
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(
      headerRef.current,
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: 0.7 }
    ).fromTo(
      editorRef.current,
      { opacity: 0, y: 30, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6 },
      '-=0.3'
    )
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex flex-col items-center py-12 px-4">
      {/* Header */}
      <div ref={headerRef} className="mb-8 text-center opacity-0">
        <h1 className="text-4xl font-bold text-white tracking-tight">
          ✏️ Editor de Texto
        </h1>
        <p className="text-indigo-300 mt-2 text-sm">
          React · TipTap · GSAP · Tailwind CSS
        </p>
      </div>

      {/* Editor card */}
      <div ref={editorRef} className="w-full max-w-4xl opacity-0">
        <Editor />
      </div>
    </div>
  )
}
