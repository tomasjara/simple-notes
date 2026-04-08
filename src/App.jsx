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
    // <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex flex-col items-center py-12 px-4">
    <div >
      {/* <div ref={editorRef} className="w-full max-w-4xl opacity-0"> */}
      <div ref={editorRef} >
        <Editor />
      </div>
    </div>
  )
}
