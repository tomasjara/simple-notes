import { useMemo, useState } from 'react'

const STORAGE_KEY = 'simple-notes-editor'

function loadStoredDoc() {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  EyeOff,
  Eye,
} from 'lucide-react'

const Btn = ({ active, title, onClick, children }) => (
  <button
    type="button"
    title={title}
    onMouseDown={(e) => {
      e.preventDefault()
      onClick()
    }}
    className={`inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
      active
        ? 'bg-gray-900 text-white'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`}
  >
    {children}
  </button>
)

export default function Editor() {
  const [compact, setCompact] = useState(false)
  const initialContent = useMemo(() => loadStoredDoc() ?? '<p></p>', [])

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Escribe...',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor: ed }) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ed.getJSON()))
      } catch {
        /* ignore quota / private mode */
      }
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-slate max-w-none focus:outline-none min-h-[100dvh] px-5 py-6 sm:px-8 sm:py-10 text-gray-900 text-[16px] leading-7',
      },
    },
  })

  if (!editor) return null

  return (
    <div className="min-h-[100dvh] bg-white text-gray-900">
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-5xl flex-col">
        {!compact && (
          <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/90 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
              <div className="flex flex-wrap items-center gap-1">
                <Btn
                  title="Negrita"
                  active={editor.isActive('bold')}
                  onClick={() => editor.chain().focus().toggleBold().run()}
                >
                  <Bold size={16} />
                </Btn>
                <Btn
                  title="Cursiva"
                  active={editor.isActive('italic')}
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                  <Italic size={16} />
                </Btn>
                <Btn
                  title="Tachado"
                  active={editor.isActive('strike')}
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                >
                  <Strikethrough size={16} />
                </Btn>

                <span className="mx-2 h-6 w-px bg-gray-200" />

                <Btn
                  title="H1"
                  active={editor.isActive('heading', { level: 1 })}
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                >
                  <Heading1 size={16} />
                </Btn>
                <Btn
                  title="H2"
                  active={editor.isActive('heading', { level: 2 })}
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                >
                  <Heading2 size={16} />
                </Btn>
                <Btn
                  title="Lista"
                  active={editor.isActive('bulletList')}
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                  <List size={16} />
                </Btn>
                <Btn
                  title="Lista numerada"
                  active={editor.isActive('orderedList')}
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >
                  <ListOrdered size={16} />
                </Btn>

                <span className="mx-2 h-6 w-px bg-gray-200" />

                <Btn
                  title="Izquierda"
                  active={editor.isActive({ textAlign: 'left' })}
                  onClick={() => editor.chain().focus().setTextAlign('left').run()}
                >
                  <AlignLeft size={16} />
                </Btn>
                <Btn
                  title="Centro"
                  active={editor.isActive({ textAlign: 'center' })}
                  onClick={() => editor.chain().focus().setTextAlign('center').run()}
                >
                  <AlignCenter size={16} />
                </Btn>
                <Btn
                  title="Derecha"
                  active={editor.isActive({ textAlign: 'right' })}
                  onClick={() => editor.chain().focus().setTextAlign('right').run()}
                >
                  <AlignRight size={16} />
                </Btn>
                <Btn
                  title="Justificado"
                  active={editor.isActive({ textAlign: 'justify' })}
                  onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                >
                  <AlignJustify size={16} />
                </Btn>
              </div>

              <button
                type="button"
                onClick={() => setCompact(true)}
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-gray-200 px-3 text-sm text-gray-700 hover:bg-gray-50"
              >
                <EyeOff size={16} />
                Modo lectura
              </button>
            </div>
          </header>
        )}

        {compact && (
          <button
            type="button"
            onClick={() => setCompact(false)}
            className="fixed right-4 top-4 z-30 inline-flex h-10 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 text-sm shadow-sm"
          >
            <Eye size={16} />
            Mostrar barra
          </button>
        )}

        <main className="flex-1">
          <EditorContent editor={editor} />
        </main>
      </div>
    </div>
  )
}