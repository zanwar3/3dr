import dynamic from 'next/dynamic'
import { Suspense, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { easing } from "maath"
import { useGLTF, useTexture, useAnimations } from "@react-three/drei"


//import Model from '@/components/canvas/Model'
// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const Model = dynamic(() => import('@/components/canvas/Model'), { ssr: false })


function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(state.camera.position, [1 + state.mouse.x / 4, 1.5 + state.mouse.y / 4, 2.5], 0.2, delta)
  })
}
// Dom components go here
export default function Page(props) {
  const names = [
    "pockets",
    "rope",
    "swingdance",
    "jump",
    "react",
    "shrug",
    "wave",
    "golf",
    "idle"
  ]
  const skins = {
    "human": "/stacy.jpg",
    "alien": "/test.jpg"
  }
  return (
    <><div>{names.map((nm, i) => {
      return <button style={{ color: props.action == i ? "green" : "", border: "0.5px solid green", borderRadius: "10%", margin: "5px" }} type='button' key={"bm_" + i} onClick={() => { props.setAction(i) }}><span key={"spn_" + i} style={{ margin: "10px" }}>{nm}</span></button>
    })}</div>
      <div>{Object.keys(skins).map((nm, i) => {
        return <button style={{ color: props.skin == skins[nm] ? "red" : "", border: "0.5px solid red", borderRadius: "10%", margin: "5px" }} type='button' key={"bms_" + i} onClick={() => { props.setSkin(skins[nm]) }}> <span key={"sknp_" + i} style={{ margin: "10px" }}>{nm}</span></button>
      })}</div>
    </>
  )
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Page.canvas = (props) =>
  <><ambientLight /><directionalLight position={[-5, 5, 5]} castShadow shadow-mapSize={1024} /><group position={[0, -1, 0]}>
    <Suspense fallback={null}>
      <Model action={props.action} skin={props.skin} />
    </Suspense>
  </group><mesh rotation={[-0.5 * Math.PI, 0, 0]} position={[0, -1, 0]} receiveShadow>
      <planeBufferGeometry args={[10, 10, 1, 1]} />
      <shadowMaterial transparent opacity={0.2} />
    </mesh><Rig /></>

