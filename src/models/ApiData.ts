interface ApiData {
    id: number;
    name: string;
}

export interface ReviewData extends ApiData {
    match_ids: number[];
}

export default ApiData;