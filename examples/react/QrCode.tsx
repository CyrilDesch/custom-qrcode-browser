import React, { useEffect, useRef } from "react";
import { type IQrData, QrCodeGenerator, QrOptions } from "../../src";

type QrCodeProps = {
  data: IQrData;
  options?: QrOptions;
};

const QrCode: React.FC<QrCodeProps> = ({
  data,
  options = new QrOptions({}),
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
