const LoadingPage = ({ message }: { message: string }) => {
  return (
    <main className="flex min-h-dvh w-full flex-col items-center justify-center">
      <h1 className="text-xl font-bold">{message}</h1>
    </main>
  )
}

export default LoadingPage
