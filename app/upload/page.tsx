'use client'
import React, { FC, useState } from 'react'
import { CldImage, CldUploadWidget } from 'next-cloudinary'

interface UploadProps {}

interface CloudinaryResult {
  public_id: string
}

const Upload: FC<UploadProps> = ({}) => {
  const [publicId, setPublicId] = useState('')

  return (
    <div>
      {publicId && <CldImage src={publicId} alt="uploadedImage" width="300" height="180" />}

      <CldUploadWidget
        options={{
          sources: ['local', 'url', 'camera', 'google_drive'],
          multiple: false,
          maxFiles: 1,
          styles: {
            palette: {
              window: '#5D005D',
              sourceBg: '#3A0A3A',
              windowBorder: '#AD5BA3',
              tabIcon: '#ffffcc',
              inactiveTabIcon: '#FFD1D1',
              menuIcons: '#FFD1D1',
              link: '#ffcc33',
              action: '#ffcc33',
              inProgress: '#00e6b3',
              complete: '#a6ff6f',
              error: '#ff1765',
              textDark: '#3c0d68',
              textLight: '#fcfffd',
            },
            fonts: {
              default: null,
              "'Fira Sans', sans-serif": {
                url: 'https://fonts.googleapis.com/css?family=Fira+Sans',
                active: true,
              },
            },
          },
        }}
        uploadPreset="qf1utctl"
        onUpload={(result, widget) => {
          if (result.event !== 'success') return
          const info = result.info as CloudinaryResult
          setPublicId(info.public_id)
        }}
      >
        {({ open }) => {
          return (
            <button className="btn btn-success" onClick={() => open()}>
              Subir Imagen
            </button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}

export default Upload
