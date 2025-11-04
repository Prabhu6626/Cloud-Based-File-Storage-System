"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  File,
  ImageIcon,
  FileText,
  Music,
  Video,
  Archive,
  MoreVertical,
  Download,
  Trash2,
  Lock,
  Globe,
  Eye,
} from "lucide-react"
import { useFiles, type StoredFile } from "@/hooks/use-files"
import { useToast } from "@/hooks/use-toast"
import { formatDistanceToNow } from "date-fns"
import { FilePreviewDialog } from "@/components/file-preview-dialog"

export function FileList() {
  const { files, removeFile, togglePublic } = useFiles()
  const { toast } = useToast()
  const [selectedFile, setSelectedFile] = useState<StoredFile | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return ImageIcon
    if (type.startsWith("video/")) return Video
    if (type.startsWith("audio/")) return Music
    if (type.startsWith("text/") || type.includes("pdf")) return FileText
    if (type.includes("zip") || type.includes("rar")) return Archive
    return File
  }

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B"
    const k = 1024
    const sizes = ["B", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
  }

  const handleDelete = (id: string, name: string) => {
    removeFile(id)
    toast({
      title: "File deleted",
      description: `${name} has been removed from storage`,
    })
  }

  const handleTogglePublic = (id: string, name: string, isPublic: boolean) => {
    togglePublic(id)
    toast({
      title: isPublic ? "File made private" : "File made public",
      description: `${name} is now ${isPublic ? "private" : "public"}`,
    })
  }

  const handleDownload = (file: StoredFile) => {
    if (file.url) {
      const link = document.createElement("a")
      link.href = file.url
      link.download = file.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      toast({
        title: "Download started",
        description: `Downloading ${file.name}`,
      })
    }
  }

  const handlePreview = (file: StoredFile) => {
    setSelectedFile(file)
    setPreviewOpen(true)
  }

  if (files.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <File className="h-8 w-8 text-slate-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">No files yet</h3>
            <p className="text-sm text-slate-600 mt-1">Upload your first file to get started</p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">My Files ({files.length})</h3>
        </div>

        <div className="space-y-2">
          {files.map((file) => {
            const Icon = getFileIcon(file.type)
            return (
              <div
                key={file.id}
                className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors"
              >
                {/* File Icon */}
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 flex-shrink-0">
                  <Icon className="h-5 w-5 text-blue-600" />
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-slate-900 truncate">{file.name}</p>
                    <Badge variant={file.isPublic ? "default" : "secondary"} className="flex-shrink-0">
                      {file.isPublic ? (
                        <>
                          <Globe className="h-3 w-3 mr-1" />
                          Public
                        </>
                      ) : (
                        <>
                          <Lock className="h-3 w-3 mr-1" />
                          Private
                        </>
                      )}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-xs text-slate-600">{formatSize(file.size)}</p>
                    <span className="text-slate-300">•</span>
                    <p className="text-xs text-slate-600">
                      {formatDistanceToNow(new Date(file.uploadedAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button variant="ghost" size="sm" onClick={() => handlePreview(file)}>
                    <Eye className="h-4 w-4" />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleTogglePublic(file.id, file.name, file.isPublic)}>
                        {file.isPublic ? (
                          <>
                            <Lock className="h-4 w-4 mr-2" />
                            Make Private
                          </>
                        ) : (
                          <>
                            <Globe className="h-4 w-4 mr-2" />
                            Make Public
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDownload(file)}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleDelete(file.id, file.name)} className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      <FilePreviewDialog file={selectedFile} open={previewOpen} onOpenChange={setPreviewOpen} />
    </>
  )
}
