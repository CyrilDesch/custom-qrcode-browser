import React, { useEffect, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { QrData, QrOptions } from "../src";
import QrCode from "./QrCode";

const container = document.getElementById("root");
const root = createRoot(container!);

const App = () => {
  const [svg, setSvg] = React.useState<string | null>(null);

  useEffect(() => {
    void fetch("test-react/starbucks.svg")
      .then((res) => res.text())
      .then((res) => setSvg(res));
    setSvg(svg);
  }, []);

  const [data, options] = useMemo(() => {
    const data = new QrData.Url(
      "https://www.starbucks.ca/account/create/register",
    );
    const options = new QrOptions({
      sizeRatio: 1,
      errorCorrectionLevel: "HIGH",
      shapes: {
        qrCode: {
          type: "Square",
        },
        matrixPixel: {
          shape: {
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
            value: "green",
          },
        },
        eyeFrame: {
          type: "Square",
          shape: {
            type: "NeighborAware",
            cornerRadius: 0.2,
          },
          color: {
            type: "Solid",
            value: "green",
          },
        },
        logo: {
          type: "RoundCorners",
          imageData: svg,
          sizeRatio: 0.4,
          padding: 1,
          color: {
            type: "Solid",
            value: "white",
          },
        },
        timingLine: {
          pixelShape: {
            type: "Circle",
            sizeRatio: 0.6,
          },
          color: {
            type: "Solid",
            value: "green",
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
          shape: {
            type: "NeighborAware",
            cornerRadius: 0.2,
          },
          color: {
            type: "Solid",
            value: "green",
          },
        },
      },
    });

    return [data, options];
  }, [svg]);

  return (
    <div>
      <p>Test</p>
      <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        <div style={{ width: 300 }}>
          <QrCode data={data} options={options} />
        </div>
        <img width={300} src="test-react/unnamed.png" alt="TikTok" />
      </div>
    </div>
  );
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
