import { useEffect, useRef } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { gsap } from 'gsap'
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Undo2, Redo2,
  Heading1, Heading2, Heading3,
} from 'lucide-react'

// ── Toolbar button ────────────────────────────────────────────────
const Btn = ({ onClick, active, title, children }) => (
  <button
    onMouseDown={e => { e.preventDefault(); onClick() }}
    title={title}
    className={`toolbar-btn p-2 rounded-lg transition-colors duration-150 hover:bg-indigo-100 hover:text-indigo-700
      ${active ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'}`}
  >
    {children}
  </button>
)

const Divider = () => <div className="w-px h-6 bg-gray-200 mx-1 self-center" />

// ── Main component ────────────────────────────────────────────────
export default function Editor() {
  const toolbarRef = useRef(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: '<p>Empieza a escribir aquí...</p>',
    editorProps: {
      attributes: {
        class: 'prose max-w-none p-6 focus:outline-none text-gray-800 text-base leading-relaxed',
      },
    },
  })

  // GSAP stagger on toolbar buttons
  useEffect(() => {
    if (!toolbarRef.current) return
    const btns = toolbarRef.current.querySelectorAll('button, .divider-anim')
    gsap.fromTo(
      btns,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: 'power2.out', delay: 0.5 }
    )
  }, [])

  if (!editor) return null

  const groups = [
    // Text style
    [
      { icon: <Bold size={16} />,           title: 'Negrita (Ctrl+B)',  fn: () => editor.chain().focus().toggleBold().run(),          active: editor.isActive('bold') },
      { icon: <Italic size={16} />,         title: 'Cursiva (Ctrl+I)', fn: () => editor.chain().focus().toggleItalic().run(),        active: editor.isActive('italic') },
      { icon: <UnderlineIcon size={16} />,  title: 'Subrayado',        fn: () => editor.chain().focus().toggleUnderline().run(),     active: editor.isActive('underline') },
      { icon: <Strikethrough size={16} />,  title: 'Tachado',          fn: () => editor.chain().focus().toggleStrike().run(),        active: editor.isActive('strike') },
    ],
    // Headings
    [
      { icon: <Heading1 size={16} />, title: 'Título 1', fn: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: editor.isActive('heading', { level: 1 }) },
      { icon: <Heading2 size={16} />, title: 'Título 2', fn: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive('heading', { level: 2 }) },
      { icon: <Heading3 size={16} />, title: 'Título 3', fn: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: editor.isActive('heading', { level: 3 }) },
    ],
    // Alignment
    [
      { icon: <AlignLeft size={16} />,    title: 'Izquierda', fn: () => editor.chain().focus().setTextAlign('left').run(),    active: editor.isActive({ textAlign: 'left' }) },
      { icon: <AlignCenter size={16} />,  title: 'Centrar',   fn: () => editor.chain().focus().setTextAlign('center').run(),  active: editor.isActive({ textAlign: 'center' }) },
      { icon: <AlignRight size={16} />,   title: 'Derecha',   fn: () => editor.chain().focus().setTextAlign('right').run(),   active: editor.isActive({ textAlign: 'right' }) },
      { icon: <AlignJustify size={16} />, title: 'Justificar',fn: () => editor.chain().focus().setTextAlign('justify').run(), active: editor.isActive({ textAlign: 'justify' }) },
    ],
    // Lists
    [
      { icon: <List size={16} />,        title: 'Lista',          fn: () => editor.chain().focus().toggleBulletList().run(),  active: editor.isActive('bulletList') },
      { icon: <ListOrdered size={16} />, title: 'Lista numerada', fn: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive('orderedList') },
    ],
    // History
    [
      { icon: <Undo2 size={16} />, title: 'Deshacer (Ctrl+Z)', fn: () => editor.chain().focus().undo().run(), active: false },
      { icon: <Redo2 size={16} />, title: 'Rehacer (Ctrl+Y)',  fn: () => editor.chain().focus().redo().run(), active: false },
    ],
  ]

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-indigo-100">
      {/* Toolbar */}
      <div
        ref={toolbarRef}
        className="flex flex-wrap items-center gap-1 px-4 py-3 border-b border-gray-100 bg-gray-50"
      >
        {groups.map((group, gi) => (
          <div key={gi} className="flex items-center gap-1">
            {gi > 0 && <Divider />}
            {group.map((item, i) => (
              <Btn key={i} onClick={item.fn} active={item.active} title={item.title}>
                {item.icon}
              </Btn>
            ))}
          </div>
        ))}
      </div>

      {/* Editor area */}
      <EditorContent editor={editor} />

      {/* Footer */}
      <div className="px-6 py-2 border-t border-gray-100 bg-gray-50 flex justify-between text-xs text-gray-400">
        <span>TipTap + GSAP + Tailwind</span>
        <span>{editor.storage.characterCount?.characters?.() ?? ''}</span>
      </div>
    </div>
  )
}
