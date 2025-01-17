import {createContext, ReactNode, useEffect, useState} from "react";
import supabase from "../supabaseClient.ts";
import Career from "../models/Career.ts";
import Cookies from "js-cookie";
import {User} from "../models/User.ts";
import ApiData from "../models/ApiData.ts";

interface AppContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    careers: Career[];
    faculties: ApiData[];
}

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<
    AppContextType | undefined
>(undefined);

function AppProvider(
    { children } : { children: ReactNode }
) {
    const [user, setUser] = useState<User|null>(null);
    const [careers, setCareers] = useState<Career[]>([]);
    const [faculties, setFaculties] = useState<ApiData[]>([]);

    const getAllCareers = async () => {
        try {
            const { data, error } = await supabase
                .from('careers')
                .select('*');
            if (error) {
                console.error('Error fetching careers:', error);
                return [];
            }
            const formattedData = data as Career[];
            localStorage.setItem('careers', JSON.stringify(formattedData));
            return formattedData;
        } catch (err) {
            console.error('Unexpected error:', err);
            return [];
        }
    };

    const getAllFaculties = async () => {
        try {
            const { data, error } = await supabase
                .from('faculties')
                .select('*');
            if (error) {
                console.error('Error fetching faculties:', error);
                return [];
            }
            const formattedData = data as ApiData[]
            console.log(formattedData);
            localStorage.setItem('faculties', JSON.stringify(formattedData));
            return formattedData;
        } catch (err) {
            console.error('Unexpected error:', err);
            return [];
        }
    }

    useEffect(() => {
        const storedCareers = localStorage.getItem('careers');
        if (storedCareers) {
            setCareers(JSON.parse(storedCareers));
        } else {
            getAllCareers()
                .then(setCareers);
        }
    }, []);

    useEffect(() => {
        const storedFaculties = localStorage.getItem('faculties');
        if (storedFaculties) {
            setFaculties(JSON.parse(storedFaculties));
        } else {
            getAllFaculties()
                .then(setFaculties);
        }
    }, []);

    useEffect(() => {
        const fetchUserFromCookie = () => {
            const userCookie = Cookies.get('user'); // Leer la cookie "user"
            if (userCookie) {
                try {
                    const parsedUser = JSON.parse(userCookie); // Parsear el JSON de la cookie
                    setUser(parsedUser); // Guardar el usuario en el estado
                } catch (err) {
                    console.error("Error parsing user cookie:", err);
                }
            }
        };
        if (!user) {
            fetchUserFromCookie();
        }
    }, [user]);

    return(
        <AppContext.Provider value={{
            careers,
            faculties,
            user,
            setUser,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;