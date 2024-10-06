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
      type: "Url",
      data: { url: "https://github.com" },
    };

    const options: QrOptionsConfig = {
      sizeRatio: 1,
      errorCorrectionLevel: "LOW",
      shapes: {
        qrCode: {
          type: "Circle",
        },
        matrixPixel: {
          pixelShape: {
            type: "StickyCorners",
            cornerRadius: 0.5,
          },
        },
        logo: {
          type: "Circle",
          image:
            "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
          sizeRatio: 0.4,
          padding: 1,
          color: { type: "Solid", value: "white" },
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
