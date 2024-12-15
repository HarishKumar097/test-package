# Method: generateMediaPlaybackId()

The `generateMediaPlaybackId` method allows you to generate a playback ID for a specific media asset. You must provide the `mediaId` of the asset for which you want to generate the playback ID, and you can also configure options such as the `accessPolicy` to control the visibility of the media.

### Parameters Details:

| **Parameter**             | **Description**                                                                                                                             | **Type** | **Accepted Values**                     |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------------------------------- |
| `mediaId` (required)      | The unique identifier assigned to the media asset. This is required to specify the media for which you want to generate a playback ID.      | `String` | Any valid string (up to 255 characters) |
| `accessPolicy` (required) | Determines if access to the streamed content is kept private or available to all. This can be set to either `public` or `private` or `drm`. | `String` | `"public"`, `"private"`, `"drm"`        |

### Example Request:

```javascript
// Define the mediaId and accessPolicy dynamically
const mediaPlaybackRequest = {
  mediaId: "media-id", // Unique identifier for the media asset.
};

const playbackOptions = {
  accessPolicy: "public", // Can be 'public' or  'private' or 'drm'.
};

const playbackIdResponse = await fastpix.generateMediaPlaybackId(
  mediaPlaybackRequest, // Pass the mediaId
  playbackOptions // Pass the accessPolicy
);

console.log("Playback ID Creation Response:", playbackIdResponse);
```

---

# Method: deleteMediaPlaybackId()

The `deleteMediaPlaybackId` method allows you to delete one or more playback IDs for a media asset. You must provide both the `mediaId` and an array of `playbackId` values to delete the corresponding playback IDs.

### Parameters Details:

| **Parameter**           | **Description**                                                                                      | **Type** | **Accepted Values**                     |
| ----------------------- | ---------------------------------------------------------------------------------------------------- | -------- | --------------------------------------- |
| `mediaId` (required)    | The unique identifier assigned to the media asset. It can contain a maximum of 255 characters.       | `String` | Any valid string (up to 255 characters) |
| `playbackId` (required) | The unique identifiers for the playback IDs to be deleted.            | `Array`  | Array of valid strings (up to 255 characters each) |

### Example Request:

```javascript

const mediaId = "media-id"; // The ID of the media asset for which you want to delete the playback IDs.

const playbackId = [
  "playback-id-1"
];

// // For Multiple playbackId's
// const playbackId = [
//   "playback-id-1",
//   "playback-id-2",
//   "playback-id-3"
// ];

const deletePlaybackResponse = await fastpix.deleteMediaPlaybackId({
  mediaId: mediaId, // Pass the mediaId for which playback IDs are to be deleted
  playbackId: playbackId, // Pass the array of playbackIds to delete
});

console.log("Deleted Playback IDs:", deletePlaybackResponse);
```
