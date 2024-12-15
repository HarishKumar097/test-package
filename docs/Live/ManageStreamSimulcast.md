# Manage Live Stream Simulcast

Simulcasting allows you to stream your live content to multiple platforms simultaneously. A suite of methods is available to manage live stream simulcasts, including creating a new simulcast, retrieving its details, updating its configuration, and deleting an existing simulcast. 

To manage simulcasts effectively, you’ll need the `streamId` (generated when you initiate a live stream) and the `simulcastId` (generated when the simulcast is created). These identifiers are crucial for linking simulcast operations to the correct live stream and simulcast.

# Method: initiateLiveStreamSimulcast()

The `initiateLiveStreamSimulcast` method allows you to create a new simulcast for an existing live stream. Provide the `streamId` of the live stream and a simulcast payload containing the URL and stream key required to start streaming.

In the response `simulcastId` must be retained for managing future operations on the simulcast, such as updating or deleting it.

### Parameter Details:

| **Parameter**          | **Description**                                                                                                                                      | **Type** | **Accepted Values**                                           |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------- |
| `url` (required)       | The RTMP URL, combined with the application name, is crucial for connecting to third-party live streaming services and transmitting the live stream. | `String` | Any valid RTMP URL (e.g., `rtmps://live.fastpix.io:443/live`) |
| `streamKey` (required) | A unique stream key that allows the user to start streaming on a third-party platform. This key is used in the RTMP stream configuration.            | `String` | Any valid stream key (max 255 characters)                     |
| `streamId` (required) | The unique identifier assigned to the live stream. This ID is generated during the creation of the live stream. | `String` | Any valid string (max 255 characters) |

### Example Request:

```javascript
// Define the simulcast payload with the URL and stream key
const simulcastPayload = {
  url: "rtmps://live.fastpix.io:443/live", // RTMP URL for the third-party platform
  streamKey:
    "46c3457fa8a579b2d4da64125a2b6e83ka09f3e958c16ed00e85bfe798abd9845", // Replace with actual stream key
};

// Initiate the simulcast for an existing live stream
const generateSimulcast = await fastpix.initiateLiveStreamSimulcast(
  {
    streamId: "a09f3e958c16ed00e85bfe798abd9845", // Replace with actual stream ID
  },
  simulcastPayload
);

console.log("Generate Simulcast:", generateSimulcast);
```

---

# Method: getLiveStreamSimulcast()

The `getLiveStreamSimulcast` method allows you to retrieve details of a specific simulcast for a live stream. To use this method, you need to provide both the `streamId` and the `simulcastId`.

### Parameter Details:

| **Parameter**            | **Description**                                                                                                  | **Type** | **Accepted Values**                   |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------- |
| `streamId` (required)    | The unique identifier assigned to the live stream. This ID is generated during the creation of the live stream.  | `String` | Any valid string (max 255 characters) |
| `simulcastId` (required) | The unique identifier assigned to the simulcast stream. FastPix generates this ID when the simulcast is created. | `String` | Any valid string (max 255 characters) |

### Example Request:

```javascript
// Define the streamId and simulcastId for the simulcast you want to retrieve
const getLiveSimulcast = await fastpix.getLiveStreamSimulcast({
  streamId: "a09f3e958c16ed00e85bfe798abd9845", // Replace with actual stream ID
  simulcastId: "7269209ff0299319b6321c9a6e7850ff", // Replace with actual simulcast ID
});

console.log("Live Stream Simulcast Details:", getLiveSimulcast);
```

---

# Method: updateLiveStreamSimulcast()

The `updateLiveStreamSimulcast` method allows you to update the configuration of a simulcast stream for a live stream. To use this method, you need to provide the `streamId`, `simulcastId`, and specify the fields to be updated, including `isEnabled` and `metadata`.

### Parameter Details:

| **Parameter**            | **Description**                                                                                                                          | **Type**  | **Accepted Values**                                             |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- | --------- | --------------------------------------------------------------- |
| `streamId` (required)    | The unique identifier assigned to the live stream. This ID is generated during the creation of the live stream.                          | `String`  | Any valid string (max 255 characters)                           |
| `simulcastId` (required) | The unique identifier assigned to the simulcast stream. FastPix generates this ID when the simulcast is created.                         | `String`  | Any valid string (max 255 characters)                           |
| `isEnabled`              | Determines if the simulcast stream is enabled or disabled. Set to `false` to disable the simulcast.                                      | `Boolean` | `true` (enabled), `false` (disabled)                            |
| `metadata`               | Arbitrary user-supplied metadata that will be included in the simulcast details. Max 255 characters per key and value, up to 10 entries. | `Object`  | Any valid key-value pair (max 255 characters per key and value) |

### Example Request:

```javascript
// Assign streamId, simulcastId, and fields to variables
const streamId = "a09f3e958c16ed00e85bfe798abd9845"; // Replace with actual stream ID
const simulcastId = "7269209ff0299319b6321c9a6e7850ff"; // Replace with actual simulcast ID

// Define the properties to be updated
const updateProperties = {
  isEnabled: false, // Disable the simulcast stream (set to true to enable)
  metadata: {
    simulcast2: "media", // Update the metadata as needed
  },
};

// Call the updateLiveStreamSimulcast method with the defined variables
const updateLiveSimulcast = await fastpix.updateLiveStreamSimulcast(
  { streamId, simulcastId },
  updateProperties
);

console.log("Updated Live Stream Simulcast:", updateLiveSimulcast);
```

---

# Method: deleteLiveStreamSimulcast()

The `deleteLiveStreamSimulcast` method allows you to delete a specific simulcast associated with a live stream. To remove a simulcast, you need to provide both the `streamId` and `simulcastId` that you want to delete.

### Parameter Details:

| **Parameter**            | **Description**                                                                                             | **Type** | **Accepted Values**                   |
| ------------------------ | ----------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------- |
| `streamId` (required)    | The unique identifier assigned to the live stream. This ID is generated when the stream is created.         | `String` | Any valid string (max 255 characters) |
| `simulcastId` (required) | The unique identifier assigned to the simulcast stream. This ID is generated when the simulcast is created. | `String` | Any valid string (max 255 characters) |

### Example Request:

```javascript
// Assign streamId and simulcastId to variables
const streamId = "a09f3e958c16ed00e85bfe798abd9845"; // Replace with actual stream ID
const simulcastId = "7269209ff0299319b6321c9a6e7850ff"; // Replace with actual simulcast ID

// Call the deleteLiveStreamSimulcast method with the defined variables
const deleteLiveSimulcast = await fastpix.deleteLiveStreamSimulcast({
  streamId,
  simulcastId,
});

console.log("Deleted Live Stream Simulcast:", deleteLiveSimulcast);
```
