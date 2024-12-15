# Managing Live Streams

Live streams are uniquely identified by the `streamId`, which is generated automatically when you create a new live stream using the `initiateLiveStream` method. This `streamId` is essential for performing any operations related to live streams, such as retrieving details, updating configurations, or deleting streams.

---

# Method: getAllLiveStreams()

The `getAllLiveStreams` method allows you to fetch a list of all live streams. You can customize the query by modifying parameters such as `limit`, `offset`, and `orderBy`. If no parameters are provided, the method will use default values.

### Parameter Details:

The method accepts the following query parameters:

| **Parameter** | **Description**                                                                       | **Type** | **Default Value** | **Accepted Values**                         |
| ------------- | ------------------------------------------------------------------------------------- | -------- | ----------------- | ------------------------------------------- |
| `limit`       | Specifies the maximum number of items to display per page.                            | `Number` | `10`              | 1 to 50                                     |
| `offset`      | Determines the starting point for data retrieval in a paginated list.                 | `Number` | `1`               | Any positive integer (e.g., `1`, `5`, `10`) |
| `orderBy`     | Sorts the list of streams. The list can be arranged in ascending or descending order. | `String` | `desc`            | `"desc"`, `"asc"`                           |

### Example Request:

```javascript
// Define pagination settings for retrieving live streams
const getAllLiveStreamPagination = {
  limit: 10, // Limit the number of live streams retrieved (1 to 50)
  offset: 1, // Skip a specified number of streams for pagination
  orderBy: "asc", // Sort the results in ascending order
};

// Fetch the live streams using the defined parameters
const getAllLiveStreams = await fastpix.getAllLiveStreams(
  getAllLiveStreamPagination
);
console.log("All Live Streams:", getAllLiveStreams);
```

---

# Method: getLiveStreamById()

The `getLiveStreamById` method allows you to retrieve the details of a specific live stream by its unique `streamId`. 

### Parameter Details:

| **Parameter**         | **Description**                                                                              | **Type** | **Accepted Values**                   |
| --------------------- | -------------------------------------------------------------------------------------------- | -------- | ------------------------------------- |
| `streamId` (required) | The unique identifier assigned to the live stream. You receive this ID upon stream creation. | `String` | Any valid string (max 255 characters) |

### Example Request:

```javascript
// Define the streamId for the live stream you want to retrieve
const getLiveStreamById = await fastpix.getLiveStreamById({
  streamId: "a09f3e958c16ed00e85bfe798abd9845", // Replace with the actual stream ID
});

console.log("Live Stream Details:", getLiveStreamById);
```

---

# Method: updateLiveStream()

The `updateLiveStream` method allows you to update a live stream's `metadata` and `reconnectWindow`, using the `streamId`.

### Parameter Details:

| **Parameter**                | **Description**                                                                                                                                                   | **Type**  | **Accepted Values**                                             |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | --------------------------------------------------------------- |
| `streamId` (required)        | The unique identifier assigned to the live stream. You receive this ID upon stream creation.                                                                      | `String`  | Any valid string (max 255 characters)                           |
| `metadata`       | Optional metadata to tag the live stream with key-value pairs. You can add up to 10 key-value pairs, and each key and value can have a maximum of 255 characters. | `Object`  | Any valid key-value pair (max 255 characters per key and value) |
| `reconnectWindow` | The time (in seconds) before ending the stream in case of a disruption. This value can range from 60 to 1800 seconds.                           | `Integer` | 60 to 1800 (seconds)                                            |

### Example Request:

```javascript
// Define the fields to be updated in the live stream configuration
const updateLiveStreamRequest = {
  metadata: {
    livestream_name: "Game_streaming", // Example of a metadata entry
  },
  reconnectWindow: 100, // Set the reconnect window to 100 seconds
};

// Update the live stream with the specified streamId
const updateLiveStream = await fastpix.updateLiveStream(
  { streamId: "a09f3e958c16ed00e85bfe798abd9845" }, // Provide the stream ID for the live stream to update
  updateLiveStreamRequest
);

console.log("Updated Live Stream:", updateLiveStream);
```

---

# Method: deleteLiveStream()

The `deleteLiveStream` method allows you to delete a live stream by its unique `streamId`.

### Parameter Details:

| **Parameter**         | **Description**                                                                                       | **Type** | **Accepted Values**                   |
| --------------------- | ----------------------------------------------------------------------------------------------------- | -------- | ------------------------------------- |
| `streamId` (required) | The unique identifier assigned to the live stream. You receive this ID when creating the live stream. | `String` | Any valid string (max 255 characters) |

### Example Request:

```javascript
// Define the streamId for the live stream you wish to delete
const deleteLiveStream = await fastpix.deleteLiveStream({
  streamId: "a09f3e958c16ed00e85bfe798abd9845", // Provide the stream ID of the live stream to delete
});

console.log("Deleted Live Stream:", deleteLiveStream);
```
