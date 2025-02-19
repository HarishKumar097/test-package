import type {
  HeaderOptions,
  FetchResponse,
  ConfigErrorResponse,
  RequestObject,
} from "../../types";

class Fetcher {
  // Fetches data from the specified URL using the provided headers.
  async fetchData(url: string, header: HeaderOptions): Promise<FetchResponse> {
    if (!url || !header) {
      throw new Error("Invalid arguments: URL and header are required.");
    }

    try {
      const response: Response = await fetch(url, header);

      // If the response is successful, parse and return the JSON response.
      if (response.ok) {
        const successResponse = await response.json();

        // @ts-ignore
        return successResponse;
      }

      // Handle specific HTTP error statuses
      if ([400, 401, 403, 404, 409, 422].includes(response.status)) {
        const errorResponse: any = await response.json();
        const configErrorResponse: ConfigErrorResponse = {
          success: false,
          error: {
            code: response.status,
            message:
              errorResponse?.error?.message ??
              response.statusText ??
              "An unexpected error occurred",
          },
        };

        // Add additional error field information if available.
        if (errorResponse?.error?.fields) {
          configErrorResponse.error.fields = errorResponse.error.fields;
        }

        return configErrorResponse;
      }

      return {
        success: false,
        error: {
          code: response.status ?? 500,
          message: response.statusText ?? "An internal server error occurred.",
        },
      };
    } catch (error: any) {
      throw new Error(
        `An error occurred while fetching data: ${error?.message ?? "Internal error"}`
      );
    }
  }

  // Constructs a complete URL based on the provided request object, path, and query parameters.
  constructUrl(
    requestObj?: RequestObject,
    path: string = "",
    queryParams: string = ""
  ): string {
    const protocol = requestObj?.httpAgent ?? "https";
    const domain = requestObj?.domain ?? "v1.fastpix.io";

    return `${protocol}://${domain}/${path}${queryParams}`;
  }

  // Constructs HTTP headers for a request based on the provided request object.
  constructHeaders(requestObj: RequestObject): HeaderOptions {
    if (!requestObj?.encodedAuthToken) {
      throw new Error("Authorization credentials are missing.");
    }

    const method = requestObj?.method ?? "GET";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Basic ${requestObj.encodedAuthToken}`,
    };
    const requestOptions: {
      method: string;
      headers: { "Content-Type": string; Authorization: string };
      body?: string;
    } = {
      method: method,
      headers: headers,
    };

    if (method !== "GET" && method !== "DELETE" && requestObj?.body) {
      requestOptions.body = JSON.stringify(requestObj.body);
    }

    return requestOptions;
  }
}

export default Fetcher;
