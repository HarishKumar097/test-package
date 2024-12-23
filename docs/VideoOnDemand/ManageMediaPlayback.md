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

The `deleteMediaPlaybackId` method allows you to delete one or more playback IDs for a media asset. This method allows you to specify both the `mediaId` and the `playbackId` you wish to delete and it supports deleting a **single playback ID** as a string or **multiple playback IDs** as an array of strings.

### Parameters Details:

| **Parameter**           | **Description**                                                                                      | **Type** | **Accepted Values**                     |
| ----------------------- | ---------------------------------------------------------------------------------------------------- | -------- | --------------------------------------- |
| `mediaId` (required)    | The unique identifier assigned to the media asset. It can contain a maximum of 255 characters.       | `String` | Any valid string (up to 255 characters) |
| `playbackId` (required) | The unique identifiers for the playback IDs to be deleted.            | `Array` or `String`  | Array of valid strings (up to 255 characters each) or string |

### Example Request:

```javascript
const mediaId = "media-id"; // The ID of the media asset for which you want to delete the playback ID.
const playbackId = "playback-id"; // For deleting a single playback ID as a string.

// Example for multiple playback IDs:
// const playbackId = ["playback-id-1", "playback-id-2"]; // Pass an array of playback IDs to delete.

// Use the deleteMediaPlaybackId method to delete the specified playback ID(s).
const deletePlaybackResponse = await fastpix.deleteMediaPlaybackId({
  mediaId: mediaId,     // Pass the mediaId for which playback ID(s) are to be deleted
  playbackId: playbackId, // Pass the playbackId(s) to delete. 
});

console.log("Playback ID Deletion Response:", deletePlaybackResponse);
```
