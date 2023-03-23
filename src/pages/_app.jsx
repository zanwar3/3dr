import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/config'
import Layout from '@/components/dom/Layout'
import '@/styles/index.css'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: true })

export default function App({ Component, pageProps = { title: 'index' } }) {
  const ref = useRef()
  const [action, setAction] = useState(8)
  const [skin, setSkin] = useState("/stacy.jpg")

  pageProps.action = action
  pageProps.setAction = setAction
  pageProps.skin = skin
  pageProps.setSkin = setSkin
  return (
    <>
      <Header title={pageProps.title} />
      <Layout ref={ref}>
        <Component {...pageProps} />
        {/* The canvas can either be in front of the dom or behind. If it is in front it can overlay contents.
         * Setting the event source to a shared parent allows both the dom and the canvas to receive events.
         * Since the event source is now shared, the canvas would block events, we prevent that with pointerEvents: none. */}
        {Component?.canvas && (
          <Scene shadows camera={{ position: [1, 1.5, 2.5], fov: 75 }} eventSource={ref} eventPrefix='client' action={action} setAction={setAction}>
            {Component.canvas(pageProps)}
          </Scene>
        )}
      </Layout>
    </>
  )
}
