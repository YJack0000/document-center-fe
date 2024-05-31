export type FetchTypeWrapper<T> = {
    "data": T[],
    "page": number,
    "limit": number,
    "total": number
  }

export type FetchAllDocumentsData = {
    "id": string,
    "title": string,
    "content": string,
    "status": string,
    "updateAt": string,
    "createAt": string,
    "owner": {
      "id": string,
      "name": string
    }
}

export type FetchUsersData = {
    "id": string,
    "email": string,
    "name": string,
    "isManager": boolean,
    "createAt": string,
}