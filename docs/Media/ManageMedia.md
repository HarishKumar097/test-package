# Manage Media Methods

To manage your media assets, the **`mediaId`** is the mandatory parameter required for most methods. This `mediaId` is the unique identifier for a media asset and is generated during the media upload process.

- If you upload a media asset using **`uploadMediaFromUrl`**, the `id` of the media asset is returned as part of the response.
- If you upload a media asset from a local device using **`uploadMediaFromDevice`**, the `uploadId` is returned as part of the response.

---

# Method: getAllMediaAssets

The `getAllMediaAssets` method allows you to fetch a list of all media assets. This method accepts three optional parameters: `limit`, `offset`, and `orderBy`. If not provided, the method will use the default values for these parameters.

### **Parameters**

| **Parameter** | **Description**                                                                            | **Type** | **Default Value** | **Accepted Values**                         |
| ------------- | ------------------------------------------------------------------------------------------ | -------- | ----------------- | ------------------------------------------- |
| `limit`       | Specifies the maximum number of items to display per page.                                 | `Number` | `10`              | 1 to 50                                     |
| `offset`      | Determines the starting point for data retrieval in a paginated list.                      | `Number` | `1`               | Any positive integer (e.g., `1`, `5`, `10`) |
| `orderBy`     | Sorts the values in the list. The values can be arranged in descending or ascending order. | `String` | `desc`            | `"desc"`, `"asc"`                           |

### **Example Request with Custom Parameters:**

```javascript
const mediaQueryParams = {
  limit: 20, // Number of assets to fetch in one request (between 1 and 50)
  offset: 5, // Pagination starting position
  orderBy: "asc", // Sorting order of the assets ("asc" for ascending)
};

const mediaAssets = await fastpix.getAllMediaAssets(mediaQueryParams);
console.log("Fetched Media Assets:", mediaAssets);
```

---

# Method: getMediaAssetById

The `getMediaAssetById` method allows you to retrieve a specific media asset by its unique `mediaId`. You must provide the `mediaId` of the asset you want to fetch.

### **Parameters**

| **Parameter**        | **Description**                                                                                | **Type** | **Required** | **Accepted Values**                |
| -------------------- | ---------------------------------------------------------------------------------------------- | -------- | ------------ | ---------------------------------- |
| `mediaId` (required) | The unique identifier assigned to the media asset. It can contain a maximum of 255 characters. | `String` | Yes          | Any valid string (up to 255 chars) |

### **Example Request:**

```javascript
// Define the parameter for fetching a specific media asset by ID.
const mediaQueryParams = {
  mediaId: "media-id", // Unique identifier for the media asset to be retrieved
};

const getMediaAsset = await fastpix.getMediaAssetById(mediaQueryParams);
console.log("Retrieved media asset by ID:", getMediaAsset);
```

---

# Method: updateMediaAsset

The `updateMediaAsset` method allows you to update metadata or other properties of a specific media asset. You must provide the `mediaId` of the asset you wish to update, along with the metadata or other fields to be updated.

### **Parameters**

| **Parameter**         | **Description**                                                                                | **Type** | **Accepted Values**                |
| --------------------- | ---------------------------------------------------------------------------------------------- | -------- | ---------------------------------- |
| `mediaId` (required)  | The unique identifier assigned to the media asset. It can contain a maximum of 255 characters. | `String` | Any valid string (up to 255 chars) |
| `metadata` (required) | Metadata key-value pairs to be updated for the media asset.                                    | `Object` | Key-value pairs (max 10 entries)   |

### **Metadata Object**

| **Parameter** | **Description**                                                | **Type** | **Accepted Values**                |
| ------------- | -------------------------------------------------------------- | -------- | ---------------------------------- |
| `key`         | A key for the metadata entry (max 255 characters).             | `String` | Any string (up to 255 characters). |
| `value`       | The value for the specified metadata key (max 255 characters). | `String` | Any string (up to 255 characters). |

You can add up to 10 metadata entries to the `metadata` object. Each entry is a key-value pair. This allows you to tag your media asset for easier identification or categorization.

### **Example Request:**

```javascript
// Define the parameter for specifying the media asset to be updated.
const mediaAssetToUpdate = {
  mediaId: "media-id", // Unique identifier for the media asset to update.
};

// Define the payload with the updates to be applied to the media asset.
const updatePayload = {
  metadata: {
    key: "value", // Replace "key" and "value" with actual metadata entries.
    category: "nature", // Example of another metadata entry.
  },
};

const updateMediaAsset = await fastpix.updateMediaAsset(
  mediaAssetToUpdate,
  updatePayload
);
console.log("Updated Media Asset:", updateMediaAsset);
```

---

# Method: deleteMediaAsset

The `deleteMediaAsset` method allows you to delete a specific media asset by its unique ID. You must provide the `mediaId` of the asset to delete.

### **Parameters**

| **Parameter**        | **Description**                                                                                | **Type** | **Accepted Values**                     |
| -------------------- | ---------------------------------------------------------------------------------------------- | -------- | --------------------------------------- |
| `mediaId` (required) | The unique identifier assigned to the media asset. It can contain a maximum of 255 characters. | `String` | Any valid string (up to 255 characters) |

### **Example Request:**

```javascript
// Define the parameter for specifying the media asset to be deleted.
const mediaAssetToDelete = {
  mediaId: "media-id", // Unique identifier for the media asset to delete.
};

const deleteMediaAsset = await fastpix.deleteMediaAsset(mediaAssetToDelete);
console.log("Deleted Media Asset:", deleteMediaAsset);
```

---

# Method: getMediaAssetInfo

The `getMediaAssetInfo` method allows you to retrieve detailed information about the media inputs associated with a specific media asset. You can use this endpoint to verify the media file’s input URL, track creation status, and container format. The `mediaId` (either `uploadId` or `id`) must be provided to fetch the information.

### **Parameters**

| **Parameter**        | **Description**                                                                                | **Type** | **Accepted Values**                     |
| -------------------- | ---------------------------------------------------------------------------------------------- | -------- | --------------------------------------- |
| `mediaId` (required) | The unique identifier assigned to the media asset. It can contain a maximum of 255 characters. | `String` | Any valid string (up to 255 characters) |

### **Example Request:**

```javascript
// Define the parameter for specifying the media asset whose info is to be retrieved.
const mediaInfoRequest = {
  mediaId: "media-id", // Unique identifier for the media asset.
};

const getMediaInfo = await fastpix.getMediaAssetInfo(mediaInfoRequest);
console.log("Media Asset Info:", getMediaInfo);
```
