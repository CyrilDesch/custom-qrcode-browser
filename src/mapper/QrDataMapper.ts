import {
  Text,
  Authentication,
  BizCard,
  Bookmark,
  Email,
  Event,
  EnterpriseWifi,
  GeoPos,
  GooglePlay,
  MeCard,
  Phone,
  SMS,
  Url,
  VCard,
  Wifi,
  YouTube,
  type IQrData,
} from "../encode/QrData";

/** --------------------------------------------------------------------------
 * Factory data configuration.
 */

export type QrDataConfig =
  | TextConfig
  | UrlConfig
  | EmailConfig
  | GeoPosConfig
  | BookmarkConfig
  | WifiConfig
  | EnterpriseWifiConfig
  | PhoneConfig
  | SMSConfig
  | BizCardConfig
  | VCardConfig
  | MeCardConfig
  | YouTubeConfig
  | EventConfig
  | GooglePlayConfig;

export function createQrDataFromConfig(config: QrDataConfig): IQrData {
  switch (config.type) {
    case "Text":
      return new Text(config.data.value);
    case "Url":
      return new Url(config.data.url);
    case "Email":
      return new Email(
        config.data.email,
        config.data.copyTo,
        config.data.subject,
        config.data.body,
      );
    case "GeoPos":
      return new GeoPos(config.data.lat, config.data.lon);
    case "Bookmark":
      return new Bookmark(config.data.url, config.data.title);
    case "Wifi":
      return new Wifi(
        config.data.authentication,
        config.data.ssid,
        config.data.psk,
        config.data.hidden ?? false,
      );
    case "EnterpriseWifi":
      return new EnterpriseWifi(
        config.data.ssid,
        config.data.psk,
        config.data.hidden ?? false,
        config.data.user,
        config.data.eap,
        config.data.phase,
      );
    case "Phone":
      return new Phone(config.data.phoneNumber);
    case "SMS":
      return new SMS(
        config.data.phoneNumber,
        config.data.subject,
        config.data.isMMS,
      );
    case "BizCard":
      return new BizCard(
        config.data.firstName,
        config.data.secondName,
        config.data.job,
        config.data.company,
        config.data.address,
        config.data.phone,
        config.data.email,
      );
    case "VCard":
      return new VCard(
        config.data.name,
        config.data.company,
        config.data.title,
        config.data.phoneNumber,
        config.data.email,
        config.data.address,
        config.data.website,
        config.data.note,
      );
    case "MeCard":
      return new MeCard(
        config.data.name,
        config.data.address,
        config.data.phoneNumber,
        config.data.email,
      );
    case "YouTube":
      return new YouTube(config.data.videoId);
    case "Event":
      return new Event(
        config.data.uid,
        config.data.stamp,
        config.data.organizer,
        config.data.start,
        config.data.end,
        config.data.summary,
      );
    case "GooglePlay":
      return new GooglePlay(config.data.appPackage);
  }
}

/** --------------------------------------------------------------------------
 * QrData types configuration.
 */

interface TextConfig {
  type: "Text";
  data: { value: string };
}

interface UrlConfig {
  type: "Url";
  data: { url: string };
}

interface EmailConfig {
  type: "Email";
  data: {
    email: string;
    copyTo?: string;
    subject?: string;
    body?: string;
  };
}

interface GeoPosConfig {
  type: "GeoPos";
  data: { lat: number; lon: number };
}

interface BookmarkConfig {
  type: "Bookmark";
  data: { url: string; title: string };
}

interface WifiConfig {
  type: "Wifi";
  data: {
    authentication?: Authentication;
    ssid?: string;
    psk?: string;
    hidden?: boolean;
  };
}

interface EnterpriseWifiConfig {
  type: "EnterpriseWifi";
  data: {
    ssid?: string;
    psk?: string;
    hidden?: boolean;
    user?: string;
    eap?: string;
    phase?: string;
  };
}

interface PhoneConfig {
  type: "Phone";
  data: { phoneNumber: string };
}

interface SMSConfig {
  type: "SMS";
  data: { phoneNumber: string; subject: string; isMMS: boolean };
}

interface BizCardConfig {
  type: "BizCard";
  data: {
    firstName?: string;
    secondName?: string;
    job?: string;
    company?: string;
    address?: string;
    phone?: string;
    email?: string;
  };
}

interface VCardConfig {
  type: "VCard";
  data: {
    name?: string;
    company?: string;
    title?: string;
    phoneNumber?: string;
    email?: string;
    address?: string;
    website?: string;
    note?: string;
  };
}

interface MeCardConfig {
  type: "MeCard";
  data: {
    name?: string;
    address?: string;
    phoneNumber?: string;
    email?: string;
  };
}

interface YouTubeConfig {
  type: "YouTube";
  data: { videoId: string };
}

interface EventConfig {
  type: "Event";
  data: {
    uid?: string;
    stamp?: string;
    organizer?: string;
    start?: string;
    end?: string;
    summary?: string;
  };
}

interface GooglePlayConfig {
  type: "GooglePlay";
  data: { appPackage: string };
}
