# FastPix Node SDK

The **FastPix Node SDK** is a TypeScript-based Node.js library that simplifies integration with the FastPix platform. This SDK is designed for secure and efficient communication with the FastPix API, enabling easy management of media uploads, signing key management, live streaming, and simulcasting. It is intended for use with Node.js (version >= 18).

## Key Features

The **FastPix Node SDK** simplifies media and live stream management, offering the following capabilities:

### 1. Media API

- **Upload Media**:  
  Upload media files seamlessly from URLs or devices.
- **Manage Media**:  
  Perform operations such as listing, fetching, updating, and deleting media assets.
- **Playback IDs**:  
  Generate and manage playback IDs for on-demand media access.

### 2. Live API

- **Start & Manage Streams**:  
  Create, list, update, and delete live streams effortlessly.
- **Playback Access**:  
  Generate, manage, and retrieve playback IDs to control stream access.
- **Simulcasting**:  
  Stream content to multiple platforms simultaneously.

### 3. Signing Key API

- **Secure Authentication**:  
  Create, list, fetch, and delete signing keys to ensure secure API communication.

For detailed usage and examples, refer to the [FastPix API Reference](https://docs.fastpix.io/reference).

# Prerequisites:

To get started with the **FastPix Node SDK**, ensure you have the following:

- The FastPix APIs are authenticated using an **Access Token** and a **Secret Key**. You must generate these credentials to use the SDK.

- Follow the steps in the [Authentication with Access Tokens](https://docs.fastpix.io/docs/authentication-with-access-tokens) guide to obtain your credentials.

# Installation

To install the SDK, you can use npm or your favourite node package manager 😉:

```bash
npm install @fastpix/node-sdk
```

## **Importing the SDK**

Depending on your project setup, you can import the SDK using either `import` or `require`.

#### **Using `import` (ES Modules)**

If your project supports ES Modules, use the `import` syntax:

```javascript
import FastPix from "@fastpix/node-sdk";
```

#### **Using `require` (CommonJS)**

If you're using CommonJS modules, you can use `require`:

```javascript
const FastPix = require("@fastpix/node-sdk").default;
```

# Initialization

Initialize the FastPix SDK with your API credentials.

```javascript
import FastPix from "fastpix-node-sdk";

const fastpix = new FastPix({
  accessTokenId: "your-access-token-id",
  secretKey: "your-secret-key",
});
```

## Example Usage

Below is an example of configuring `FastPix Node SDK` into your project.

```javascript
import FastPix from "@fastpix/node-sdk";

// Initialize the FastPix SDK with your Access Token ID and Secret Key
const fastpix = new FastPix({
  accessTokenId: "your-access-token-id", // Replace with your Access Token ID
  secretKey: "your-secret-key", // Replace with your Secret Key
});

async function main() {
  // Create a request payload for uploading media from a URL
  const uploadUrlRequest = {
    inputs: [
      {
        type: "video",
        url: "https://static.fastpix.io/sample.mp4",
      },
    ],
    metadata: {
      video_title: "Big_Buck_Bunny",
    },
    accessPolicy: "public",
  };

  const response = await fastpix.uploadMediaFromUrl(uploadUrlRequest);
  console.log("Media Id:", response.data.id);
}

main();
```

# Usage

## 1. Media Operations

### 1.1. Media Uploads

#### Upload Media from a URL

Use the `uploadMediaFromUrl` method to upload media directly from a URL. For detailed configuration options, refer to the [Create Media from URL](https://docs.fastpix.io/reference/create-media) API documentation.

```javascript
// Define the request payload for uploading media from a URL.
const mediaFromUrlRequest = {
  inputs: [
    {
      type: "video", // Specifies the type of media being uploaded (e.g., "video").
      url: "https://static.fastpix.io/sample.mp4", // URL of the media file to be uploaded.
    },
  ],
  metadata: {
    video_title: "Big_Buck_Bunny", // Metadata to associate with the media, such as its title.
  },
  accessPolicy: "public", // Access policy for the media ("public" or "private").
};

const mediaFromUrlResponse =
  await fastpix.uploadMediaFromUrl(mediaFromUrlRequest);
console.log("Upload Response:", mediaFromUrlResponse);
```

#### Upload Media from a Local Device

Use the `uploadMediaFromDevice` method to obtain a `signedUrl` and upload media directly from a local device. For more details on configuration options, refer to the [Upload Media from Device](https://docs.fastpix.io/reference/upload-media) API documentation.

```javascript
// Define the request payload for uploading media from a device.
const mediaFromDeviceRequest = {
  corsOrigin: "*", // Specifies the allowed origin for CORS (Cross-Origin Resource Sharing). "*" allows all origins.
  pushMediaSettings: {
    accessPolicy: "private", // Sets the access policy for the uploaded media (e.g., "private" or "public").
    optimizeAudio: true, // Enables audio optimization for the uploaded media.
    maxResolution: "1080p", // Specifies the maximum resolution allowed for the uploaded media.
  },
};

const mediaFromDeviceResponse = await fastpix.uploadMediaFromDevice(
  mediaFromDeviceRequest
);
console.log("Upload Response:", mediaFromDeviceResponse);
```

### 1.2. Media Management

#### Get List of All Media

Use the `getAllMediaAssets` method to fetch a list of all media assets. You can customize the query by modifying parameters such as `limit`, `offset`, and `orderBy`. Refer to the [Get List of All Media](https://docs.fastpix.io/reference/list-media) API documentation for the accepted values.

```javascript
// Define the parameters for fetching media assets in a separate variable.
const mediaAssetRequestParams = {
  limit: 10, // Number of media assets to fetch in one request.
  offset: 1, // Starting position for the list of media assets (useful for pagination).
  orderBy: "desc", // Sort order for the media assets ("desc" for descending, "asc" for ascending).
};

const allMediaAssets = await fastpix.getAllMediaAssets(mediaAssetRequestParams);
console.log("All Media Assets:", allMediaAssets);
```

#### Get Media Asset by ID

Use the `getMediaAssetById` method to retrieve a specific media asset by its ID. Replace `mediaId` with the actual ID of the media asset you want to fetch. Refer to the [Get a media by ID](https://docs.fastpix.io/reference/get-media) API documentation for more details.

```javascript
// Define the parameter for fetching a specific media asset by ID.
const mediaAssetRequestParams = {
  mediaId: "mediaId", // Unique identifier for the media asset to be retrieved.
};

const getMediaAsset = await fastpix.getMediaAssetById(mediaAssetRequestParams);
console.log("Retrieved media asset by ID:", getMediaAsset);
```

#### Update Media Asset

Use the `updateMediaAsset` method to update metadata or other properties of a specific media asset. Replace `mediaId` with the asset's ID, and pass the fields to be updated. Refer to the [Update a media by ID](https://docs.fastpix.io/reference/updated-media) API documentation for for more details.

```javascript
// Define the parameter for specifying the media asset to be updated.
const mediaAssetToUpdate = {
  mediaId: "media-id", // Unique identifier for the media asset to update.
};

// Define the payload with the updates to be applied to the media asset.
const updatePayload = {
  metadata: { 
    key: "value", // Metadata to update; replace "key" and "value" with actual metadata keys and values.
  },
};

const updateMediaAsset = await fastpix.updateMediaAsset(mediaAssetToUpdate, updatePayload);
console.log("Updated Media Asset:", updateMediaAsset);
```

#### Delete Media Asset

Use the `deleteMediaAsset` method to delete a specific media asset by its ID. Replace `mediaId` with the ID of the asset to delete. Refer to the [Delete a Media by ID](https://docs.fastpix.io/reference/delete-media) API documentation for more information.

```javascript
// Define the parameter for specifying the media asset to be deleted.
const mediaAssetToDelete = {
  mediaId: "media-id", // Unique identifier for the media asset to delete.
};

const deleteMediaAsset = await fastpix.deleteMediaAsset(mediaAssetToDelete);
console.log("Deleted Media Asset:", deleteMediaAsset);
```

#### Get Media Asset Info

Use the `getMediaAssetInfo` method to retrieve detailed information about a specific media asset. Replace `mediaId` with the asset's ID to fetch its details. Refer to the [Get info of Media inputs](https://docs.fastpix.io/reference/retrievemediainputinfo) API documentation for more details.

```javascript
// Define the parameter for specifying the media asset whose info is to be retrieved.
const mediaInfoRequest = {
  mediaId: "media-id", // Unique identifier for the media asset.
};

const getMediaInfo = await fastpix.getMediaAssetInfo(mediaInfoRequest);
console.log("Media Asset Info:", getMediaInfo);
```

### 1.3. Manage Media Playback

#### Generate Media Playback ID

Use the `generateMediaPlaybackId` method to generate a playback ID for a specific media asset. You can pass an `mediaId` and configure options such as the `accessPolicy`. For detailed configuration options, refer to the [Generate Media Playback ID](https://docs.fastpix.io/reference/create-media-playback-id) API documentation.

```javascript
// Define the mediaId and accessPolicy dynamically
const mediaPlaybackRequest = {
  mediaId: "media-id", // Unique identifier for the media asset.
};

const playbackOptions = {
  accessPolicy: "public", // Can be 'drm', 'public', or 'private'.
};

const playbackIdResponse = await fastpix.generateMediaPlaybackId(
  mediaPlaybackRequest, // Pass the mediaId
  playbackOptions // Pass the accessPolicy
);

console.log("Playback ID Creation Response:", playbackIdResponse);
```

#### Delete Media Playback ID

Use the `deleteMediaPlaybackId` method to delete a playback ID for a specific media asset. You need to pass both the `mediaId` and the `playbackId` to delete the playback ID. For detailed configuration options, refer to the [Delete a Playback ID](https://docs.fastpix.io/reference/delete-media-playback-id) API documentation.

```javascript
// Define the mediaId and playbackId dynamically
const mediaId = "media-id"; // The ID of the media asset for which you want to delete the playback ID.
const playbackId = "playback-id"; // The playback ID that you want to delete.

const deletePlaybackResponse = await fastpix.deleteMediaPlaybackId({
  mediaId: mediaId, // Pass the mediaId for which playback ID is to be deleted
  playbackId: playbackId, // Pass the playbackId to delete
});

console.log("Playback ID Deletion Response:", deletePlaybackResponse);
```

---

## 2. Live Stream Operations

### 2.1. Start Live Stream

Use the `initiateLiveStream` method to start a live stream with specific configurations such as playback settings, media settings, and more. For detailed configuration options, refer to the [Create New Stream](https://docs.fastpix.io/reference/create-new-stream) API documentation.

```javascript
const liveStreamRequest = {
  playbackSettings: {
    accessPolicy: "public", // Defines the access level of the live stream (public or private)
  },
  inputMediaSettings: {
    maxResolution: "1080p", // Set the maximum resolution of the live stream
    reconnectWindow: 1800, // Set the duration for reconnecting the stream in seconds
    mediaPolicy: "private", // Define media policy (private or public)
    metadata: {
      liveStream: "fp_livestream", // Custom metadata for the live stream
    },
    enableDvrMode: true, // Enable DVR mode to allow viewers to rewind the live stream
  },
};

// Initiating the live stream
const generateLiveStream = await fastpix.initiateLiveStream(liveStreamRequest);
console.log("Live Stream initiated successfully:", generateLiveStream);
```

### 2.2. Live Stream Management

#### Get List of All Live Streams

Use the `getAllLiveStreams` method to fetch a list of all live streams. You can customize the query by modifying parameters such as `limit`, `offset`, and `orderBy`. For detailed configuration options, refer to the [Get All Streams](https://docs.fastpix.io/reference/get-all-streams) API documentation.

```javascript
const getAllLiveStreamPagination = {
  limit: 10,     // Limit the number of live streams retrieved.
  offset: 1,   // Skip a specified number of streams for pagination.
  orderBy: "asc", // Order the results based on the specified criteria ("asc" or "desc").
}

const getAllLiveStreams = await fastpix.getAllLiveStreams(getAllLiveStreamPagination);
console.log("All Live Streams:", getAllLiveStreams);
```

#### Get Live Stream by ID

Use the `getLiveStreamById` method to retrieve a specific live stream by its ID. Replace `streamId` with the actual ID of the stream you want to fetch. For more details, refer to the [Get Live Stream by ID](https://docs.fastpix.io/reference/get-live-stream-by-id) API documentation.

```javascript
const getLiveStreamById = await fastpix.getLiveStreamById({
  streamId: "a09f3e958c16ed00e85bfe798abd9845", // Replace with actual stream ID
});

console.log("Live Stream Details:", getLiveStreamById);
```

#### Update Live Stream

Use the `updateLiveStream` method to update a live stream's configuration. Replace `streamId` with the stream's ID and pass the fields you want to update. For more details, refer to the [Update Live Stream](https://docs.fastpix.io/reference/update-live-stream) API documentation.

```javascript
const updateLiveStreamRequest = {
  metadata: {
    livestream_name: "Game_streaming",
  },
  reconnectWindow: 100,
};

const updateLiveStream = await fastpix.updateLiveStream(
  { streamId: "a09f3e958c16ed00e85bfe798abd9845" },  // Provide the stream ID for the live stream to update
  updateLiveStreamRequest
);

console.log("Updated Live Stream:", updateLiveStream);
```

#### Delete Live Stream

Use the `deleteLiveStream` method to delete a live stream by its ID. Replace `streamId` with the actual ID of the live stream you want to delete. For more details, refer to the [Delete Live Stream](https://docs.fastpix.io/reference/delete-live-stream) API documentation.

```javascript
const deleteLiveStream = await fastpix.deleteLiveStream({
  streamId: "a09f3e958c16ed00e85bfe798abd9845",  // Provide the stream ID of the live stream to delete
});
console.log("Deleted Live Stream:", deleteLiveStream);
```

### 2.3. Manage Live Stream Playback

#### Generate Live Stream Playback ID

Use the `generateLiveStreamPlaybackId` method to generate a playback ID for a live stream. Replace `streamId` with the actual ID of the live stream and specify the desired `accessPolicy`. For more details, refer to the [Create Playback ID of Stream](https://docs.fastpix.io/reference/create-playbackid-of-stream) API documentation.

```javascript
const generateLiveStreamPlaybackId = await fastpix.generateLiveStreamPlaybackId(
  { streamId: "a09f3e958c16ed00e85bfe798abd9845" }, // Pass the stream ID for which the playback ID is to be generated
  { accessPolicy: "public" }  // This can be "public" or "private" based on your needs
);

console.log("Generated Live Stream Playback ID:", generateLiveStreamPlaybackId);
```

#### Delete Live Stream Playback ID

Use the `deleteLiveStreamPlaybackId` method to delete a specific playback ID for a live stream. You need to provide both the `streamId` of the live stream and the `playbackId` to delete. For more details, refer to the [Delete Playback ID of Stream](https://docs.fastpix.io/reference/delete-playbackid-of-stream) API documentation.

```javascript
const deleteLiveStreamPlaybackId = await fastpix.deleteLiveStreamPlaybackId({
  streamId: "a09f3e958c16ed00e85bfe798abd9845", // Replace with actual stream ID
  playbackId: "632029b4-7c53-4dcf-a4d3-1884c29e90f8", // Replace with actual playback ID
});

console.log("Deleted Live Stream Playback ID:", deleteLiveStreamPlaybackId);
```

#### Get Live Stream Playback Policy

Use the `getLiveStreamPlaybackPolicy` method to retrieve the playback policy for a specific live stream playback ID. Replace `streamId` with the stream's ID and `playbackId` with the actual playback ID to fetch the policy. For more details, refer to the [Get Live Stream Playback ID](https://docs.fastpix.io/reference/get-live-stream-playback-id) API documentation.

```javascript
const getLiveStreamPlaybackPolicy = await fastpix.getLiveStreamPlaybackPolicy({
  streamId: "1c5e8abcc2080cba74f5d0ac91c7833e", // Replace with the actual stream ID
  playbackId: "95ce872d-0b58-44f3-be72-8ed8b97ee2c9", // Replace with the actual playback ID
});

console.log("Live Stream Playback Policy:", getLiveStreamPlaybackPolicy);
```

### 2.4. Manage Live Stream Simulcast

#### Initiate Live Stream Simulcast

Use the `initiateLiveStreamSimulcast` method to create a new simulcast for a live stream. Provide the stream ID and simulcast payload with the URL and stream key. For more details, refer to the [Create Simulcast of Stream](https://docs.fastpix.io/reference/create-simulcast-of-stream) API documentation.

```javascript
const simulcastPayload = {
  url: "rtmps://live.fastpix.io:443/live",
  streamKey:
    "46c3457fa8a579b2d4da64125a2b6e83ka09f3e958c16ed00e85bfe798abd9845", // Replace with actual stream key
};

const generateSimulcast = await fastpix.initiateLiveStreamSimulcast(
  {
    streamId: "a09f3e958c16ed00e85bfe798abd9845", // Replace with actual stream ID
  },
  simulcastPayload
);

console.log("Generate Simulcast:", generateSimulcast);
```

#### Get Live Stream Simulcast

Use the `getLiveStreamSimulcast` method to retrieve details of a specific simulcast stream. Provide the `streamId` and `simulcastId` of the simulcast you want to fetch. For more details, refer to the [Get Live Stream Simulcast](https://docs.fastpix.io/reference/get-specific-simulcast-of-stream) API documentation.

```javascript
const getLiveSimulcast = await fastpix.getLiveStreamSimulcast({
  streamId: "a09f3e958c16ed00e85bfe798abd9845", // Replace with actual stream ID
  simulcastId: "7269209ff0299319b6321c9a6e7850ff", // Replace with actual simulcast ID
});

console.log("Live Stream Simulcast Details:", getLiveSimulcast);
```

#### Update Live Stream Simulcast

Use the `updateLiveStreamSimulcast` method to update the configuration of a simulcast stream. Provide the `streamId`, `simulcastId`, and the fields you want to update. For more details, refer to the [Update Live Stream Simulcast](https://docs.fastpix.io/reference/update-specific-simulcast-of-stream) API documentation.

```javascript
const updateLiveSimulcast = await fastpix.updateLiveStreamSimulcast(
  {
    streamId: "a09f3e958c16ed00e85bfe798abd9845", // Replace with actual stream ID
    simulcastId: "7269209ff0299319b6321c9a6e7850ff", // Replace with actual simulcast ID
  },
  {
    isEnabled: false, // Disable the simulcast stream (set to true to enable)
    metadata: {
      simulcast2: "media", // Update the metadata as needed
    },
  }
);

console.log("Updated Live Stream Simulcast:", updateLiveSimulcast);
```

#### Delete Live Stream Simulcast

Use the `deleteLiveStreamSimulcast` method to remove a specific simulcast from a live stream. Provide the `streamId` and `simulcastId` for the simulcast you want to delete. For more details, refer to the [Delete Live Stream Simulcast](https://docs.fastpix.io/reference/delete-simulcast-of-stream) API documentation.

```javascript
const deleteLiveSimulcast = await fastpix.deleteLiveStreamSimulcast({
  streamId: "a09f3e958c16ed00e85bfe798abd9845", // Replace with actual stream ID
  simulcastId: "7269209ff0299319b6321c9a6e7850ff", // Replace with actual simulcast ID
});

console.log("Deleted Live Stream Simulcast:", deleteLiveSimulcast);
```

## 3. Signing Key Operations

## 3. Signing Key Operations

### 3.1. Create Signing Key

Use the `generateSigningKey` method to create a new signing key. For more details, refer to the [Create Signing Key](https://docs.fastpix.io/reference/create_signing_key) API documentation.

```javascript
const createSigningKey = await fastpix.generateSigningKey();
console.log("Created Signing Key:", createSigningKey);
```

### 3.2. Get All Signing Keys

Use the `getAllSingingKeyList` method to retrieve a list of all signing keys. You can pass parameters such as `limit`, `offset`, and `orderBy` to control the number of results, pagination, and sorting order. For more details, refer to the [List Signing Keys](https://docs.fastpix.io/reference/list_signing_keys) API documentation.

```javascript
const getAllSigningkeyIds = await fastpix.getAllSingingKeyList({
  limit: 10,
  offset: 1,
  orderBy: "desc",
});
console.log("All Signing Keys:", getAllSigningkeyIds);
```

### 3.3. Get Signing Key by ID

Use the `getSigningKeyById` method to retrieve a specific signing key by its ID. Replace `signingKeyId` with the actual ID of the signing key you want to fetch. For more details, refer to the [Get Signing Key by ID](https://docs.fastpix.io/reference/get-signing_key_by_id) API documentation.

```javascript
const getSigningKeyId = await fastpix.getSigningKeyById({
  signingKeyId: "ba89848b-d8bb-41a6-bc8d-a847c8da0a91",
});
console.log("Signing Key Details:", getSigningKeyId);
```

### 3.4. Delete Signing Key

Use the `deleteSigningKey` method to delete a signing key by its ID. Replace `signingKeyId` with the actual ID of the signing key you want to delete. For more details, refer to the [Delete Signing Key](https://docs.fastpix.io/reference/delete_signing_key) API documentation.

```javascript
const deleteSigningKeyId = await fastpix.deleteSigningKey({
  signingKeyId: "ba89848b-d8bb-41a6-bc8d-a847c8da0a91",
});
console.log("Signing Key Deleted:", deleteSigningKeyId);
```

## Detailed Usage

For a complete understanding of each API's functionality, including request and response details, parameter descriptions, and additional examples, please refer to the [FastPix API Reference](https://docs.fastpix.io/reference/signingkeys-overview).

The API reference provides comprehensive documentation for all available endpoints and features, ensuring developers can integrate and utilize FastPix APIs efficiently.
