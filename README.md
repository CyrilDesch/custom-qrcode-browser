# Custom QrCode Browser

[![Continuous Integrations](https://github.com/CyrilDesch/custom-qrcode-browser/actions/workflows/continuous-integrations.yaml/badge.svg?branch=main)](https://github.com/CyrilDesch/custom-qrcode-browser/actions/workflows/continuous-integrations.yaml)
[![License](https://badgen.net/github/license/CyrilDesch/custom-qrcode-browser?cache=600)](./LICENSE)
[![Package tree-shaking](https://badgen.net/bundlephobia/tree-shaking/custom-qrcode-browser?cache=600)](https://bundlephobia.com/package/custom-qrcode-browser)
[![Package minified & gzipped size](https://badgen.net/bundlephobia/minzip/custom-qrcode-browser?cache=600)](https://bundlephobia.com/package/custom-qrcode-browser)
[![Package dependency count](https://badgen.net/bundlephobia/dependency-count/custom-qrcode-browser?cache=600)](https://bundlephobia.com/package/custom-qrcode-browser)

Library to generate high customizable QR code in browser. Available for Angular and React in browser environment.

Fast, lightweight, and easy to use. Use HTML5 and SVG to render QR code instantly. Optimize by Google closure compiler.

## How to use

### Angular

- Create a qrcode.component.ts :

```typescript
import {
  Component,
  type ElementRef,
  Input,
  type OnChanges,
  type SimpleChanges,
  ViewChild,
} from "@angular/core";
import {
  QrCodeGenerator,
  QrOptionsBuilder,
  type IQrData,
  type QrOptions,
} from "../../../src";

@Component({
  selector: "app-qr-code",
})
export class QrCodeComponent implements OnChanges {}

@Component({
  selector: "app-custom-qr-code",
  standalone: true,
  imports: [],
  templateUrl: "./custom-qr-code.component.html",
  styleUrl: "./custom-qr-code.component.scss",
})
export class CustomQrCodeComponent implements OnChanges {
  @Input() data!: IQrData;
  @Input() options: QrOptions = new QrOptionsBuilder().build();

  @ViewChild("svgElement", { static: true })
  svgElement!: ElementRef<SVGSVGElement>;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["data"] || changes["options"]) {
      this.generateQrCode();
    }
  }

  private generateQrCode(): void {
    if (this.svgElement && this.svgElement.nativeElement) {
      const qrCodeCore = QrCodeGenerator(
        this.svgElement.nativeElement,
        this.data,
        this.options,
      );
      qrCodeCore.generateSvg();
    }
  }
}
```

## License

Released under [MIT License](./LICENSE).
