'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import html2canvas from 'html2canvas';
import { Rnd } from 'react-rnd';

export function Editor() {
  const [uploadedImage, setUploadedImage] = useState<string | ArrayBuffer | null>(null);
  const [size, setSize] = useState({ width: 200, height: 200 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [downloadedImage, setDownloadedImage] = useState(false);
  const [rotation, setRotation] = useState(0); // Rotation in degrees

  const RotateLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '35px', marginRight: '10px', marginTop: '10px'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-rotate-ccw">
    <polyline points="1 4 1 10 7 10"></polyline>
    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
  </svg>
);

const RotateRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '35px', marginLeft: '10px', marginTop: '10px'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-rotate-cw">
    <polyline points="23 4 23 10 17 10"></polyline>
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
  </svg>
);


  const onDragStop = (_e: any, d: any) => {
    setPosition({ x: d.x, y: d.y });
  };

  const onResizeStop = (_e: any, _direction: any, ref: any, _delta: any, position: any) => {
    setSize({
      width: ref.offsetWidth,
      height: ref.offsetHeight
    });
    setPosition(position);
  };

  const handleRotation = (newRotation: number) => {
    setRotation(newRotation);
};

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    setDownloadedImage(true);
    const captureElement = document.getElementById("capture-area") as HTMLElement;
    html2canvas(captureElement).then(canvas => {
      const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      const link = document.createElement('a');
      link.download = 'youwifhat.png';
      link.href = image;
      link.click();
    });
  };

  const handleReset = () => {
    setUploadedImage(null)
    setDownloadedImage(false)
    setSize({ width: 200, height: 200 });
    setPosition({ x: 0, y: 0 });
  }

  return (
    <div className="pb-44">
      {!uploadedImage ? (
        <div className="flex justify-center w-full p-20">

          <div className="flex flex-col items-center space-y-10">
            <Image src={'/dogwifhat.png'} alt="dogwifhat" width={240} height={240} />
            <div className="flex flex-col items-center space-y-5">
              <h1 className="text-6xl font-bold">dogwifhat.me</h1>
              <h2 className="font-medium">Add a hat to your PFP and raid to Valhalla wif us</h2>
            </div>
          </div>
        </div>
      ) : (

        <div className="mt-20 flex justify-center mx-auto">

          <div id="capture-area" style={{ position: 'relative' }}>
            <Image src={uploadedImage as string} alt="Photo" width={440} height={440} onDragStart={e => e.preventDefault()} />
            
            <Rnd
              size={{ width: size.width, height: size.height }}
              position={{ x: position.x, y: position.y }}
              onDragStop={onDragStop}
              onResizeStop={onResizeStop}
              aspectRatio={1}
            >
              {/*<Image src={"/hat.png"} alt="Hat" width={size.width} height={size.height} onDragStart={e => e.preventDefault()} />*/}
              <Image src={"/hat.png"} alt="Hat" width={size.width} height={size.height} onDragStart={e => e.preventDefault()} style={{ transform: `rotate(${rotation}deg)` }} />

            </Rnd>
          </div>
        </div>
      )}
      {!uploadedImage ? (
        <div className="flex justify-center w-full ml-14">
          <input type="file" onChange={handleImageUpload} accept="image/*" />
        </div>
      ) : (
        <div className="flex flex-col items-center">

          <div className="mt-4" style={{ textAlign: 'center', marginTop: '16px', color: '#f9f9f9', fontSize: '14px' }}>
          Hover near the edges of the hat. Once the cursor changes, click and drag to resize the hat.
        </div>
          
        <div className="rotation-controls" style={{ marginTop: '25px'}}>
          <button onClick={() => handleRotation(rotation - 10)} title="Rotate Left">
            <RotateLeftIcon />
          </button>
          <button onClick={() => handleRotation(rotation + 10)} title="Rotate Right">
            <RotateRightIcon />
          </button>

        </div>

        <div className="flex justify-center space-x-12 mt-12">
            <button className="bg-white text-black rounded-full p-4" onClick={handleDownload}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path d="M3 15a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5M9 12.188a15 15 0 0 0 2.556 2.655c.13.104.287.157.444.157m3-2.812a14.998 14.998 0 0 1-2.556 2.655A.704.704 0 0 1 12 15m0 0V4" />
              </svg>
            </button>
        </div>

          <div className="flex justify-center space-x-12 mt-12">
            <button className="bg-white text-black rounded-full p-4" onClick={handleReset}>
              {/*<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path d="M6.215 2.67a15 15 0 0 0-1.049 3.726c-.049.335.215.485.479.586l.094.035m0 0A8 8 0 1 1 4.25 14m1.489-6.983a15 15 0 0 0 3.476.85" />
              </svg>*/}
              <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '25px'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left-circle icon-size">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 8 8 12 12 16"></polyline>
                <line x1="16" y1="12" x2="8" y2="12"></line>
              </svg>
            </button>
          </div>


          {downloadedImage && (
            <div className="mt-14 flex flex-col items-center space-y-4">
              <p className="-rotate-6 font-bold text-xl text-center">Don&apos;t forget to donate some <span className="text-lime-400">$wif</span> mfer!!</p>
              <p className="-rotate-6 font-bold text-xl text-center">WIF Marketing Solana wallet <span role="img" aria-label="point down emoji">👇</span></p>
              <p className="-rotate-6 font-bold text-xl text-center"><span className="text-rose-300">GLgvFH6Gn6uhXS8gJoZaykJ3uSP65FMoyC9aEveHF8Nn</span></p>
              <p className="pt-16 font-bold text-xl text-center">Let&apos;s fucking gooo!!!! <span role="img" aria-label="dog with hat">🐶👒</span></p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
