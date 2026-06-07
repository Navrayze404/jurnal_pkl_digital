import { useMemo, useState } from 'react'
import { CheckCircle2, Clipboard, Code2, Download, FolderTree, Globe2, ShieldCheck, UploadCloud } from 'lucide-react'
import { appsScriptCode } from './lib/appsScriptCode'

type CopyState = 'idle' | 'copied'

const folderLines = [
  'LaporanJurnalPKL/',
  '└── BulanJuni2026/',
  '    └── Minggu1/',
  '        ├── foto-Senin8Juni2026-090530.jpg',
  '        └── Rekap-Minggu1-Juni.txt',
]

const features = [
  {
    icon: UploadCloud,
    title: 'Endpoint POST siap deploy',
    description: 'Menerima foto base64, deskripsi opsional, dan timestamp dari website.',
  },
  {
    icon: FolderTree,
    title: 'Folder otomatis',
    description: 'Membuat LaporanJurnalPKL/BulanNamaBulanTahun/MingguN sesuai tanggal WIB.',
  },
  {
    icon: Code2,
    title: 'Rekap mingguan cerdas',
    description: 'File rekap dibuat atau diperbarui, entry dikelompokkan per hari dan diurutkan jam.',
  },
  {
    icon: ShieldCheck,
    title: 'Validasi & error handling',
    description: 'Validasi POST, foto kosong, base64 invalid, serta response JSON sukses/gagal.',
  },
]

function App() {
  const [copyState, setCopyState] = useState<CopyState>('idle')

  const codeStats = useMemo(() => {
    const lines = appsScriptCode.split('\n').length
    const functions = Array.from(appsScriptCode.matchAll(/^function\s+/gm)).length
    return { lines, functions }
  }, [])

  const copyCode = async () => {
    await navigator.clipboard.writeText(appsScriptCode)
    setCopyState('copied')
    window.setTimeout(() => setCopyState('idle'), 1800)
  }

  const downloadCode = () => {
    const blob = new Blob([appsScriptCode], { type: 'text/javascript;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'Code.gs'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#07120d] text-emerald-50">
      <section className="relative px-5 py-10 sm:px-8 lg:px-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#16a34a55,transparent_32%),radial-gradient(circle_at_80%_10%,#0ea5e955,transparent_28%),linear-gradient(135deg,#07120d,#0a1f16_45%,#06110d)]" />
        <div className="absolute left-1/2 top-0 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl" />

        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-5 py-4 shadow-2xl shadow-black/20 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-400 text-emerald-950 shadow-lg shadow-emerald-500/20">
              <Globe2 size={24} />
            </div>
            <div>
              <p className="text-sm text-emerald-200/80">Google Apps Script</p>
              <h1 className="font-semibold tracking-tight">Drive Upload API</h1>
            </div>
          </div>
          <button
            onClick={copyCode}
            className="hidden rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-bold text-emerald-950 transition hover:-translate-y-0.5 hover:bg-emerald-300 sm:inline-flex"
          >
            {copyState === 'copied' ? 'Tersalin!' : 'Salin Script'}
          </button>
        </nav>

        <div className="mx-auto grid max-w-7xl gap-8 py-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-100">
              <CheckCircle2 size={16} /> Siap dipasang sebagai Web App akses Anyone
            </div>
            <h2 className="max-w-4xl text-4xl font-black leading-tight tracking-[-0.04em] text-white sm:text-6xl">
              Backend API upload foto PKL ke Google Drive.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-emerald-50/72">
              Script lengkap untuk menerima upload foto base64 dari website, menyimpan ke struktur folder bulanan dan mingguan, serta memperbarui rekap jurnal mingguan secara otomatis dalam timezone Asia/Jakarta.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={copyCode}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-6 py-4 font-bold text-emerald-950 shadow-xl shadow-emerald-950/30 transition hover:-translate-y-1 hover:bg-emerald-300"
              >
                <Clipboard size={20} /> {copyState === 'copied' ? 'Kode berhasil disalin' : 'Salin kode lengkap'}
              </button>
              <button
                onClick={downloadCode}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/8 px-6 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-white/12"
              >
                <Download size={20} /> Download Code.gs
              </button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-4 shadow-2xl shadow-black/40 backdrop-blur">
            <div className="mb-3 flex items-center justify-between px-2">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-300" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <span className="text-xs text-slate-400">Code.gs</span>
            </div>
            <pre className="max-h-[560px] overflow-auto rounded-[1.35rem] bg-[#030712] p-5 text-xs leading-5 text-emerald-100 sm:text-sm">
              <code>{appsScriptCode}</code>
            </pre>
          </div>
        </div>
      </section>

      <section className="px-5 pb-14 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <article key={feature.title} className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.09]">
                <Icon className="mb-5 text-emerald-300" size={28} />
                <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-emerald-50/65">{feature.description}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">Struktur output</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white">Folder dibuat otomatis</h2>
            <div className="mt-6 rounded-3xl bg-[#03110b] p-5 font-mono text-sm leading-8 text-emerald-100 ring-1 ring-white/10">
              {folderLines.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-[2rem] border border-white/10 bg-emerald-400 p-7 text-emerald-950 shadow-xl shadow-emerald-950/20">
              <p className="text-5xl font-black tracking-tight">{codeStats.functions}</p>
              <p className="mt-2 font-bold">fungsi terkomentar dalam Bahasa Indonesia</p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 backdrop-blur">
              <p className="text-5xl font-black tracking-tight text-white">{codeStats.lines}</p>
              <p className="mt-2 text-emerald-50/70">baris kode siap paste ke Apps Script</p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 backdrop-blur">
              <p className="text-5xl font-black tracking-tight text-white">WIB</p>
              <p className="mt-2 text-emerald-50/70">timezone Asia/Jakarta untuk nama file & rekap</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-emerald-300/20 bg-emerald-300/10 p-7 backdrop-blur">
          <h2 className="text-2xl font-black text-white">Cara deploy singkat</h2>
          <ol className="mt-5 grid gap-4 text-emerald-50/80 md:grid-cols-4">
            <li><b className="text-emerald-200">1.</b> Buka script.google.com dan buat project baru.</li>
            <li><b className="text-emerald-200">2.</b> Paste kode ke file <code>Code.gs</code>.</li>
            <li><b className="text-emerald-200">3.</b> Deploy → New deployment → Web app.</li>
            <li><b className="text-emerald-200">4.</b> Execute as: Me, Who has access: Anyone.</li>
          </ol>
        </div>
      </section>
    </main>
  )
}

export default App
