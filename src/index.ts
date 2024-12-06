import { Buffer } from "buffer";

import type {
  RequestObject,
  PaginationProps,
  SigningKeyProps,
  UploadMediaFromUrlProps,
  DirectUploadRequest,
  MediaProps,
  AccessPolicy,
  LiveStreamProps,
  SimulcastObject,
  SimulcastProps,
  UpdateObject,
  InitiateLiveStreamProps,
  UpdateSimulcastProps,
} from "./utils/Types";

import Media from "./Media";
import Signingkey from "./System";
import LiveStream from "./Live";

class FastPix {
  private accessTokenId: string; // Access token ID for authentication
  private secretKey: string; // Secret key for authentication
  private signingKeyInstance: Signingkey | null = null; // Signing key service instance
  private mediaService: Media | null = null; // Media service instance
  private liveStream: LiveStream | null = null; // Live stream service instance
  private encodedAuthToken: string | undefined; // Encoded authorization token
  private RequestObject: RequestObject; // Request configuration object

  constructor(props: { accessTokenId: string; secretKey: string }) {
    this.accessTokenId = props?.accessTokenId;
    this.secretKey = props?.secretKey;
    this.validateSecrets(); // Validate the provided credentials

    this.mediaService = new Media();
    this.signingKeyInstance = new Signingkey();
    this.liveStream = new LiveStream();

    // Encode the access token and secret key into a base64 string
    if (this.accessTokenId && this.secretKey) {
      this.encodedAuthToken = Buffer.from(
        `${this.accessTokenId}:${this.secretKey}`
      ).toString("base64");
    }

    // Set up the default request object
    this.RequestObject = {
      httpAgent: "https",
      domain: "v1.fastpix.io",
      encodedAuthToken: this.encodedAuthToken,
    };
  }

  // Validate the provided credentials
  validateSecrets() {
    if (!this.accessTokenId || typeof this.accessTokenId !== "string") {
      throw new Error(
        'Invalid accessTokenId: The "accessTokenId" is required.'
      );
    }

    if (!this.secretKey || typeof this.secretKey !== "string") {
      throw new Error('Invalid secretKey: The "secretKey" is required.');
    }
  }

  // Signing Key Methods
  // Creates a new signing key
  generateSigningKey() {
    return this.signingKeyInstance
      ? this.signingKeyInstance.createSigningKey(this.RequestObject)
      : null;
  }

  // Retrieves a list of signing keys with pagination
  getAllSingingKeyList(props?: PaginationProps) {
    return this.signingKeyInstance
      ? this.signingKeyInstance.getAllSigningKeys(props, this.RequestObject)
      : null;
  }

  // Fetches a signing key by its ID.
  getSigningKeyById(props: SigningKeyProps) {
    return this.signingKeyInstance
      ? this.signingKeyInstance.getSigningKey(props, this.RequestObject)
      : null;
  }

  // Removes a signing key by its ID.
  deleteSigningKey(props: SigningKeyProps) {
    return this.signingKeyInstance
      ? this.signingKeyInstance.deleteSigningKey(props, this.RequestObject)
      : null;
  }

  // Media Methods
  // Uploads media from a given URL
  uploadMediaFromUrl(props: UploadMediaFromUrlProps) {
    return this.mediaService
      ? this.mediaService.createAsset(props, this.RequestObject)
      : null;
  }

  // Uploads media from a file input.
  uploadMediaFromDevice(props: DirectUploadRequest) {
    return this.mediaService
      ? this.mediaService.uploadAsset(props, this.RequestObject)
      : null;
  }

  // Retrieves all media assets with pagination.
  getAllMediaAssets(props?: PaginationProps) {
    return this.mediaService
      ? this.mediaService.getAllAssets(props, this.RequestObject)
      : null;
  }

  // Fetches a media asset by its ID.
  getMediaAssetById(props: MediaProps) {
    return this.mediaService
      ? this.mediaService.getAsset(props, this.RequestObject)
      : null;
  }

  // Fetches information about a media asset by its ID.
  getMediaAssetInfo(props: MediaProps) {
    return this.mediaService
      ? this.mediaService.getAssetInfo(props, this.RequestObject)
      : null;
  }

  // Modifies metadata of an existing media asset.
  updateMediaAsset(props: MediaProps, updateObject: UpdateObject) {
    return this.mediaService
      ? this.mediaService.updateAsset(props, updateObject, this.RequestObject)
      : null;
  }

  // Removes a media asset by its ID.
  deleteMediaAsset(props: MediaProps) {
    return this.mediaService
      ? this.mediaService.deleteAsset(props, this.RequestObject)
      : null;
  }

  // Creates a playback ID for a media asset.
  generateMediaPlaybackId(props: MediaProps, accessPolicy: AccessPolicy) {
    return this.mediaService
      ? this.mediaService.addMediaPlaybackId(
          props,
          accessPolicy,
          this.RequestObject
        )
      : null;
  }

  // Removes a playback ID from a media asset.
  deleteMediaPlaybackId(props: MediaProps) {
    return this.mediaService
      ? this.mediaService.removeMediaPlaybackId(props, this.RequestObject)
      : null;
  }

  // Initiates a new live stream.
  initiateLiveStream(props: InitiateLiveStreamProps) {
    return this.liveStream
      ? this.liveStream.createNewLiveStream(props, this.RequestObject)
      : null;
  }

  // Retrieves all live streams with pagination.
  getAllLiveStreams(props?: PaginationProps) {
    return this.liveStream
      ? this.liveStream.getAllLiveStreams(props, this.RequestObject)
      : null;
  }

  // Fetches a live stream by its ID.
  getLiveStreamById(props: LiveStreamProps) {
    return this.liveStream
      ? this.liveStream.getLiveStream(props, this.RequestObject)
      : null;
  }

  // Modifies an existing live stream.
  updateLiveStream(props: LiveStreamProps, updateObject: any) {
    return this.liveStream
      ? this.liveStream.updateLiveStream(
          props,
          updateObject,
          this.RequestObject
        )
      : null;
  }

  // Removes a live stream by its ID.
  deleteLiveStream(props: LiveStreamProps) {
    return this.liveStream
      ? this.liveStream.deleteLiveStream(props, this.RequestObject)
      : null;
  }

  // Creates a playback ID for a live stream.
  generateLiveStreamPlaybackId(
    props: LiveStreamProps,
    accessPolicy: AccessPolicy
  ) {
    return this.liveStream
      ? this.liveStream.createLiveStreamPlaybackId(
          props,
          accessPolicy,
          this.RequestObject
        )
      : null;
  }

  // Removes a playback ID from a live stream.
  deleteLiveStreamPlaybackId(props: LiveStreamProps) {
    return this.liveStream
      ? this.liveStream.removeLivePlaybackId(props, this.RequestObject)
      : null;
  }

  // Fetches the playback policy for a live stream.
  getLiveStreamPlaybackPolicy(props: LiveStreamProps) {
    return this.liveStream
      ? this.liveStream.getLiveStreamPlaybackPolicy(props, this.RequestObject)
      : null;
  }

  // Initiates a simulcast for a live stream.
  initiateLiveStreamSimulcast(
    props: LiveStreamProps,
    liveStreamObj: SimulcastObject
  ) {
    return this.liveStream
      ? this.liveStream.createLiveStreamSimulcast(
          props,
          liveStreamObj,
          this.RequestObject
        )
      : null;
  }

  // Retrieves a simulcast for a live stream.
  getLiveStreamSimulcast(props: SimulcastProps) {
    return this.liveStream
      ? this.liveStream.getLiveStreamSimulcast(props, this.RequestObject)
      : null;
  }

  // Modifies an existing simulcast for a live stream.
  updateLiveStreamSimulcast(
    props: SimulcastProps,
    simulcastObj: UpdateSimulcastProps
  ) {
    return this.liveStream
      ? this.liveStream.updateLiveStreamSimulcast(
          props,
          simulcastObj,
          this.RequestObject
        )
      : null;
  }

  // Removes a simulcast from a live stream.
  deleteLiveStreamSimulcast(props: SimulcastProps) {
    return this.liveStream
      ? this.liveStream.deleteLiveStreamSimulcast(props, this.RequestObject)
      : null;
  }
}

export default FastPix;
