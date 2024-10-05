import React, { useEffect, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { QrData, QrOptions } from "../../src";
import QrCode from "./QrCode";

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
            value: "#007048",
          },
        },
        eyeFrame: {
          type: "Square",
          shape: {
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
          imageData: svg,
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
          shape: {
            type: "StickyCorners",
            cornerRadius: 0.2,
          },
          color: {
            type: "Solid",
            value: "#007048",
          },
        },
      },
    });

    return [data, options];
  }, [svg]);

  return (
    <div>
      <p>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
          Do you like rick ?
        </a>
      </p>
      <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        <div style={{ width: 300 }}>
          <QrCode data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
