"use client"

import { Card } from "@/components/ui/card"
import { HardDrive, Lock, Globe } from "lucide-react"
import { useFiles } from "@/hooks/use-files"

export function StorageStats() {
  const { files } = useFiles()

  const totalSize = files.reduce((acc, file) => acc + file.size, 0)
  const publicFiles = files.filter((f) => f.isPublic).length
  const privateFiles = files.filter((f) => !f.isPublic).length

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B"
    const k = 1024
    const sizes = ["B", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Storage Overview</h3>

      <div className="space-y-4">
        {/* Total Storage */}
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
            <HardDrive className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-slate-600">Total Storage Used</p>
            <p className="text-xl font-bold text-slate-900">{formatSize(totalSize)}</p>
          </div>
        </div>

        {/* Private Files */}
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
            <Lock className="h-5 w-5 text-slate-600" />
          </div>
          <div>
            <p className="text-sm text-slate-600">Private Files</p>
            <p className="text-xl font-bold text-slate-900">{privateFiles}</p>
          </div>
        </div>

        {/* Public Files */}
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
            <Globe className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-slate-600">Public Files</p>
            <p className="text-xl font-bold text-slate-900">{publicFiles}</p>
          </div>
        </div>
      </div>

      {/* Storage Bar */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
          <span>Storage Limit</span>
          <span>5 GB</span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-cyan-600 transition-all"
            style={{ width: `${Math.min((totalSize / (5 * 1024 * 1024 * 1024)) * 100, 100)}%` }}
          />
        </div>
      </div>
    </Card>
  )
}
