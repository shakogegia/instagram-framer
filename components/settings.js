import * as htmlToImage from 'html-to-image';
import { useEffect, useState } from 'react';
import { BsCloudDownload } from "react-icons/bs";
import classNames from "../utils/class-names";
import Button from './button';

export default function Settings(props) {
  const [padding, setPadding] = useState(props.padding)
  const [ratio, setRatio] = useState(props.ratio)
  const [objectFit, setObjectFit] = useState(props.objectFit)

  function download() {
    var node = document.getElementById(props.id);

    htmlToImage.toPng(node)
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "filename";
        link.click();
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  }

  useEffect(() => {
    props.onChange({ padding, ratio, objectFit })
  }, [padding, ratio, objectFit])

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex gap-2'>
        <Button onClick={() => setRatio("1:1")} isActive={ratio === "1:1"}>1:1</Button>
        <Button onClick={() => setRatio("4:5")} isActive={ratio === "4:5"}>4:5</Button>
        <Button onClick={() => setRatio("16:9")} isActive={ratio === "16:9"}>16:9</Button>
      </div>
      <div className='flex gap-2'>
        <Button onClick={() => setObjectFit("contain")} isActive={objectFit === "contain"}>Contain</Button>
        <Button onClick={() => setObjectFit("cover")} isActive={objectFit === "cover"}>Cover</Button>
      </div>
      <div className='flex flex-col gap-2'>
        <p>Padding: {padding}</p>
        <input className='w-[200px]' type="range" min={0} max={100} defaultValue={padding} onChange={e => setPadding(e.target.value)} />
      </div>

      <div className='flex gap-2'>
        <Button onClick={download} className={classNames('flex items-center gap-4')}>
          <BsCloudDownload />
          <p>Download</p>
        </Button>
      </div>
    </div>
  )
}
