import { useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { Button } from '../../components/Button'
import { Dropzone } from '../../components/Dropzone'
import { useImageLoader } from '../../hooks/useImageLoader'
import { api } from '../../services/api'

export const EditAvatar = () => {
  const [scale, setScale] = useState(1)
  const [avatar, setAvatar] = useState<File | null>(null)
  const { images } = useImageLoader(avatar ? [avatar] : undefined)
  const editorRef = useRef<AvatarEditor>(null)
  const previewRef = useRef<HTMLImageElement>(null)

  const handleUploadAvatar = async () => {
    if (editorRef.current) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      // console.log('getCroppingRect', editorRef.current.getCroppingRect());
      //  const dataUrl = editorRef.current.getImageScaledToCanvas().toDataURL()
      //  console.log('dataUrl', dataUrl)

      const dataUrl = editorRef.current.getImageScaledToCanvas().toDataURL()
      const result = await fetch(dataUrl)
      const blob = await result.blob()
      console.log('blob', blob)
      const fd = new FormData()
      fd.append('file', blob)
      fd.append('teste', 'cara')
      fd.append('teste2', 'cara2')
      const response = await api.patch('/users/avatar', fd)

      // console.log('blob', blob);
      // console.log('final',window.URL.createObjectURL(blob))

      // If you want the image resized to the canvas size (also a HTMLCanvasElement)
      // const canvasScaled = editorRef.current.getImageScaledToCanvas()

      // console.log('CANVAS SCALED', canvasScaled.toDataURL())
    }
  }

  return (
    <div className="flex flex-col mt-4 gap-4">
      {!images[0] && (
        <Dropzone
          id="avatar"
          name="avatar"
          onChange={(files) => {
            setAvatar(files[0])
          }}
          options={{
            maxFiles: 1,
            accept: {
              'image/png': ['.png'],
              'image/bmp': ['.bmp'],
              'image/jpeg': ['.jpeg', '.jpg'],
            },
          }}
        />
      )}

      {images[0] && (
        <>
          <div className="mx-auto">
            <AvatarEditor
              ref={editorRef}
              image={images[0].src}
              width={250}
              height={250}
              borderRadius={125}
              scale={scale}
              crossOrigin={'anonymous'}
            />
          </div>

          <div className=" flex flex-col  gap-4 w-full">
            <div>
              <label
                htmlFor="zoom"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Zoom (<span>{scale}x</span>)
              </label>
              <input
                onChange={(e) => {
                  setScale(Number(e.target.value))
                }}
                min={1}
                max={2}
                step={0.1}
                id="zoom"
                type="range"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>
            <Button onClick={handleUploadAvatar}>Save</Button>
          </div>
        </>
      )}
    </div>
  )
}
