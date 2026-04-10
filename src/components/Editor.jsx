import { useMemo, useState } from 'react'
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
  Sun,
  Moon,
  Sparkles,
} from 'lucide-react'
import { THEMES, useTheme } from '../context/ThemeContext.jsx'

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

const THEME_ICONS = { light: Sun, dark: Moon, midnight: Sparkles }

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  return (
    <div
      className="flex rounded-lg border border-theme-border bg-theme-surface p-0.5"
      role="group"
      aria-label="Tema de la interfaz"
    >
      {THEMES.map(({ id, label }) => {
        const Icon = THEME_ICONS[id]
        const selected = theme === id
        return (
          <button
            key={id}
            type="button"
            title={label}
            onClick={() => setTheme(id)}
            className={`inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium transition-colors sm:px-3 ${
              selected
                ? 'bg-theme-fg text-theme-bg'
                : 'text-theme-fg-muted hover:bg-theme-bg hover:text-theme-fg'
            }`}
          >
            <Icon size={14} aria-hidden />
            <span className="hidden sm:inline">{label}</span>
          </button>
        )
      })}
    </div>
  )
}

const Btn = ({ active, title, onClick, children }) => (
  <button
    type="button"
    title={title}
    onMouseDown={(e) => {
      e.preventDefault()
      onClick()
    }}
    className={`toolbar-btn inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
      active
        ? 'is-active'
        : 'text-theme-fg-muted hover:bg-theme-surface hover:text-theme-fg'
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
          'max-w-none focus:outline-none min-h-[100dvh] px-5 py-6 sm:px-8 sm:py-10 text-theme-fg text-[16px] leading-7',
      },
    },
  })

  if (!editor) return null

  return (
    <div className="min-h-[100dvh] bg-theme-bg text-theme-fg">
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-5xl flex-col">
        {!compact && (
          <header className="sticky top-0 z-20 border-b border-theme-border bg-theme-bg/90 backdrop-blur">
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

                <span className="mx-2 h-6 w-px bg-theme-border" />

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
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                >
                  <ListOrdered size={16} />
                </Btn>

                <span className="mx-2 h-6 w-px bg-theme-border" />

                <Btn
                  title="Izquierda"
                  active={editor.isActive({ textAlign: 'left' })}
                  onClick={() =>
                    editor.chain().focus().setTextAlign('left').run()
                  }
                >
                  <AlignLeft size={16} />
                </Btn>
                <Btn
                  title="Centro"
                  active={editor.isActive({ textAlign: 'center' })}
                  onClick={() =>
                    editor.chain().focus().setTextAlign('center').run()
                  }
                >
                  <AlignCenter size={16} />
                </Btn>
                <Btn
                  title="Derecha"
                  active={editor.isActive({ textAlign: 'right' })}
                  onClick={() =>
                    editor.chain().focus().setTextAlign('right').run()
                  }
                >
                  <AlignRight size={16} />
                </Btn>
                <Btn
                  title="Justificado"
                  active={editor.isActive({ textAlign: 'justify' })}
                  onClick={() =>
                    editor.chain().focus().setTextAlign('justify').run()
                  }
                >
                  <AlignJustify size={16} />
                </Btn>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <ThemeSwitcher />
                <button
                  type="button"
                  onClick={() => setCompact(true)}
                  className="inline-flex h-9 items-center gap-2 rounded-lg border border-theme-border bg-theme-bg px-3 text-sm text-theme-fg hover:bg-theme-surface"
                >
                  <EyeOff size={16} />
                  Modo lectura
                </button>
              </div>
            </div>
          </header>
        )}

        {compact && (
          <button
            type="button"
            onClick={() => setCompact(false)}
            className="fixed right-4 top-4 z-30 inline-flex h-10 items-center gap-2 rounded-full border border-theme-border bg-theme-bg px-4 text-sm text-theme-fg shadow-sm hover:bg-theme-surface"
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
