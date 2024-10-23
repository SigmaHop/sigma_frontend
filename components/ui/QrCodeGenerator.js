"use client";

import React, { useEffect } from "react";
import { Loader2 } from "lucide-react";
import QRCodeStyling from "qr-code-styling";

const QRCodeGenerator = ({ value, size = 500 }) => {
  const [src, setSrc] = React.useState("");

  useEffect(() => {
    const qrcode = new QRCodeStyling({
      width: 900,
      height: 900,
      data: value,
      dotsOptions: {
        color: "#b7b4ee",
        type: "dots",
      },
      backgroundOptions: {
        color: "#000000",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 20,
      },
    });

    const getImage = async () => {
      const src = URL.createObjectURL(await qrcode.getRawData());
      setSrc(src);
    };

    getImage();
  }, [value, size]);

  return (
    (src && value && (
      <img
        src={src}
        alt="QR Code with Logo"
        style={{}}
        className="w-full h-full"
      />
    )) || (
      <div className="flex items-center justify-center w-full h-full">
        <Loader2 className="animate-spin" size={50} />
      </div>
    )
  );
};

export default QRCodeGenerator;
