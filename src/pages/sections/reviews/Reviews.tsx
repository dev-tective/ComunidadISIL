import './Reviews.css'
import {useAppContext} from "../../../context/hooks/useAppContext.ts";
import useApiReviews from "./hooks/useApiReviews.ts";
import useCascade from "../../../components/hooks/useCascade.ts";
import useForm from "../../../components/hooks/useForm.ts";
import InputField from "../../../components/form/InputField.tsx";
import {useEffect, useState} from "react";
import ApiData, {ReviewData} from "../../../models/ApiData.ts";
import CareerFilter from "./components/CareerFilter.tsx";
import ReviewCard from "./components/ReviewCard.tsx";
import SelectField from "../../../components/form/SelectField.tsx";
import ArrowUp from "../../../components/navigators/ArrowUp.tsx";
import {Icon} from "@iconify/react";

const Reviews = () => {
    const { careers } = useAppContext();
    const { courses, teachers } = useApiReviews();
    const { ref, amountToDisplay } = useCascade(12);
    const { form, onInputChange } = useForm({
        search: '',
        filterSelected: '',
    })
    const { search, filterSelected } = form;
    const [filters, setFilters] = useState<ApiData[]>([])
    const [reviewSwitch, setReviewSwitch] = useState<boolean>(false);

    const reviews: ReviewData[] = reviewSwitch ? teachers : courses;
    const optionsFilter: ApiData[] = reviewSwitch? courses : careers;
    // 🔥 Aplicar el filtro de carreras y búsqueda al mismo tiempo
    const reviewsShow: ReviewData[] = reviews.filter((review) => {
        const normalizedSearch = removeAccents(search.toLowerCase().trim());
        const normalizedCourseName = removeAccents(review.name.toLowerCase());

        const matches = filters.length === 0 || filters.every((career) =>
            Array.isArray(review.match_ids) && review.match_ids.includes(career.id)
        );

        const matchesSearch = normalizedSearch === '' ||
            normalizedCourseName.includes(normalizedSearch);

        return matches && matchesSearch;
    });

    const handleDeleteFilter = (id: number) => {
        setFilters(prevState => prevState.filter(career => career.id !== id));
    };

    useEffect(() => {
        if (!optionsFilter) return;
        setFilters(prevState => {
            const newFilter: ApiData | undefined = optionsFilter
                .find((career) => career.id === Number(filterSelected));
            return newFilter && !prevState.some(filter => filter.id === newFilter.id)
                ? [...prevState, newFilter]
                : prevState;
        })
    }, [filterSelected, optionsFilter]);

    useEffect(() => {
        setFilters([])
    }, [reviewSwitch]);



    return (
        <aside className='reviews-section' id={'reviews-section'}>
            <ArrowUp direction={"reviews-section"}/>
            <div className='review-options'>
                <span className='review-switch'
                      onClick={() => setReviewSwitch(!reviewSwitch)}
                >
                    <Icon icon="icon-park-outline:switch" />
                    Ver {reviewSwitch ? "Cursos" : "Profesores"}
                </span>
                <nav>
                    <InputField name={'search'}
                                value={search}
                                onChange={onInputChange}
                                placeholder={'Buscar curso'}
                                type={'search'}
                    />
                    <div>
                        <SelectField name={'filterSelected'}
                                     title={"Filtrar por carrera"}
                                     value={filterSelected}
                                     options={optionsFilter}
                                     onChange={onInputChange}
                        />
                    </div>
                </nav>
                <div className='reviews-filter'>
                    {filters.map((filter) => (
                        <CareerFilter key={filter.id}
                                      filter={filter}
                                      onDeleteCareer={handleDeleteFilter}
                        />
                    ))}
                </div>
            </div>
            <div className='reviews-cards'>
                {reviewsShow.length > 0? reviewsShow.slice(0, amountToDisplay).map((review) => (
                        <ReviewCard key={review.id} reviewData={review}/>
                    ))
                    : <span>Sin resultados</span>}
                <div ref={ref} style={{height: "40px"}}/>
            </div>
        </aside>
    )
}

const removeAccents = (str: string | undefined | null) => {
    return str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "";
};

export default Reviews