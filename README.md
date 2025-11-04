# CloudStore - Cloud-Based File Storage System

A modern, secure file storage system built with Next.js that demonstrates cloud storage concepts similar to Google Drive. Upload, manage, and share files with public/private access controls.

![CloudStore](https://placeholder.svg?height=400&width=800&query=modern+cloud+storage+dashboard)

## Features

### Core Functionality
- **Drag & Drop Upload** - Intuitive file upload with drag-and-drop support
- **File Management** - View, organize, and manage your uploaded files
- **File Preview** - Built-in preview for images, videos, audio, and documents
- **Download Files** - Secure file download functionality
- **Storage Analytics** - Real-time storage usage statistics and file type breakdown

### Security & Access Control
- **User Authentication** - Secure login system with session management
- **Public/Private Files** - Toggle file visibility with IAM-style access controls
- **Shareable Links** - Generate public links for shared files
- **Role-Based Access** - Demonstrate IAM concepts with user permissions

### User Experience
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Real-time Updates** - Instant feedback on file operations
- **File Type Icons** - Visual indicators for different file types
- **Search & Filter** - Easily find files (coming soon)

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Date Formatting**: date-fns
- **Storage**: Client-side demo (easily adaptable to AWS S3, Google Cloud Storage, or Vercel Blob)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd cloudstore
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Demo Login

Use these credentials to test the application:

- **Email**: demo@cloudstore.com
- **Password**: demo123

## Usage Guide

### Uploading Files

1. **Drag & Drop**: Drag files directly onto the upload zone
2. **Click to Browse**: Click the upload area to select files from your device
3. **Multiple Files**: Upload multiple files at once

### Managing Files

- **View Details**: Click on any file card to see file information
- **Preview**: Click the eye icon to preview supported file types
- **Download**: Click the download icon to save files locally
- **Delete**: Click the trash icon to remove files
- **Toggle Access**: Use the lock/unlock icon to make files public or private

### Sharing Files

1. Make a file public by clicking the lock icon
2. Click the share icon to copy the public link
3. Share the link with anyone - no login required to view public files

## Project Structure

\`\`\`
cloudstore/
├── app/
│   ├── page.tsx                 # Main dashboard
│   ├── layout.tsx               # Root layout with auth provider
│   ├── globals.css              # Global styles and design tokens
│   └── shared/
│       └── [fileId]/
│           └── page.tsx         # Public file sharing page
├── components/
│   ├── auth-provider.tsx        # Authentication context
│   ├── login-form.tsx           # Login interface
│   ├── file-upload.tsx          # File upload component
│   ├── file-list.tsx            # File listing and management
│   ├── file-preview-dialog.tsx  # File preview modal
│   ├── storage-stats.tsx        # Storage analytics
│   └── ui/                      # shadcn/ui components
├── hooks/
│   └── use-files.tsx            # File management hook
└── README.md
\`\`\`

## Key Concepts Demonstrated

### Object Storage
- Files are stored as objects with metadata (name, size, type, upload date)
- Each file has a unique identifier for retrieval
- Supports various file types and MIME types

### IAM Roles & Permissions
- User authentication and session management
- File-level access control (public/private)
- Owner-based permissions (only file owners can modify access)
- Demonstrates principle of least privilege

### Public/Private Access
- **Private Files**: Only accessible to authenticated file owners
- **Public Files**: Accessible via shareable links without authentication
- **Access Tokens**: Public files use unique IDs for secure sharing

## Adapting to Cloud Storage

This demo uses client-side storage. To connect to real cloud storage:

### AWS S3
\`\`\`typescript
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

const s3Client = new S3Client({ region: "us-east-1" })

async function uploadToS3(file: File) {
  const command = new PutObjectCommand({
    Bucket: "your-bucket-name",
    Key: file.name,
    Body: file,
  })
  await s3Client.send(command)
}
\`\`\`

### Google Cloud Storage
\`\`\`typescript
import { Storage } from "@google-cloud/storage"

const storage = new Storage()
const bucket = storage.bucket("your-bucket-name")

async function uploadToGCS(file: File) {
  await bucket.upload(file.path, {
    destination: file.name,
  })
}
\`\`\`

### Vercel Blob
\`\`\`typescript
import { put } from "@vercel/blob"

async function uploadToBlob(file: File) {
  const blob = await put(file.name, file, {
    access: "public",
  })
  return blob.url
}
\`\`\`

## Environment Variables

For production deployment with real cloud storage, add:

\`\`\`env
# AWS S3
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_BUCKET_NAME=your_bucket

# Google Cloud Storage
GCS_PROJECT_ID=your_project_id
GCS_BUCKET_NAME=your_bucket

# Vercel Blob
BLOB_READ_WRITE_TOKEN=your_token

# Authentication (for production)
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=https://your-domain.com
\`\`\`

## Future Enhancements

- [ ] Real cloud storage integration (AWS S3/GCS/Vercel Blob)
- [ ] File search and filtering
- [ ] Folder organization
- [ ] File versioning
- [ ] Collaborative features (comments, sharing with specific users)
- [ ] Advanced file preview (PDFs, Office documents)
- [ ] Bulk operations (multi-select, batch delete)
- [ ] File compression and optimization
- [ ] Activity logs and audit trails
- [ ] Storage quotas and limits

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for learning and development.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)

---

**Note**: This is a demonstration project showcasing cloud storage concepts. For production use, implement proper authentication, database storage for file metadata, and connect to a real cloud storage provider.
