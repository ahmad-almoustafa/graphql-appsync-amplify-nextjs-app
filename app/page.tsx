// `app/page.tsx` is the UI for the `/` URL
import Image from 'next/image'
import { Metadata } from 'next'
import config from '@/utils/config'
import "@/configureAmplify";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div> <h1> Home Page</h1></div>
    </main>
  )
}
