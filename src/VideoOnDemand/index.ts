import type {
  AccessPolicy,
  RequestObject,
  DirectUploadRequest,
  MediaProps,
  PaginationProps,
  UpdateObject,
  UploadMediaFromUrlProps,
  FetcherProps,
} from "../../types";

import Fetcher from "../NetworkFetcher";

class Media {
  mediaPath: string;
  fetch: FetcherProps;

  constructor() {
    this.fetch = new Fetcher();
    this.mediaPath = "on-demand";
  }

  // Creates a new media asset.
  async createAsset(
    requestObj: RequestObject,
    props: UploadMediaFromUrlProps = {}
  ) {
    const path = this.mediaPath;
    const url = this.fetch.constructUrl(requestObj, path);
    const { accessPolicy = "public", ...restProps } = props;
    const constructObject: RequestObject = {
      ...requestObj,
      method: "POST",
      body: {
        accessPolicy,
        ...restProps,
      },
    };
    const createAssetHeader = this.fetch.constructHeaders(constructObject);
    const createUrlAsset = await this.fetch.fetchData(url, createAssetHeader);

    return createUrlAsset;
  }

  // Uploads a media asset using direct upload.
  async uploadAsset(
    requestObj: RequestObject,
    props: DirectUploadRequest = {
      corsOrigin: "",
      pushMediaSettings: {
        accessPolicy: "public", // Default access policy
        inputs: [], // Default empty array for inputs (inside pushMediaSettings)
      },
    }
  ) {
    const path = `${this.mediaPath}/uploads`;
    const url = this.fetch.constructUrl(requestObj, path);
    const {
      corsOrigin = "*",
      pushMediaSettings = { accessPolicy: "public" },
      ...restProps
    } = props;
    const { accessPolicy = "public", ...restPushMediaSettings } =
      pushMediaSettings;
    const constructObject: RequestObject = {
      ...requestObj,
      method: "POST",
      body: {
        corsOrigin,
        pushMediaSettings: {
          accessPolicy,
          ...restPushMediaSettings,
        },
        ...restProps,
      },
    };
    const uploadAssetHeader = this.fetch.constructHeaders(constructObject);
    const uploadMediaAsset = await this.fetch.fetchData(url, uploadAssetHeader);

    return uploadMediaAsset;
  }

  // Retrieves all media assets with pagination support.
  async getAllAssets(props?: PaginationProps, requestObj?: RequestObject) {
    const path = this.mediaPath;
    const queryParams = `?limit=${props?.limit ?? 10}&offset=${props?.offset ?? 1}&orderBy=${props?.orderBy ?? "desc"}`;
    const url = this.fetch.constructUrl(requestObj, path, queryParams);
    const constructObject: RequestObject = {
      ...requestObj,
      method: "GET",
    };
    const getAllAssetsHeader = this.fetch.constructHeaders(constructObject);
    const assetsResponse = await this.fetch.fetchData(url, getAllAssetsHeader);

    return assetsResponse;
  }

  // Retrieves details of a specific media asset.
  async getAsset(props: MediaProps, requestObj: RequestObject) {
    const path = `${this.mediaPath}/${props?.mediaId ?? ""}`;
    const url = this.fetch.constructUrl(requestObj, path);
    const constructObject: RequestObject = {
      ...requestObj,
      method: "GET",
    };
    const getAssetsHeader = this.fetch.constructHeaders(constructObject);
    const assetsResponse = await this.fetch.fetchData(url, getAssetsHeader);

    return assetsResponse;
  }

  // Retrieves detailed information about a media asset's input.
  async getAssetInfo(props: MediaProps, requestObj: RequestObject) {
    const path = `${this.mediaPath}/${props?.mediaId ?? ""}/input-info`;
    const url = this.fetch.constructUrl(requestObj, path);
    const constructObject: RequestObject = {
      ...requestObj,
      method: "GET",
    };
    const getAssetInfoHeader = this.fetch.constructHeaders(constructObject);
    const assetInfoResponse = await this.fetch.fetchData(
      url,
      getAssetInfoHeader
    );

    return assetInfoResponse;
  }

  // Updates the details of a media asset.
  async updateAsset(
    props: MediaProps,
    updateObject: UpdateObject,
    requestObj: RequestObject
  ) {
    const path = `${this.mediaPath}/${props?.mediaId ?? ""}`;
    const url = this.fetch.constructUrl(requestObj, path);
    const constructObject: RequestObject = {
      ...requestObj,
      method: "PATCH",
      body: {
        ...(updateObject ?? {}),
      },
    };
    const updateAssetHeader = this.fetch.constructHeaders(constructObject);
    const updateAssetResponse = await this.fetch.fetchData(
      url,
      updateAssetHeader
    );

    return updateAssetResponse;
  }

  // Deletes a media asset.
  async deleteAsset(props: MediaProps, requestObj: RequestObject) {
    const path = `${this.mediaPath}/${props?.mediaId ?? ""}`;
    const url = this.fetch.constructUrl(requestObj, path);
    const constructObject: RequestObject = {
      ...requestObj,
      method: "DELETE",
    };
    const deleteAssetHeader = this.fetch.constructHeaders(constructObject);
    const deleteAssetResponse = await this.fetch.fetchData(
      url,
      deleteAssetHeader
    );

    return deleteAssetResponse;
  }

  //  Adds a playback ID to a media asset with a specific access policy.
  async addMediaPlaybackId(
    props: MediaProps,
    playbackPolicy: AccessPolicy,
    requestObj: RequestObject
  ) {
    const path = `${this.mediaPath}/${props?.mediaId ?? ""}/playback-ids`;
    const url = this.fetch.constructUrl(requestObj, path);
    const constructObject: RequestObject = {
      ...requestObj,
      method: "POST",
      body: {
        accessPolicy: playbackPolicy?.accessPolicy ?? "public",
      },
    };
    const createPlaybackIdHeader = this.fetch.constructHeaders(constructObject);
    const createPlaybackIdResponse = await this.fetch.fetchData(
      url,
      createPlaybackIdHeader
    );

    return createPlaybackIdResponse;
  }

  // Removes a playback ID from a media asset.
  async removeMediaPlaybackId(props: MediaProps, requestObj: RequestObject) {
    const path = `${this.mediaPath}/${props?.mediaId ?? ""}/playback-ids`;

    let queryParams = "";
    if (props?.playbackId) {
      if (Array.isArray(props.playbackId)) {
        const playbackIdParams = props.playbackId.map(
          (id) => "playbackId=" + id
        );
        queryParams = "?" + playbackIdParams.join("&");
      } else if (typeof props.playbackId === "string") {
        queryParams = "?playbackId=" + props.playbackId;
      }
    }

    const url = this.fetch.constructUrl(requestObj, path, queryParams);
    const constructObject: RequestObject = {
      ...requestObj,
      method: "DELETE",
    };
    const deletePlaybackIdHeader = this.fetch.constructHeaders(constructObject);
    const deletePlaybackIdResponse = await this.fetch.fetchData(
      url,
      deletePlaybackIdHeader
    );

    return deletePlaybackIdResponse;
  }
}

export default Media;
