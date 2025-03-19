const HOSTED_SDK_URL = 'https://api-v2.pendle.finance/core/';
export const LIMIT_ORDER_URL = 'https://api-v2.pendle.finance/limit-order/'

type MethodReturnType<Data> = {
    tx: {
        data: string;
        to: string;
        value: string;
    };
    data: Data;
};

export async function callSDK<Data>(path: string, params: Record<string, any> = {}) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        queryParams.append(key, String(value));
    });

    const url = `${HOSTED_SDK_URL}${path}${Object.keys(params).length > 0 ? `?${queryParams.toString()}` : ''}`;
    
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
    }
    
    return data as MethodReturnType<Data>;
}