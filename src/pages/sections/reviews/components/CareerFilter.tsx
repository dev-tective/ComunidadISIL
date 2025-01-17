import ApiData from "../../../../models/ApiData.ts";

interface CareerFilterProps {
    filter: ApiData;
    onDeleteCareer: (id: number) => void;
}

const CareerFilter = (
    { filter, onDeleteCareer } : CareerFilterProps
) => {
    return (
        <span className='review-filter'
              onClick={() => onDeleteCareer(filter.id)}
        >
            {filter.name} X
        </span>
    )
};

export default CareerFilter;