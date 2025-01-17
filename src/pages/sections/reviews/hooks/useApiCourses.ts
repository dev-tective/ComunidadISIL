import {useEffect, useState} from "react";
import Course from "../../../../models/Course.ts";
import supabase from "../../../../supabaseClient.ts";

interface UseApiCourses {
    courses: Course[];
}

const coursesCache: Course[] = []

function useApiCourses(): UseApiCourses {
    const [courses, setCourses] = useState<Course[]>([...coursesCache])

    const getCoursesWithCareers = async () => {
        try {
            const { data, error } = await supabase.rpc('get_courses_with_careers');

            if (error) {
                console.error('Error al obtener los datos:', error);
                return [];
            }

            console.log('Datos obtenidos:', data);
            return data as Course[];
        } catch (err) {
            console.error('Error inesperado:', err);
            return []
        }
    };

    useEffect(() => {
        let isMounted = true;

        if (coursesCache.length > 0) {
            setCourses([...coursesCache]);
        } else {
            getCoursesWithCareers().then((fetchedCourses) => {
                if (isMounted) {
                    coursesCache.push(...fetchedCourses);
                    setCourses([...coursesCache]);
                }
            });
        }

        return () => {
            isMounted = false;
        };
    }, []);

    return {
        courses,
    }
}

export default useApiCourses;