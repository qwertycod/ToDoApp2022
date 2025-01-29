//import { useGetToken } from "./AuthHelper";
import { useEffect, useState } from "react";

export interface IHttpResponse extends Response {
    data?: any;
    error?: IAPIError;
}

export interface IAPIError {
    code: string;
    message: string;
    details?: string;
}

let token = localStorage.getItem('token') == null ? '' : localStorage.getItem('token')
export function useAuthenticatedFetch(initialUrl?: RequestInfo, initialData?: IHttpResponse): [IHttpResponse, boolean, boolean, React.Dispatch<React.SetStateAction<string | Request>>] {
    const [url, setUrl] = useState(initialUrl);
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(initialUrl ? true : false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                setError(false);
                const response: IHttpResponse = await fetch(url, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                await parseResponse(response);
                setLoading(false);
                setData(response);
                if (!response.ok) setError(true);
            } catch {
                setLoading(false);
                setError(true);
            }

        }
        if (url && token && loading) {
            getData();
        }
    }, [url, token, loading]);

    function doGet(url: string) {
        setUrl(url);
        setLoading(true);
    }

    return [data, loading, error, doGet];
}

export function useAuthenticatedPost(initialUrl?: RequestInfo, initialRequestData, initialData?: IHttpResponse): [IHttpResponse, boolean, boolean, (url: RequestInfo, requestData) => void] {
    const [postData, setPostData] = useState({ url: initialUrl, requestData: initialRequestData });
    const [data, setData] = useState(initialData ?? null);
    const [loading, setLoading] = useState(initialUrl ? true : false);
    const [error, setError] = useState(false);

    const doPost = (url: RequestInfo, requestData: S) => {
        setPostData({ url: url, requestData: requestData });
    }

    useEffect(() => {
        async function getData() {
            try {
                setError(false);
                setLoading(true);
                const response: IHttpResponse<T> = await fetch(postData.url, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(postData.requestData)
                });
                await parseResponse(response);
                setLoading(false);
                setData(response);
                if (!response.ok) setError(true);
            } catch {
                setLoading(false);
                setError(true);
            }

        }
        if (postData.url && token) {
            getData();
        }
    }, [postData, token]);

    return [data, loading, error, doPost];
}



export async function parseResponse(response: IHttpResponse) {
    if (response.ok) {
        if (response.status == 204) {
            return;
        }
        response.data = await response.json();
    } else {
        const unhandledError: IAPIError = {
            code: 500,
            message: 'ErrorConstants.UnhandledError.Message',
        };
        try {
            const body = await response.text();
            if (body) {
                response.error = response.error || unhandledError;
                response.error.details = body;
                response.error.code =
                    response.error.code || 500;
                response.error.message =
                    response.error.message || 'ErrorConstants.UnhandledError.Message';
            } else {
                response.error = unhandledError;
            }
        } catch (e) {
            response.error = unhandledError;
        }
    }
}