// Supported MP4 types for media
type Mp4Support = "capped_4k" | "audioOnly";

// Error field structure for detailed error reporting
type ErrorField = { key: string; value: string };

// Interface for pagination options
export interface PaginationProps {
  limit?: number;
  offset?: number;
  orderBy?: string;
}

// Interface for access policy configuration
export interface AccessPolicy {
  accessPolicy: string;
}

// Interface for signing key properties
export interface SigningKeyProps {
  signingKeyId: string;
}

// Interface for media properties
export interface MediaProps {
  mediaId?: string;
  playbackId?: string;
}

// Interface for update operations with dynamic key-value pairs
export interface UpdateObject {
  [key: string]: any;
}

// Interface for live stream properties
export interface LiveStreamProps {
  streamId?: string;
  playbackId?: string;
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

// Interface for uploading media from a URL
export interface UploadMediaFromUrlProps {
  inputs?: Array<{
    type?: string;
    url?: string; // URL must be a string
  }>;
  metadata?: {
    [key: string]: string; // Metadata is optional and allows any key-value pair
  };
  accessPolicy?: string; // Allowed access policies
}

// Interface for direct upload request body
export interface DirectUploadRequest {
  corsOrigin?: string; // CORS origin, e.g., "*"
  pushMediaSettings?: PushMediaSettings; // Optional configuration settings
  inputs?: MediaInput[]; // Array of media inputs
  metadata?: Metadata; // Optional metadata for searchable tags
  subtitles?: Subtitle[]; // Optional subtitle configurations
  optimizeAudio?: boolean; // Enhance audio quality
  maxResolution?: string; // Max resolution, defaults to "1080p"
  mp4Support?: Mp4Support; // MP4 support type
}

// Push Media Settings
interface PushMediaSettings {
  accessPolicy?: string; // Access control for the media
  startTime?: number; // Start time for encoding in seconds
  endTime?: number; // End time for encoding in seconds
}

// Media Input object
interface MediaInput {
  type?: "video" | "audio" | "watermark"; // Type of input
  startTime?: number; // Start time in seconds for encoding
  endTime?: number; // End time in seconds for encoding
  introUrl?: string; // Intro video URL
  outroUrl?: string; // Outro video URL
  expungeSegments?: string[]; // List of segments to remove, e.g., ["start-end"]
  watermark?: Watermark; // Watermark object
}

// Watermark object
interface Watermark {
  type?: "watermark"; // Only watermark type supported
  url?: string; // URL of the watermark image
  placement?: WatermarkPlacement; // Optional placement settings
}

// Watermark Placement object
interface WatermarkPlacement {
  width?: string; // Width in percentage or pixels
  height?: string; // Height in percentage or pixels
  opacity?: string; // Opacity in percentage
}

// Metadata object for tagging videos
interface Metadata {
  [key: string]: string; // Key-value pairs for metadata
}

// Subtitles object
interface Subtitle {
  name: string; // Name of the subtitle language
  metadata?: Metadata; // Metadata for the subtitles
  languageCode: string; // Language code (BCP 47 compliant)
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
  encodedAuthToken?: string | undefined;
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
