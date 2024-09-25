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
  type QrData,
  type QrOptions,
} from "../../../src";

@Component({
  selector: "app-qr-code",
  template: `<svg #svgElement></svg>`,
})
export class QrCodeComponent implements OnChanges {
  @Input() data!: QrData;
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
