"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, FileText, Music, Archive, File } from "lucide-react"
import type { StoredFile } from "@/hooks/use-files"
import Image from "next/image"

interface FilePreviewDialogProps {
  file: StoredFile | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FilePreviewDialog({ file, open, onOpenChange }: FilePreviewDialogProps) {
  if (!file) return null

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

  const renderPreview = () => {
    if (!file.url) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <File className="h-16 w-16 text-slate-400 mb-4" />
          <p className="text-sm text-slate-600">Preview not available</p>
        </div>
      )
    }

    // Image preview
    if (file.type.startsWith("image/")) {
      return (
        <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden">
          <Image src={file.url || "/placeholder.svg"} alt={file.name} fill className="object-contain" />
        </div>
      )
    }

    // Video preview
    if (file.type.startsWith("video/")) {
      return (
        <video src={file.url} controls className="w-full rounded-lg bg-slate-900">
          Your browser does not support the video tag.
        </video>
      )
    }

    // Audio preview
    if (file.type.startsWith("audio/")) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 mb-6">
            <Music className="h-10 w-10 text-blue-600" />
          </div>
          <audio src={file.url} controls className="w-full max-w-md">
            Your browser does not support the audio tag.
          </audio>
        </div>
      )
    }

    // Text preview
    if (file.type.startsWith("text/")) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 mb-6">
            <FileText className="h-10 w-10 text-slate-600" />
          </div>
          <p className="text-sm text-slate-600">Text file preview</p>
          <Button onClick={handleDownload} className="mt-4">
            <Download className="h-4 w-4 mr-2" />
            Download to view
          </Button>
        </div>
      )
    }

    // Default preview for other file types
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 mb-6">
          <Archive className="h-10 w-10 text-slate-600" />
        </div>
        <p className="text-sm text-slate-600 mb-2">{file.type || "Unknown file type"}</p>
        <Button onClick={handleDownload} className="mt-4">
          <Download className="h-4 w-4 mr-2" />
          Download file
        </Button>
      </div>
    )
  }

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B"
    const k = 1024
    const sizes = ["B", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="truncate pr-8">{file.name}</span>
            <Button variant="ghost" size="sm" onClick={handleDownload} className="flex-shrink-0">
              <Download className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">{renderPreview()}</div>

        <div className="mt-4 flex items-center justify-between text-sm text-slate-600 border-t pt-4">
          <span>Size: {formatSize(file.size)}</span>
          <span>Type: {file.type || "Unknown"}</span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
