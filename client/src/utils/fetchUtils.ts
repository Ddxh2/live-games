export const FetchEnum = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

export enum Endpoints {
  logOn = "/logOn",
  logOut = "/logOut",
  allUsers = "/allUsers",
  openRoom = "/openRoom",
  joinRoom = "/joinRoom",
  enterRoom = "/room",
  leaveRoom = "/leaveRoom",
  allRooms = "/allRooms",
  allGames = "/allGames",
}

export const fetchRequest = async (
  endpoint: Endpoints,
  fetchOptions: RequestInit,
  urlParams?: any
): Promise<Response> => {
  const urlParamsString: string = !!urlParams
    ? "?" +
      Object.keys(urlParams)
        .map((key) => `${key}=${urlParams[key]}`)
        .join("&")
    : "";

  return fetch(
    `http://${process.env.REACT_APP_SERVER}${endpoint}${urlParamsString}`,
    {
      ...fetchOptions,
      credentials: "include",
    }
  );
};

export const getAllUsers = async (): Promise<Response> =>
  fetchRequest(Endpoints.allUsers, { method: FetchEnum.GET });

export const logOn = async (username: string): Promise<Response> =>
  fetchRequest(Endpoints.logOn, { method: FetchEnum.POST, body: username });

export const logOut = async (): Promise<Response> =>
  fetchRequest(Endpoints.logOut, { method: FetchEnum.DELETE });

export const getAllRooms = async (): Promise<Response> =>
  fetchRequest(Endpoints.allRooms, { method: FetchEnum.GET });

export const openRoom = async (): Promise<Response> =>
  fetchRequest(Endpoints.openRoom, { method: FetchEnum.POST });

export const joinRoom = async (
  roomId: string,
  roomKey: string
): Promise<Response> =>
  fetchRequest(
    Endpoints.joinRoom,
    { method: FetchEnum.PATCH, body: roomKey },
    { roomId }
  );

// export const enterRoom = async ():Promise<Response>=>fetchRequest(Endpoints.enterRoom, {method: FetchEnum.PATCH})

export const leaveRoom = async (): Promise<Response> =>
  fetchRequest(Endpoints.leaveRoom, { method: FetchEnum.DELETE });

export const getAllGames = async (): Promise<Response> =>
  fetchRequest(Endpoints.allGames, { method: FetchEnum.GET });
