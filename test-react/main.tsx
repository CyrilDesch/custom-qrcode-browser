import React, { useEffect, useMemo } from "react";
import { createRoot } from "react-dom/client";
import {
  Url,
  QrOptionsBuilder,
  QrColor,
  QrErrorCorrectionLevel,
  QrEyeFrameShape,
  QrEyeShape,
  QrLogoShape,
  QrMatrixShape,
  QrPixelShape,
  QrShape,
  QrShapes,
} from "../src";
import QrCode from "../react/src/components/QrCode";

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
    const data = new Url("https://www.starbucks.ca/account/create/register");
    const options = new QrOptionsBuilder()
      .setErrorCorrectionLevel(QrErrorCorrectionLevel.High)
      .setSizeRatio(1)
      .setShapes(
        new QrShapes(
          new QrMatrixShape(
            new QrPixelShape.RoundCorners(0.8, 0.4),
            new QrColor.Solid("#010001"),
          ),
          new QrEyeShape.Square(0.2, 1, new QrColor.Solid("#017049")),
          new QrEyeFrameShape.Square(
            new QrPixelShape.NeighborAware(1, 1.5),
            new QrColor.Solid("#017049"),
          ),
          null,
          new QrLogoShape.Circle(svg, 0.5, 1.5, new QrColor.Solid("white")),
          null,
          new QrShape.Square(),
        ),
      )
      .build();
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
