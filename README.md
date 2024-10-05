# Custom QRCode Browser

[![Continuous Integrations](https://github.com/CyrilDesch/custom-qrcode-browser/actions/workflows/continuous-integrations.yaml/badge.svg?branch=main)](https://github.com/CyrilDesch/custom-qrcode-browser/actions/workflows/continuous-integrations.yaml)
[![License](https://badgen.net/github/license/CyrilDesch/custom-qrcode-browser?cache=600)](./LICENSE)
[![Package tree-shaking](https://badgen.net/bundlephobia/tree-shaking/custom-qrcode-browser?cache=600)](https://bundlephobia.com/package/custom-qrcode-browser)
[![Package minified & gzipped size](https://badgen.net/bundlephobia/minzip/custom-qrcode-browser?cache=600)](https://bundlephobia.com/package/custom-qrcode-browser)
[![Package dependency count](https://badgen.net/bundlephobia/dependency-count/custom-qrcode-browser?cache=600)](https://bundlephobia.com/package/custom-qrcode-browser)
![npm](https://img.shields.io/npm/dm/custom-qrcode-browser?label=Downloads&color=blue&style=flat)
![stars](https://badgen.net/github/stars/CyrilDesch/custom-qrcode-browser)

Very lightweight library to generate highly customizable QR codes in browser environments. This library uses **HTML5** and **SVG** for rendering QR codes. Documented for **Angular** and **React**.

<table>
  <tr>
    <td><img src="./examples/tiktok.jpg" width="256" height="256"></td>
    <td><img src="./examples/starbucks.jpg" width="256" height="256"></td>
    <td><img src="./examples/telegram.jpg" width="256" height="256"></td>
  </tr>
</table>

## Table of Contents

- 🚀 [Features](#-features)
- 📦 [How to use](#-how-to-use)
  - [Angular](#angular)
  - [React](#react)
- 📋 [Documentation references](#-documentation-references)
  - [QrData](#qrdata)
  - [QrOptions](#qroptions)
- 🙋‍♀️ [FAQ](#-faq)
- 📝 [TODO](#-todo)
- ⚖️ [License](#-license)

## 🚀 Features

### Custom Shapes:

- **QR Code**: Square, circle.
- **Matrix Pixels**: Square, round corners, circle, star, sticky corners, etc.
- **Eyes & Eye Frames**: Fully customizable shapes and colors
- **Logo**: Add logos with adjustable size, background, and padding
- **Alignment Patterns**: Unique patterns for larger QR codes

For more details, see the [Options](#options).

---

### Additional:

- **Support**: URL, Text, Email, Phone, SMS, Geolocation, WiFi, and more (see the [Data](#data).)
- **Error Correction**: Choose from LOW, MEDIUM, HIGH levels
- **Background**: Set solid colors or use images
- **Timing Lines**: Fully customizable appearance
- **Size Ratio**: Adjust the overall size of the QR code
- **Colors & Gradients**: Apply solid colors or gradients to all elements
- **Different encoding mode**: Numeric, Alphanumeric, Byte, Kanji
- **Declarative API**: Customize QR codes using a simple declarative API in JSON format ([e.g.](/examples/react/main.tsx#L23))

---

### Performance & Compatibility:

- Lightweight and optimized for performance in browser environments
- Supports modern browsers and devices
- Fully responsive and scalable QR codes using SVG
- Adheres to the ISO/IEC 18004 standard, which defines the QR Code Model 2 specification

## 📦 How to use

### Angular

To use the library in an Angular environment, follow these steps:

#### 1. Installation

First, install the library using npm:

```bash
npm install custom-qrcode-browser
```

or using yarn :

```bash
yarn install custom-qrcode-browser
```

#### 2. Creating a QRCode Component

Create a new Angular component that integrates the QRCode generator. This component will take `data` and `options` as inputs and render the QR code using the library.

```typescript
@Component({
  selector: "app-custom-qr-code",
  standalone: true,
  templateUrl: "./custom-qr-code.component.html",
  styleUrls: ["./custom-qr-code.component.scss"],
})
export class CustomQrCodeComponent implements OnChanges {
  @Input() data!: IQrData;
  @Input() options: QrOptions = new QrOptionsBuilder().build();

  @ViewChild("svgElement", { static: true })
  svgElement!: ElementRef<SVGSVGElement>;

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

#### 3. Add in template file

In your template file, add an SVG element and bind the component inputs.

```html
<svg #svgElement></svg>
```

#### Example of usage

Pass data and options to the component:

```html
<div style="width: 300px">
  <app-custom-qr-code
    [data]="myQrData"
    [options]="myQrOptions"
  ></app-custom-qr-code>
</div>
```

---

### React

To use the library in a React environment, follow these steps:

#### 1. Installation

Install the library in your React project:

```bash
npm install custom-qrcode-browser
```

or using yarn :

```bash
yarn install custom-qrcode-browser
```

#### 2. Creating a QRCode Component

Define a custom React component for QR code rendering.

```tsx
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
```

#### Example of usage

```tsx
const App = () => {
  return (
    <div style={{ width: 300 }}>
      <QrCode data={myQrData} options={myQrOptions} />
    </div>
  );
};
```

## 📋 Documentation references

### QrData

Describes the different kinds of information that can be scanned and interpreted by QR code readers. Usage : `new QrData.Text("Hello World")`.

| **Data Type**    | **Description**                                                                                         | **Example Output**                                                     |
| ---------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `Text`           | Simple text string to encode in a QR code.                                                              | `"Hello World"`                                                        |
| `Url`            | Encodes a URL.                                                                                          | `"https://example.com"`                                                |
| `Email`          | Encodes an email address, optionally with `cc`, `subject`, and `body`.                                  | `"mailto:email@example.com?cc=cc@example.com&subject=Hello"`           |
| `GeoPos`         | Encodes geographic coordinates (latitude and longitude).                                                | `"GEO:37.7749,-122.4194"`                                              |
| `Bookmark`       | Encodes a bookmark, representing a URL and its associated title.                                        | `"MEBKM:URL:https://example.com;TITLE=Example;"`                       |
| `Wifi`           | Encodes Wi-Fi network credentials including SSID, authentication type, and password.                    | `"WIFI:S:MyWifi;T:WPA;P:mypassword;H:false;"`                          |
| `EnterpriseWifi` | Encodes enterprise Wi-Fi credentials, supporting additional fields like `user`, `eap`, and `phase`.     | `"WIFI:S:MyEnterprise;U:username;P:password;E:eap_method;H:false;"`    |
| `Phone`          | Encodes a phone number.                                                                                 | `"TEL:+1234567890"`                                                    |
| `SMS`            | Encodes SMS or MMS messages with phone number and optional subject.                                     | `"SMS:+1234567890:Hello there!"`                                       |
| `BizCard`        | Encodes business card details (BizCard format) with fields like `firstName`, `company`, and `email`.    | `"BIZCARD:N:John;C:Company;E:email@example.com;"`                      |
| `VCard`          | Encodes personal or professional contact details (vCard format) including `name`, `phone`, and `email`. | `"BEGIN:VCARD\nN:John Doe\nTEL:+1234567890\nEMAIL:email@example.com"`  |
| `MeCard`         | Encodes personal contact details in MeCard format.                                                      | `"MECARD:N:John Doe;TEL:+1234567890;EMAIL:email@example.com;"`         |
| `YouTube`        | Encodes a YouTube video ID.                                                                             | `"YOUTUBE:abcd1234"`                                                   |
| `Event`          | Encodes an event in iCalendar (iCal) format with optional fields such as `start`, `end`, and `summary`. | `"BEGIN:VEVENT\nSUMMARY:Meeting\nDTSTART:20240205T090000\nEND:VEVENT"` |
| `GooglePlay`     | Encodes a link to a Google Play app based on the app's package name.                                    | `"market://details?id=com.example.app"`                                |

### QrOptions

Describes the different options available to customize QR codes. Usage : `{ sizeRatio: 0.8, shapes: {...} }`.

| **Option**                               | **Type**                                        | **Description**                                                                                   | **Valeurs possibles**                                                          | **Valeur par défaut** |
| ---------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | --------------------- |
| `sizeRatio`                              | `number`                                        | Définit le ratio de taille du QR code par rapport à son conteneur.                                | Nombre décimal entre`0` et `1` (ex : `0.8` pour 80% de la taille du conteneur) | `1`                   |
| `errorCorrectionLevel`                   | `string`                                        | Niveau de correction d'erreur, plus élevé permet de restaurer plus de données en cas de dommages. | `"LOW"`, `"MEDIUM"`, `"QUARTILE"`, `"HIGH"`                                    | `"MEDIUM"`            |
| `shapes.qrCode.type`                     | `string`                                        | Forme globale du QR code.                                                                         | `"Square"`, `"Circle"`                                                         | `"Square"`            |
| `shapes.matrixPixel.shape.type`          | `string`                                        | Forme des pixels individuels dans la matrice du QR code.                                          | `"Square"`, `"Circle"`, `"Hexagon"`                                            | `"Square"`            |
| `shapes.matrixPixel.shape.sizeRatio`     | `number`                                        | Ratio de la taille des pixels dans la matrice du QR code.                                         | Nombre décimal entre`0` et `1`                                                 | `1`                   |
| `shapes.matrixPixel.color.type`          | `string`                                        | Type de couleur des pixels dans la matrice.                                                       | `"Solid"`, `"Gradient"`                                                        | `"Solid"`             |
| `shapes.matrixPixel.color.value`         | `string`                                        | Couleur des pixels dans la matrice.                                                               | Toute valeur CSS valide (ex :`"black"`, `"#ff0000"`)                           | `"black"`             |
| `shapes.eye.type`                        | `string`                                        | Forme des yeux (les trois éléments de coin dans un QR code).                                      | `"Square"`, `"Circle"`                                                         | `"Square"`            |
| `shapes.eye.cornerRadius`                | `number`                                        | Rayon de courbure des coins des yeux.                                                             | Nombre décimal entre`0` et `1`                                                 | `0`                   |
| `shapes.eye.color.type`                  | `string`                                        | Type de couleur des yeux.                                                                         | `"Solid"`, `"Gradient"`                                                        | `"Solid"`             |
| `shapes.eye.color.value`                 | `string`                                        | Couleur des yeux.                                                                                 | Toute valeur CSS valide (ex :`"green"`, `"#00ff00"`)                           | `"black"`             |
| `shapes.eyeFrame.type`                   | `string`                                        | Forme du cadre des yeux.                                                                          | `"Square"`, `"Circle"`                                                         | `"Square"`            |
| `shapes.eyeFrame.shape.type`             | `string`                                        | Type de forme du cadre des yeux.                                                                  | `"StickyCorners"`, `"RoundedCorners"`                                          | `"StickyCorners"`     |
| `shapes.eyeFrame.color.type`             | `string`                                        | Type de couleur du cadre des yeux.                                                                | `"Solid"`, `"Gradient"`                                                        | `"Solid"`             |
| `shapes.eyeFrame.color.value`            | `string`                                        | Couleur du cadre des yeux.                                                                        | Toute valeur CSS valide (ex :`"black"`, `"#000000"`)                           | `"black"`             |
| `shapes.logo.type`                       | `string`                                        | Forme du logo intégré dans le QR code.                                                            | `"RoundCorners"`, `"SquareCorners"`                                            | `"RoundCorners"`      |
| `shapes.logo.imageData`                  | `string` (URL base64 ou chemin vers un fichier) | Image du logo à intégrer dans le QR code.                                                         | Chemin vers un fichier image ou données base64                                 | `null`                |
| `shapes.logo.sizeRatio`                  | `number`                                        | Ratio de la taille du logo par rapport au QR code.                                                | Nombre décimal entre`0` et `1`                                                 | `0.2`                 |
| `shapes.logo.padding`                    | `number`                                        | Taille du padding autour du logo.                                                                 | Nombre entier en pixels                                                        | `4`                   |
| `shapes.logo.color.type`                 | `string`                                        | Type de couleur du fond du logo.                                                                  | `"Solid"`, `"Gradient"`                                                        | `"Solid"`             |
| `shapes.logo.color.value`                | `string`                                        | Couleur du fond du logo.                                                                          | Toute valeur CSS valide (ex :`"white"`, `"#ffffff"`)                           | `"white"`             |
| `shapes.timingLine.pixelShape.type`      | `string`                                        | Forme des pixels de la ligne de synchronisation (ligne de timing).                                | `"Square"`, `"Circle"`                                                         | `"Square"`            |
| `shapes.timingLine.pixelShape.sizeRatio` | `number`                                        | Ratio de la taille des pixels de la ligne de synchronisation.                                     | Nombre décimal entre`0` et `1`                                                 | `1`                   |
| `shapes.timingLine.color.type`           | `string`                                        | Type de couleur de la ligne de synchronisation.                                                   | `"Solid"`, `"Gradient"`                                                        | `"Solid"`             |
| `shapes.timingLine.color.value`          | `string`                                        | Couleur de la ligne de synchronisation.                                                           | Toute valeur CSS valide (ex :`"black"`, `"#000000"`)                           | `"black"`             |
| `shapes.background.color.type`           | `string`                                        | Type de couleur d'arrière-plan du QR code.                                                        | `"Solid"`, `"Gradient"`                                                        | `"Solid"`             |
| `shapes.background.color.value`          | `string`                                        | Couleur d'arrière-plan du QR code.                                                                | Toute valeur CSS valide (ex :`"white"`, `"#ffffff"`)                           | `"white"`             |
| `shapes.alignmentPattern.type`           | `string`                                        | Forme des motifs d'alignement pour les QR codes de grande taille.                                 | `"Square"`, `"Circle"`                                                         | `"Square"`            |
| `shapes.alignmentPattern.shape.type`     | `string`                                        | Type de forme des motifs d'alignement.                                                            | `"StickyCorners"`, `"RoundedCorners"`                                          | `"StickyCorners"`     |
| `shapes.alignmentPattern.color.type`     | `string`                                        | Type de couleur des motifs d'alignement.                                                          | `"Solid"`, `"Gradient"`                                                        | `"Solid"`             |
| `shapes.alignmentPattern.color.value`    | `string`                                        | Couleur des motifs d'alignement.                                                                  | Toute valeur CSS valide (ex :`"black"`, `"#000000"`)                           | `"black"`             |

## 🙋‍♀️ FAQ

### I can't scan my code

- Choose contrast colors for your code and dont't use too many of them at once.

## 📝 Todo

All contributions are welcome. Here are some ideas to improve the library:

- [ ] Add new shapes for the eye frame (multiple ways with rounded corners)
- [ ] Add random colors type
- [ ] All you think is missing or could be improved !

## ⚖️ License

Released under the [MIT License](./LICENSE).
