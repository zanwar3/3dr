import { useRef, useState, createRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/config'
import Layout from '@/components/dom/Layout'
import '@/styles/index.css'
import { useScreenshot, createFileName } from "use-react-screenshot";
//import useCapture from 'use-capture'
//import { useCapture } from 'use-capture'



var ufc = null;
const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: true })
//const Recorder = dynamic(() => import('@/components/dom/Recorder'), { ssr: false })





export default function App({ Component, pageProps = { title: 'index' } }) {


  const ref = useRef()
  const [action, setAction] = useState(8)
  const [bind, setBind] = useState(null)
  const [startRecording, setStartRecording] = useState(null)

  const [visible, setVisible] = useState(true)
  const [skin, setSkin] = useState("/stacy.jpg")
  const dRef = createRef(null);
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0
  });
  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () => { takeScreenShot(ref.current).then(download) };

  // useEffect(async () => {
  //   const useCapture = (await import('use-capture'))
  //   console.log(useCapture.default)
  //   const [tbind, tstartRecording] = new useCapture.default({ duration: 2, fps: 30 });
  //   setBind(tbind)
  //   setStartRecording(tstartRecording)
  // }, [])





  pageProps.action = action
  pageProps.setAction = setAction
  pageProps.skin = skin
  pageProps.setSkin = setSkin
  pageProps.visible = visible;
  return (
    <>
      <Header title={pageProps.title} />
      <Layout ref={ref}>

        {visible ? <div style={{ float: 'right' }}> <button style={{ border: "0.5px solid white" }} onClick={() => { setVisible(false); setTimeout(() => { downloadScreenshot() }, 100); setTimeout(() => { setVisible(true) }, 500) }}>Screen Shot</button></div> : <></>}
        {visible ? <Component {...pageProps} /> : <></>}
        {/* The canvas can either be in front of the dom or behind. If it is in front it can overlay contents.
         * Setting the event source to a shared parent allows both the dom and the canvas to receive events.
         * Since the event source is now shared, the canvas would block events, we prevent that with pointerEvents: none. */}
        {Component?.canvas && (
          <Scene gl={{ preserveDrawingBuffer: true }} shadows camera={{ position: [0, 0, 0], fov: 75 }} eventSource={ref} eventPrefix='client' action={action} setAction={setAction} >
            {Component.canvas(pageProps)}
          </Scene>
        )}
      </Layout>
    </>
  )
}
