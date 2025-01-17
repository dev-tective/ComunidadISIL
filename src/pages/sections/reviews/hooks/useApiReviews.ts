import {useEffect, useState} from "react";
import supabase from "../../../../supabaseClient.ts";
import {ReviewData} from "../../../../models/ApiData.ts";

interface UseApiReviews {
    courses: ReviewData[];
    teachers: ReviewData[];
}

function useApiReviews(): UseApiReviews {
    const [teachers, setTeachers] = useState<ReviewData[]>([])
    const [courses, setCourses] = useState<ReviewData[]>([])

    const getReviews = async (view: string) => {
        try {
            const { data, error } = await supabase.rpc(view);

            if (error) {
                console.error('Error al obtener los datos:', error);
                return [];
            }

            console.log('Datos obtenidos:', data);
            return data
                .sort((a: ReviewData, b: ReviewData) =>
                    a.id - b.id) as ReviewData[];
        } catch (err) {
            console.error('Error inesperado:', err);
            return []
        }
    };

    useEffect(() => {
        getReviews('get_courses_reviews').then(setCourses);
        getReviews('get_teachers_reviews').then(setTeachers);
    }, []);

    return {
        courses,
        teachers
    }
}

export default useApiReviews;