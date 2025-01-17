interface AnchorProps {
    text: string;
    linkText: string;
    onLinkClick: () => void;
}

const Anchor = (
    { text, linkText, onLinkClick }: AnchorProps
) => {
    return (
        <span className={"anchor-field"}>
            <p>{text}</p>
            <a onClick={onLinkClick}>{linkText}</a>
        </span>
    )
};

export default Anchor;