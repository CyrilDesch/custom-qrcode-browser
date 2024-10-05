import React, { useEffect, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { type QrOptionsConfig } from "../../src";
import QrCode from "./QrCode";
import type { QrDataConfig } from "../../src/encode/QrDataMapper";

const container = document.getElementById("root");
const root = createRoot(container!);

const App = () => {
  const [svg, setSvg] = React.useState<string | null>(null);

  useEffect(() => {
    void fetch("starbucks.svg")
      .then((res) => res.text())
      .then((res) => setSvg(res));
    setSvg(svg);
  }, []);

  const [data, options] = useMemo(() => {
    const data: QrDataConfig = {
      type: "Text",
      data: {
        value: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      },
    };
    const options: QrOptionsConfig = {
      sizeRatio: 1,
      errorCorrectionLevel: "HIGH",
      shapes: {
        qrCode: {
          type: "Square",
        },
        matrixPixel: {
          pixelShape: {
            type: "Circle",
            sizeRatio: 0.9,
          },
          color: {
            type: "Solid",
            value: "black",
          },
        },
        eye: {
          type: "Square",
          cornerRadius: 0.2,
          color: {
            type: "Solid",
            value: "#007048",
          },
        },
        eyeFrame: {
          type: "Square",
          pixelShape: {
            type: "StickyCorners",
            cornerRadius: 0.2,
          },
          color: {
            type: "Solid",
            value: "#007048",
          },
        },
        logo: {
          type: "RoundCorners",
          image: svg,
          sizeRatio: 0.4,
          padding: 1,
          color: {
            type: "Solid",
            value: "white",
          },
        },
        background: {
          color: {
            type: "Solid",
            value: "white",
          },
        },
        alignmentPattern: {
          type: "Square",
          pixelShape: {
            type: "StickyCorners",
            cornerRadius: 0.2,
          },
          color: {
            type: "Solid",
            value: "#007048",
          },
        },
      },
    };

    return [data, options];
  }, [svg]);

  return (
    <div>
      <h1>Do you like rick ?</h1>
      <div style={{ width: 300 }}>
        <QrCode data={data} options={options} />
      </div>
    </div>
  );
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
