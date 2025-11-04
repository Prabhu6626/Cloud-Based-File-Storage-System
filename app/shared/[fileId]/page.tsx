"use client"

import { use } from "react"
import { useFiles } from "@/hooks/use-files"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Lock, Cloud } from "lucide-react"
import { notFound } from "next/navigation"
import Image from "next/image"

export default function SharedFilePage({
  params,
}: {
  params: Promise<{ fileId: string }>
}) {
  const { fileId } = use(params)
  const { getFile } = useFiles()
  const file = getFile(fileId)

  if (!file) {
    notFound()
  }

  if (!file.isPublic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="max-w-md p-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mx-auto mb-4">
            <Lock className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h1>
          <p className="text-slate-600">This file is private and cannot be accessed.</p>
        </Card>
      </div>
    )
  }

  const handleDownload = () => {
    if (file.url) {
      const link = document.createElement("a")
      link.href = file.url
      link.download = file.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600">
              <Cloud className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">CloudStore</h1>
              <p className="text-xs text-slate-600">Shared File</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{file.name}</h2>
            <p className="text-sm text-slate-600">
              Size: {(file.size / 1024).toFixed(2)} KB • Type: {file.type}
            </p>
          </div>

          {file.url && file.type.startsWith("image/") && (
            <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden mb-6">
              <Image src={file.url || "/placeholder.svg"} alt={file.name} fill className="object-contain" />
            </div>
          )}

          <Button onClick={handleDownload} className="w-full bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Download File
          </Button>
        </Card>
      </main>
    </div>
  )
}
