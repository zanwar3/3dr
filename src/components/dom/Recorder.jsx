/* eslint no-use-before-define: 0 */
import { useEffect } from 'react';
import useCapture from 'use-capture';


export default function Recorder(props) {

    const [tbind, tstartRecording] = useCapture({ duration: 2, fps: 30 });
    console.log(tbind);
    props.setBind(tbind);
    props.setStartRecording(tstartRecording);

    return (
        <></>
    )
}
