import type { RequestObject, PaginationProps, FetcherProps } from "../Types";

import Fetcher from "../Fetch";

class Signingkey {
  fetch: FetcherProps;
  signingKeyPath: string;

  constructor() {
    this.fetch = new Fetcher();
    this.signingKeyPath = "iam/signing-keys"; // Base API path for signing keys
  }

  // Creates a new signing key.
  async createSigningKey(requestObj: RequestObject) {
    const path = this.signingKeyPath;
    const url = this.fetch?.constructUrl(requestObj, path);
    const constructObject: RequestObject = {
      ...requestObj,
      method: "POST",
      body: {},
    };
    const createSigningKeyHeader = this.fetch.constructHeaders(constructObject);
    const createSigningKeyResponse = await this.fetch.fetchData(
      url,
      createSigningKeyHeader
    );

    return createSigningKeyResponse;
  }

  // Retrieves a list of signing keys with pagination options.
  async getAllSigningKeys(props?: PaginationProps, requestObj?: RequestObject) {
    const path = this.signingKeyPath;
    const queryParams = `?limit=${props?.limit || 10}&offset=${props?.offset || 1}&orderBy=${props?.orderBy || "desc"}`;
    const url = this.fetch.constructUrl(requestObj, path, queryParams);
    const constructObject: RequestObject = {
      ...requestObj,
      method: "GET",
    };
    const getAllSingingkeyHeader = this.fetch.constructHeaders(constructObject);
    const getAllSingingkeyResponse = await this.fetch.fetchData(
      url,
      getAllSingingkeyHeader
    );

    return getAllSingingkeyResponse;
  }

  //  Retrieves details of a specific signing key by its ID.
  async getSigningKey(props: { signingKeyId: string }, requestObj: any) {
    const path = `${this.signingKeyPath}/${props?.signingKeyId}`;
    const url = this.fetch.constructUrl(requestObj, path);
    const constructObject = {
      ...requestObj,
      method: "GET",
    };
    const getSingingkeyHeader = this.fetch.constructHeaders(constructObject);
    const getSingingkeyResponse = await this.fetch.fetchData(
      url,
      getSingingkeyHeader
    );

    return getSingingkeyResponse;
  }

  // Deletes a specific signing key by its ID.
  async deleteSigningKey(props: { signingKeyId: string }, requestObj: any) {
    const path = `${this.signingKeyPath}/${props?.signingKeyId}`;
    const url = this.fetch.constructUrl(requestObj, path);
    const constructObject: RequestObject = {
      ...requestObj,
      method: "DELETE",
    };
    const deleteSigningKeyHeader = this.fetch.constructHeaders(constructObject);
    const deleteSigningKeyResponse = await this.fetch.fetchData(
      url,
      deleteSigningKeyHeader
    );

    return deleteSigningKeyResponse;
  }
}

export default Signingkey;
