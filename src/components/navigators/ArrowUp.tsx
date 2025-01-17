const ArrowUp = (
    { direction } : { direction: string }
) => {
    return (
        <a className='arrow-up'
           href={`#${direction}`}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="50.48" height="120" viewBox="0 0 717 614">
                <path fill="#ffffff" d="M360 337L115 582L0 464l354-355l363 363l-112 112z"/>
            </svg>
        </a>
    );
};

export default ArrowUp;