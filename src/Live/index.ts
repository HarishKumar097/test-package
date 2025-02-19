import type {
  AccessPolicy,
  RequestObject,
  InitiateLiveStreamProps,
  LiveStreamProps,
  PaginationProps,
  SimulcastObject,
  SimulcastProps,
  UpdateObject,
  UpdateSimulcastProps,
  FetcherProps,
  HeaderOptions,
} from "../../types";

import Fetcher from "../NetworkFetcher";

class LiveStream {
  livePath: string;
  fetch: FetcherProps;

  constructor() {
    this.fetch = new Fetcher();
    this.livePath = "live/streams";
  }

  // Creates a new live stream with the given properties.
  async createNewLiveStream(
    props: InitiateLiveStreamProps,
    requestObj: RequestObject
  ) {
    const path = this.livePath;
    const url = this.fetch.constructUrl(requestObj, path);
    const constructObject: RequestObject = {
      ...requestObj,
      method: "POST",
      body: {
        playbackSettings: {
          accessPolicy: props?.playbackSettings?.accessPolicy ?? "public",
        },
        inputMediaSettings: {
          ...props?.inputMediaSettings,
        },
      },
    };
    const createLiveStreamHeader = this.fetch.constructHeaders(constructObject);
    const createLiveStreamResponse = await this.fetch.fetchData(
      url,
      createLiveStreamHeader
    );

    return createLiveStreamResponse;
  }

  // Retrieves all live streams with pagination support.
  async getAllLiveStreams(props?: PaginationProps, requestObj?: RequestObject) {
    const path = this.livePath;
    const queryParams = `?limit=${props?.limit ?? 10}&offset=${props?.offset ?? 1}&orderBy=${props?.orderBy ?? "desc"}`;
    const url = this.fetch.constructUrl(requestObj, path, queryParams);
    const constructObject: RequestObject = {
      ...requestObj,
      method: "GET",
    };
    const getAllLiveStreamHeader = this.fetch.constructHeaders(constructObject);
    const getAllLiveStreamResponse = await this.fetch.fetchData(
      url,
      getAllLiveStreamHeader
    );

    return getAllLiveStreamResponse;
  }

  // Retrieves details of a specific live stream.
  async getLiveStream(props: LiveStreamProps, requestObj: RequestObject) {
    const path = `${this.livePath}/${props?.streamId ?? ""}`;
    const url = this.fetch.constructUrl(requestObj, path);
    const constructObject: RequestObject = {
      ...requestObj,
      method: "GET",
    };
    const getLiveStreamHeader = this.fetch.constructHeaders(constructObject);
    const getLiveStreamResponse = await this.fetch.fetchData(
      url,
      getLiveStreamHeader
    );

    return getLiveStreamResponse;
  }

  // Updates a live stream with new properties.
  async updateLiveStream(
    props: LiveStreamProps,
    updateObject: UpdateObject,
    requestObj: RequestObject
  ) {
    const path = `${this.livePath}/${props?.streamId ?? ""}`;
    const url = this.fetch.constructUrl(requestObj, path);
    const constructObject: RequestObject = {
      ...requestObj,
      method: "PATCH",
      body: {
        ...(updateObject ?? {}),
      },
    };
    const updateLiveStreamHeader: HeaderOptions =
      this.fetch.constructHeaders(constructObject);
    const updateLiveStreamResponse = await this.fetch.fetchData(
      url,
      updateLiveStreamHeader
    );

    return updateLiveStreamResponse;
  }

  // Deletes a specific live stream.
  async deleteLiveStream(props: LiveStreamProps, requestObj: RequestObject) {
    const path = `${this.livePath}/${props?.streamId ?? ""}`;
    const url = this.fetch.constructUrl(requestObj, path);
    const constructObject: RequestObject = {
      ...requestObj,
      method: "DELETE",
    };
    const deleteLiveStream: HeaderOptions =
      this.fetch.constructHeaders(constructObject);
    const deleteLiveStreamResponse = await this.fetch.fetchData(
      url,
      deleteLiveStream
    );

    return deleteLiveStreamResponse;
  }

  // Creates a playback ID for a live stream with specified access policy.
  async createLiveStreamPlaybackId(
    props: LiveStreamProps,
    playbackPolicy: AccessPolicy,
    requestObj: RequestObject
  ) {
    const path = `${this.livePath}/${props?.streamId ?? ""}/playback-ids`;
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

  // Removes a playback ID associated with a live stream.
  async removeLivePlaybackId(
    props: LiveStreamProps,
    requestObj: RequestObject
  ) {
    const path = `${this.livePath}/${props?.streamId ?? ""}/playback-ids`;

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

  // Retrieves the playback policy for a specific playback ID in a live stream.
  async getLiveStreamPlaybackPolicy(
    props: LiveStreamProps,
    requestObj: RequestObject
  ) {
    const path = `${this.livePath}/${props?.streamId ?? ""}/playback-ids/${props?.playbackId}`;
    const url = this.fetch.constructUrl(requestObj, path);
    const constructObject: RequestObject = {
      ...requestObj,
      method: "GET",
    };
    const getLiveStreamPlaybackPolicyHeader =
      this.fetch.constructHeaders(constructObject);
    const getLiveStreamPlaybackPolicyResponse = await this.fetch.fetchData(
      url,
      getLiveStreamPlaybackPolicyHeader
    );

    return getLiveStreamPlaybackPolicyResponse;
  }

  // Creates a new simulcast target for a live stream.
  async createLiveStreamSimulcast(
    props: LiveStreamProps,
    liveStreamObj: SimulcastObject,
    requestObj: RequestObject
  ) {
    const path = `${this.livePath}/${props?.streamId ?? ""}/simulcast`;
    const url = this.fetch.constructUrl(requestObj, path);
    const constructObject: RequestObject = {
      ...requestObj,
      method: "POST",
      body: {
        ...liveStreamObj,
      },
    };
    const createSimulCastHeader = this.fetch.constructHeaders(constructObject);
    const createSimulCastResponse = await this.fetch.fetchData(
      url,
      createSimulCastHeader
    );

    return createSimulCastResponse;
  }

  // Retrieves details of a specific simulcast target for a live stream.
  async getLiveStreamSimulcast(
    props: SimulcastProps,
    requestObj: RequestObject
  ) {
    const path = `${this.livePath}/${props?.streamId ?? ""}/simulcast/${props?.simulcastId}`;
    const url = this.fetch.constructUrl(requestObj, path);
    const constructObject: RequestObject = {
      ...requestObj,
      method: "GET",
    };
    const getSimulcastHeader = this.fetch.constructHeaders(constructObject);
    const getSimulcastResponse = await this.fetch.fetchData(
      url,
      getSimulcastHeader
    );

    return getSimulcastResponse;
  }

  // Updates an existing simulcast target for a live stream.
  async updateLiveStreamSimulcast(
    props: SimulcastProps,
    simulcastObj: UpdateSimulcastProps,
    requestObj: RequestObject
  ) {
    const path = `${this.livePath}/${props?.streamId ?? ""}/simulcast/${props?.simulcastId}`;
    const url = this.fetch.constructUrl(requestObj, path);
    const constructObject: RequestObject = {
      ...requestObj,
      method: "PUT",
      body: {
        ...simulcastObj,
      },
    };
    const updateLiveStreamHeader = this.fetch.constructHeaders(constructObject);
    const updateLiveStreamResponse = await this.fetch.fetchData(
      url,
      updateLiveStreamHeader
    );

    return updateLiveStreamResponse;
  }

  //  Deletes an existing simulcast target from a live stream.
  async deleteLiveStreamSimulcast(
    props: SimulcastProps,
    requestObj: RequestObject
  ) {
    const path = `${this.livePath}/${props?.streamId ?? ""}/simulcast/${props?.simulcastId}`;
    const url = this.fetch.constructUrl(requestObj, path);
    const constructObject: RequestObject = {
      ...requestObj,
      method: "DELETE",
    };
    const deleteSimulcastHeader = this.fetch.constructHeaders(constructObject);
    const deleteSimulcastResponse = await this.fetch.fetchData(
      url,
      deleteSimulcastHeader
    );

    return deleteSimulcastResponse;
  }
}

export default LiveStream;
