import ApiData from "./ApiData.ts";

interface Teacher extends ApiData {
    qualification: number;
    lastname: string;
    firstname: string;
}

export default Teacher;