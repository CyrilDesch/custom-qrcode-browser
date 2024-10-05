import React, { useEffect, useRef } from "react";
import { QrCodeGenerator, type QrOptionsConfig } from "../../src";
import type { QrDataConfig } from "../../src/encode/QrDataMapper";

type QrCodeProps = {
  data: QrDataConfig;
  options?: QrOptionsConfig;
};

const QrCode: React.FC<QrCodeProps> = ({ data, options }) => {
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
