import {ReviewData} from "../../../../models/ApiData.ts";

interface ReviewCardProps {
    reviewData: ReviewData;
}

const ReviewCard = (
    { reviewData } : ReviewCardProps
) => {
    return (
        <span className='review-card'>
            <header>
                <h3>{reviewData.name}</h3>
                <hr/>
            </header>
            <div>
                <button>Ver curso</button>
            </div>
        </span>
    );
};

export default ReviewCard;