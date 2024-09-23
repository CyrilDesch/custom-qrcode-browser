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
  charset?: string | null;
  width?: number;
  height?: number;
};

const QrCode: React.FC<QrCodeProps> = ({
  data,
  options = new QrOptionsBuilder().build(),
  charset = null,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current) {
      const qrCodeCore = QrCodeGenerator(
        svgRef.current,
        data,
        options,
        charset,
      );
      qrCodeCore.generateSvg();
    }
  }, [data, options, charset]);

  return <svg ref={svgRef} />;
};

export default QrCode;
