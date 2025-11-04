"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface StoredFile {
  id: string
  name: string
  size: number
  type: string
  uploadedAt: string
  isPublic: boolean
  url?: string
  file?: File
}

interface FileStore {
  files: StoredFile[]
  addFile: (file: Omit<StoredFile, "id" | "uploadedAt" | "url">) => void
  removeFile: (id: string) => void
  togglePublic: (id: string) => void
  getFile: (id: string) => StoredFile | undefined
}

export const useFiles = create<FileStore>()(
  persist(
    (set, get) => ({
      files: [],
      addFile: (file) => {
        const newFile: StoredFile = {
          ...file,
          id: Math.random().toString(36).substring(7),
          uploadedAt: new Date().toISOString(),
          url: file.file ? URL.createObjectURL(file.file) : undefined,
        }
        set((state) => ({ files: [...state.files, newFile] }))
      },
      removeFile: (id) => {
        set((state) => ({ files: state.files.filter((f) => f.id !== id) }))
      },
      togglePublic: (id) => {
        set((state) => ({
          files: state.files.map((f) => (f.id === id ? { ...f, isPublic: !f.isPublic } : f)),
        }))
      },
      getFile: (id) => {
        return get().files.find((f) => f.id === id)
      },
    }),
    {
      name: "file-storage",
      partialize: (state) => ({
        files: state.files.map(({ file, url, ...rest }) => rest),
      }),
    },
  ),
)
