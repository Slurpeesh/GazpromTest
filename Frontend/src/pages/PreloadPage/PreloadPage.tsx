import LoaderSvg from '@/entities/LoaderSvg/LoaderSvg'

export default function PreloadPage() {
  return (
    <div
      className="flex flex-col gap-5 justify-center items-center w-dvw h-dvh bg-background text-foreground"
      role="status"
    >
      <LoaderSvg />
      <p className="text-xl md:text-3xl font-extrabold tracking-wide">
        Loading TableViewer...
      </p>
    </div>
  )
}
