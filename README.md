# Custom QRCode Browser

[![Continuous Integrations](https://github.com/CyrilDesch/custom-qrcode-browser/actions/workflows/continuous-integrations.yaml/badge.svg?branch=main)](https://github.com/CyrilDesch/custom-qrcode-browser/actions/workflows/continuous-integrations.yaml)
[![License](https://badgen.net/github/license/CyrilDesch/custom-qrcode-browser?cache=600)](./LICENSE)
[![Package tree-shaking](https://badgen.net/bundlephobia/tree-shaking/custom-qrcode-browser?cache=600)](https://bundlephobia.com/package/custom-qrcode-browser)
[![Package dependency count](https://badgen.net/bundlephobia/dependency-count/custom-qrcode-browser?cache=600)](https://bundlephobia.com/package/custom-qrcode-browser)
![npm](https://img.shields.io/npm/dm/custom-qrcode-browser?label=Downloads&color=blue&style=flat)
![stars](https://badgen.net/github/stars/CyrilDesch/custom-qrcode-browser?cache=600)

A lightweight, dependency-free library for generating highly customizable QR codes in browser environments. Leverage **SVG** to create stunning QR codes with unique designs and embedded logos. Fully documented for **Angular** and **React**, with no dependencies and just 40 kB after minification.

<table>
  <tr>
    <td>
      <img src="https://i.ibb.co/HYTh7CP/starbucks.jpg" width="256" style="aspect-ratio: 1 / 1;">
    </td>
    <td>
      <img src="https://i.ibb.co/txBXCqV/telegram.jpg" width="256" style="aspect-ratio: 1 / 1;">
    </td>
    <td>
      <img src="https://i.ibb.co/DzNxPbM/tiktok.jpg" width="256" style="aspect-ratio: 1 / 1;">
    </td>
  </tr>
</table>

## Table of Contents

- 🚀 [Features](#-features)
- 📦 [Installation](#-installation)
- 💻 [Usage](#-usage)
  - [Angular](#angular)
  - [React](#react)
- 📋 [API Documentation](#-api-documentation)
- 📚 [Examples](#-examples)
- ✋ [FAQ](#-faq)
- 📝 [Contributing](#-Contributing)
- ⚖️ [License](#-license)

## 🚀 Features

### Customization

- **QR Code Shapes**: Choose between square or circle designs.
- **Matrix Pixels**: Customize pixel shapes like squares, circles, stars, and more.
- **Eyes & Eye Frames**: Fully customize the shape and color of the eyes.
- **Logo Embedding**: Add logos with adjustable size, background, and padding.
- **Alignment Patterns**: Unique patterns for larger QR codes.
- **Colors & Gradients**: Apply solid colors or various gradients to all elements.
- **Backgrounds**: Set solid colors or use background images.
- **Timing Lines**: Customize timing lines with different shapes and colors.

### Additional Features

- **Data Support**: Encode URLs, text, emails, phones, SMS, geolocations, WiFi credentials, and more.
- **Error Correction**: Choose from LOW, MEDIUM, QUARTILE, or HIGH error correction levels.
- **Encoding Modes**: Supports Numeric, Alphanumeric, Byte, and Kanji modes.
- **Declarative API**: Use a simple JSON-based API to customize QR codes.

### Performance & Compatibility

- **Lightweight**: Only 40 kB after minification, with no external dependencies.
- **Browser Support**: Works seamlessly in modern browsers and devices.
- **Responsive**: Fully scalable QR codes using SVG.
- **Standards Compliant**: Adheres to the **ISO/IEC 18004** QR Code specification.

## 📦 Installation

Install the library using npm or yarn:

```bash
npm install custom-qrcode-browser
# or
yarn add custom-qrcode-browser
```

## 💻 Usage

### Angular

#### 1. Import and Configure

Create a new Angular component to render the QR code:

```typescript
...
import { QrCodeGenerator, IQrData, QrOptions } from "custom-qrcode-browser";

@Component({
  selector: "app-custom-qr-code",
  standalone: true,
  template: `<svg #svgElement></svg>`,
})
export class CustomQrCodeComponent implements OnChanges {
  @Input() data!: IQrData;
  @Input() options: QrOptions = {};

  @ViewChild("svgElement", { static: true })
  svgElement!: ElementRef<SVGSVGElement>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data || changes.options) {
      this.generateQrCode();
    }
  }

  private generateQrCode(): void {
    if (this.svgElement?.nativeElement) {
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

#### 2. Use the Component

Create variables for data and options in ts file, it's just for the example.

```html
<app-custom-qr-code
  [data]="{
    type: 'Url',
    data: { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }
  }"
  [options]="{
    sizeRatio: 1,
    errorCorrectionLevel: 'HIGH',
    shapes: { qrCode: { type: 'Circle' } }
  }"
></app-custom-qr-code>
```

### React

#### 1. Create the QRCode Component

```tsx
import React, { useRef, useEffect } from "react";
import { QrCodeGenerator, IQrData, QrOptions } from "custom-qrcode-browser";

interface QrCodeProps {
  data: IQrData;
  options?: QrOptions;
}

const QrCode: React.FC<QrCodeProps> = ({ data, options = {} }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current) {
      const qrCodeCore = QrCodeGenerator(svgRef.current, data, options);
      qrCodeCore.generateSvg();
    }
  }, [data, options]);

  return <svg ref={svgRef}></svg>;
};

export default QrCode;
```

#### 2. Use the Component

```tsx
const Example: React.FC = () => (
  <div style={{ width: 300 }}>
    <QrCode
      data={{
        type: "Url",
        data: { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
      }}
      options={{
        sizeRatio: 1,
        errorCorrectionLevel: "HIGH",
        shapes: { qrCode: { type: "Circle" } },
      }}
    />
  </div>
);

export default App;
```

## 📋 API Documentation

- [QrData](#qrdata)
- [QrOptions](#qroptions)
- [QrColorConfig](#qrcolorconfig)
- [QrPixelShapeConfig](#qrpixelshapeconfig)

### QrData

Describes the different kinds of information that can be scanned and interpreted by QR code readers.

#### Usage

```typescript
const data: IQrData = {
  type: "Text", // or 'Url', 'Email', etc.
  data: {
    /* specific data fields */
  },
};
```

#### Supported Types and Fields

- **Text**

  ```typescript
  type: 'Text',
  data: {
    value: string; // Any text string
  }
  ```

- **Url**

  ```typescript
  type: 'Url',
  data: {
    url: string; // A valid URL
  }
  ```

- **Email**

  ```typescript
  type: 'Email',
  data: {
    email: string;              // Recipient email address
    copyTo?: string;            // CC email address (optional)
    subject?: string;           // Email subject (optional)
    body?: string;              // Email body content (optional)
  }
  ```

- **GeoPos**

  ```typescript
  type: 'GeoPos',
  data: {
    lat: number; // Latitude
    lon: number; // Longitude
  }
  ```

- **Bookmark**

  ```typescript
  type: 'Bookmark',
  data: {
    url: string;   // Bookmark URL
    title: string; // Bookmark title
  }
  ```

- **Wifi**

  ```typescript
  type: 'Wifi',
  data: {
    authentication?: 'WEP' | 'WPA' | 'nopass'; // Authentication type
    ssid?: string;                             // Network SSID
    psk?: string;                              // Password
    hidden?: boolean;                          // Hidden network flag
  }
  ```

- **Phone**

  ```typescript
  type: 'Phone',
  data: {
    phoneNumber: string; // Phone number
  }
  ```

- **SMS**

  ```typescript
  type: 'SMS',
  data: {
    phoneNumber: string; // Recipient phone number
    subject?: string;    // Message content (optional)
    isMMS?: boolean;     // Set true for MMS, false for SMS (default)
  }
  ```

- **BizCard**

  ```typescript
  type: 'BizCard',
  data: {
    firstName?: string;
    secondName?: string;
    job?: string;
    company?: string;
    address?: string;
    phone?: string;
    email?: string;
  }
  ```

- **VCard**

  ```typescript
  type: 'VCard',
  data: {
    name?: string;
    company?: string;
    title?: string;
    phoneNumber?: string;
    email?: string;
    address?: string;
    website?: string;
    note?: string;
  }
  ```

- **MeCard**

  ```typescript
  type: 'MeCard',
  data: {
    name?: string;
    address?: string;
    phoneNumber?: string;
    email?: string;
  }
  ```

- **Event**

  ```typescript
  type: 'Event',
  data: {
    uid?: string;
    stamp?: string;
    organizer?: string;
    start?: string;   // Format: YYYYMMDDTHHmmss
    end?: string;     // Format: YYYYMMDDTHHmmss
    summary?: string;
  }
  ```

- **GooglePlay**

  ```typescript
  type: 'GooglePlay',
  data: {
    appPackage: string; // App package name
  }
  ```

### QrOptions

Describes the different options available to customize QR codes.

#### Usage

```typescript
const options: QrOptions = {
  sizeRatio: 0.8,
  errorCorrectionLevel: "HIGH",
  shapes: {
    /* shape configurations */
  },
};
```

#### Available Options

- **sizeRatio**: `number` (between 0 and 1)

  Defines the size ratio of the QR code relative to its container.

- **errorCorrectionLevel**: `'LOW' | 'MEDIUM' | 'QUARTILE' | 'HIGH'`

  Error correction level; higher levels can restore more data if the code is damaged.

- **shapes**: `QrShapesConfig`

  Customize the shapes of various QR code elements.

#### shapes.qrCode

Shape of the overall QR code.

```typescript
shapes: {
  qrCode: {
    type: "Square" | "Circle";
  }
}
```

#### shapes.matrixPixel

Shape of the individual pixels in the QR code matrix. See [`QrPixelShapeConfig`](#qrpixelshapeconfig) and [`QrColorConfig`](#qrcolorconfig) for details.

```typescript
shapes: {
  matrixPixel: {
    pixelShape: QrPixelShapeConfig;
    color: QrColorConfig;
  }
}
```

#### shapes.eye

Shape of the eyes (the three corner elements). See [`QrColorConfig`](#qrcolorconfig) for details.

```typescript
shapes: {
  eye: {
    type: 'Square' | 'Circle' | 'Rhombus';
    cornerRadius?: number; // Between 0 and 1, only for 'Square' type
    color: QrColorConfig;
  };
}
```

#### shapes.eyeFrame

Shape of the eye frames. See [`QrPixelShapeConfig`](#qrpixelshapeconfig) and [`QrColorConfig`](#qrcolorconfig) for details.

```typescript
shapes: {
  eyeFrame: {
    type: "Square" | "Circle";
    pixelShape: QrPixelShapeConfig;
    color: QrColorConfig;
  }
}
```

#### shapes.logo

Embed a logo in the QR code. See [`QrColorConfig`](#qrcolorconfig) for details.

```typescript
shapes: {
  logo: {
    type: 'RoundCorners' | 'SquareCorners';
    image: string;       // SVG or image URL
    sizeRatio: number;   // Between 0 and 1
    padding: number;     // In pixels
    color?: QrColorConfig;
  };
}
```

#### shapes.timingLine

Customize the timing lines. See [`QrPixelShapeConfig`](#qrpixelshapeconfig) and [`QrColorConfig`](#qrcolorconfig) for details.

```typescript
shapes: {
  timingLine: {
    pixelShape: QrPixelShapeConfig;
    color: QrColorConfig;
  }
}
```

#### shapes.background

Background options for the QR code. See [`QrColorConfig`](#qrcolorconfig) for details.

```typescript
shapes: {
  background: {
    image?: string;      // Image URL
    color?: QrColorConfig;
  };
}
```

#### shapes.alignmentPattern

Shape of the alignment patterns for larger QR codes. See [`QrPixelShapeConfig`](#qrpixelshapeconfig) and [`QrColorConfig`](#qrcolorconfig) for details.

```typescript
shapes: {
  alignmentPattern: {
    type: "Square" | "Circle";
    pixelShape: QrPixelShapeConfig;
    color: QrColorConfig;
  }
}
```

### QrColorConfig

Describes the different color options available for QR code elements.

#### Usage

```typescript
const color: QrColorConfig = {
  type: "Solid",
  value: "#000000",
};
```

#### Types and Options

- **Solid**

  ```typescript
  type: 'Solid',
  value: string; // Any valid CSS color value
  ```

- **LinearGradient**

  ```typescript
  type: 'LinearGradient',
  colors: Array<[number, string]>; // e.g., [[0, 'red'], [1, 'blue']]
  orientation: 'Horizontal' | 'Vertical' | 'LeftDiagonal' | 'RightDiagonal';
  ```

- **RadialGradient**

  ```typescript
  type: 'RadialGradient',
  colors: Array<[number, string]>;
  radius: number; // Between 0 and 1
  ```

- **SweepGradient**

  ```typescript
  type: 'SweepGradient',
  colors: Array<[number, string]>;
  ```

### QrPixelShapeConfig

Describes the different shape options available for individual pixels.

#### Usage

```typescript
const pixelShape: QrPixelShapeConfig = {
  type: "RoundCorners",
  sizeRatio: 1,
  cornerRadius: 0.5,
};
```

#### Types and Options

- **type**

  ```typescript
  type: "Square" |
    "Circle" |
    "Star" |
    "Rhombus" |
    "Hexagon" |
    "Octagon" |
    "RoundCorners" |
    "StickyCorners" |
    "RoundCornersVertical" |
    "RoundCornersHorizontal";
  ```

- **sizeRatio**

  ```typescript
  sizeRatio: number; // Between 0 and 1
  ```

- **cornerRadius**

  ```typescript
  cornerRadius: number; // Between 0 and 1, only for round corner shapes
  ```

## 📚 Examples

### Example 1: Basic QR Code

```typescript
const data: IQrData = {
  type: "Url",
  data: { url: "https://example.com" },
};

const options: QrOptions = {
  sizeRatio: 1,
  errorCorrectionLevel: "MEDIUM",
};
```

### Example 2: QR Code with Custom Shapes and Colors

```typescript
const data: IQrData = {
  type: "Text",
  data: { value: "Custom QR Code" },
};

const options: QrOptions = {
  sizeRatio: 0.9,
  errorCorrectionLevel: "HIGH",
  shapes: {
    qrCode: { type: "Square" },
    matrixPixel: {
      pixelShape: { type: "Hexagon", sizeRatio: 1 },
      color: {
        type: "LinearGradient",
        colors: [
          [0, "#ff0000"],
          [1, "#0000ff"],
        ],
        orientation: "Vertical",
      },
    },
    eye: {
      type: "Circle",
      color: { type: "Solid", value: "#00ff00" },
    },
    eyeFrame: {
      type: "Square",
      pixelShape: { type: "RoundCorners", cornerRadius: 0.2 },
      color: { type: "Solid", value: "#000000" },
    },
    background: {
      color: { type: "Solid", value: "#ffffff" },
    },
  },
};
```

### Example 3: QR Code with Embedded Logo

```typescript
const data: IQrData = {
  type: "Url",
  data: { url: "https://github.com" },
};

const options: QrOptions = {
  sizeRatio: 0.8,
  shapes: {
    logo: {
      type: "RoundCorners",
      image:
        "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
      sizeRatio: 0.2,
      padding: 5,
    },
  },
};
```

## ✋ FAQ

### Why can't I scan my QR code?

Ensure that the QR code has sufficient contrast between the foreground and background colors. Avoid using too many colors or complex gradients that may hinder QR code scanners. Also, ensure the error correction level is set appropriately.

### How can I improve error correction?

Set the `errorCorrectionLevel` in `QrOptions` to a higher value like `'HIGH'` to improve the QR code's resilience to damage or distortion.

### Can I use custom shapes for the QR code pixels?

Yes, you can customize pixel shapes using the `QrPixelShapeConfig` in `shapes.matrixPixel.pixelShape`.

## 📝 Contributing

Contributions are welcome! Here are some ideas to improve the library:

- [ ] Add new shapes for the eye frame (e.g., multiple ways with rounded corners).
- [ ] Implement random color options.
- [ ] Add support for more data types.
- [ ] Improve documentation and examples.

## ⚖️ License

Released under the [MIT License](./LICENSE).
