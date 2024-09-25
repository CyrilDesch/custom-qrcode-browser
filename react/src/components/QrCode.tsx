import React, { useEffect, useRef } from "react";
import {
  QrCodeGenerator,
  QrOptionsBuilder,
  type QrData,
  type QrOptions,
} from "../../../src";

type QrCodeProps = {
  data: QrData;
  options?: QrOptions;
};

const QrCode: React.FC<QrCodeProps> = ({
  data,
  options = new QrOptionsBuilder().build(),
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current) {
      const qrCodeCore = QrCodeGenerator(svgRef.current, data, options);
      qrCodeCore.generateSvg();
    }
  }, [data, options]);

  return <svg ref={svgRef} />;
};

export default QrCode;
