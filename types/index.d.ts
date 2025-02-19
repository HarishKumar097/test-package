// Error field structure for detailed error reporting
type ErrorField = { key: string; value: string };

// Interface for pagination options
export interface PaginationProps {
  limit?: number | string;
  offset?: number | string;
  orderBy?: string;
}

// Interface for access policy configuration
export interface AccessPolicy {
  accessPolicy: string;
}

// Interface for media properties
export interface MediaProps {
  mediaId?: string;
  playbackId?: string[] | string;
}

// Interface for update operations with dynamic key-value pairs
export interface UpdateObject {
  [key: string]: any;
}

// Interface for live stream properties
export interface LiveStreamProps {
  streamId?: string;
  playbackId?: string[] | string;
}

// Interface for simulcast properties
export interface SimulcastProps {
  streamId?: string;
  simulcastId?: string;
}

// Interface for simulcast object configuration
export interface SimulcastObject {
  url: string;
  streamKey: string;
  metadata?: Record<string, any>;
}

// Metadata object for tagging videos
interface Metadata {
  [key: string]: string; // Key-value pairs for metadata
}

// Interface for configuration error response
export interface ConfigErrorResponse {
  success: boolean;
  error: {
    code: number;
    message: string;
    fields?: ErrorField[];
  };
}

// Interface for constructing request objects
export interface RequestObject {
  httpAgent?: string;
  domain?: string;
  encodedAuthToken?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: Record<string, any> | {};
}

// Interface for HTTP header options
export interface HeaderOptions {
  method: string;
  headers: {
    "Content-Type": string;
    Authorization: string;
  };
  body?: string;
}

// Interface for fetch responses
export interface FetchResponse {
  success: boolean;
  data?: any;
  error?: {
    code: number;
    message: string;
    fields?: ErrorField[];
  };
}

// Input Media Settings object
interface InputMediaSettings {
  maxResolution?: string; // Max resolution for encoding, default: 1080p
  reconnectWindow?: number; // Reconnect window in seconds (60 to 1800, default: 60)
  mediaPolicy?: string; // Determines media policy for VOD, default: public
  metadata?: Metadata; // Optional dynamic metadata key-value pairs
  enableDvrMode?: boolean; // Enable DVR mode, default: false
}

// Interface for initiating live stream properties
export interface InitiateLiveStreamProps {
  playbackSettings?: AccessPolicy; // Required playback settings
  inputMediaSettings?: InputMediaSettings; // Required input media settings
}

// Interface for updating simulcast properties
export interface UpdateSimulcastProps {
  isEnabled?: boolean;
  metadata?: Metadata;
}

// Interface for Fetcher utility methods
export interface FetcherProps {
  fetchData(url: string, header: HeaderOptions): Promise<FetchResponse>;
  constructUrl(
    requestObj?: RequestObject,
    path?: string,
    queryParams?: string
  ): string;
  constructHeaders(requestObj: RequestObject): HeaderOptions;
}

interface WatermarkPlacement {
  xAlign?: string;
  xMargin?: string;
  yAlign?: string;
  yMargin?: string;
}

interface Watermark {
  placement?: WatermarkPlacement;
  type?: string;
  url?: string;
  width?: string;
  height?: string;
  opacity?: string;
}

interface ImposeTrack {
  url?: string;
  startTime?: number;
  endTime?: number;
  fadeInLevel?: number;
  fadeOutLevel?: number;
}

interface Audio {
  type?: string;
  swapTrackUrl?: string;
  imposeTracks?: ImposeTrack[];
}

interface VideoInput {
  type?: string; // required
  url?: string; // required
  watermark?: Watermark;
  placement?: WatermarkPlacement;
  opacity?: string;
  swapTrackUrl?: string;
  audio?: Audio;
  startTime?: number;
  endTime?: number;
  introUrl?: string;
  outroUrl?: string;
  width?: string;
  height?: string;
  expungeSegments?: string[];
  imposeTracks?: ImposeTrack[];
}

interface Subtitle {
  metadata?: Record<string, string>; // Key-value pairs for metadata
  languageName?: string;
  languageCode?: string;
}

interface MediaSettings {
  metadata?: Metadata;
  subtitle?: Subtitle;
  accessPolicy?: string; // required
  optimizeAudio?: boolean;
  maxResolution?: string;
  inputs?: VideoInput[]; // Inputs are part of MediaSettings
  mp4Support?: string;
  startTime?: number;
  endTime?: number;
}

interface PushMediaSettings {
  accessPolicy?: string; // required
  metadata?: Metadata;
  subtitles?: Subtitle;
  optimizeAudio?: boolean;
  maxResolution?: string;
  startTime?: number;
  endTime?: number;
  inputs?: VideoInput[]; // Inputs are part of PushMediaSettings
  mp4Support?: string;
}

export interface UploadMediaFromUrlProps {
  metadata?: Metadata;
  subtitles?: Subtitle;
  accessPolicy?: string; // required
  optimizeAudio?: boolean;
  maxResolution?: string;
  inputs?: VideoInput[];
  mp4Support?: string;
  startTime?: number;
  endTime?: number;
}

export interface DirectUploadRequest {
  corsOrigin?: string;
  pushMediaSettings?: PushMediaSettings; // Settings for media upload configuration, including inputs
  mediaSettings?: MediaSettings; // General media settings including access control, resolution, etc.
}
