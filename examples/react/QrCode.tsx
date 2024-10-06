import React, { useEffect, useRef } from "react";
import { QrCodeGenerator } from "../../src";
import type { QrCodeConfig } from "../../src/core/QrCodeGenerator";

const QrCode: React.FC<QrCodeConfig> = (qrCodeConfig) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current) {
      const qrCodeCore = QrCodeGenerator(svgRef.current, qrCodeConfig);
      qrCodeCore.generateSvg();
    }
  }, [qrCodeConfig]);

  return <svg ref={svgRef} />;
};

export default QrCode;
