import { SvgProps } from '.';
export default (props: SvgProps) => {
    return (
        <svg width={props.size} height={props.size} viewBox="0 0 833 833">
            <path
                fillRule="evenodd"
                fill="none"
                stroke={props.fill}
                strokeWidth="50px"
                d="M202.256,43.279H656.12a120,120,0,0,1,120,120V671.046a120,120,0,0,1-120,120H202.256a120,120,0,0,1-120-120V163.279A120,120,0,0,1,202.256,43.279Z"
            />
            <path
                fill={props.fill}
                fillRule="evenodd"
                d="M675.785,546.627H355.209c-14.754,0-26.715-12.881-26.715-28.77s11.961-28.77,26.715-28.77H675.785c14.754,0,26.714,12.881,26.714,28.77S690.539,546.627,675.785,546.627Zm0-201.389H355.209c-14.754,0-26.715-12.881-26.715-28.77s11.961-28.77,26.715-28.77H675.785c14.754,0,26.714,12.881,26.714,28.77S690.539,345.238,675.785,345.238Zm0-115.079H355.209c-14.754,0-26.715-12.881-26.715-28.77s11.961-28.77,26.715-28.77H675.785c14.754,0,26.714,12.881,26.714,28.77S690.539,230.159,675.785,230.159ZM155.877,575.4l57.539-115.079L270.955,575.4l-57.539,115.08Zm0-316.468,57.539-115.079,57.539,115.079-57.539,115.08ZM355.209,604.166H675.785c14.754,0,26.714,12.881,26.714,28.77s-11.96,28.77-26.714,28.77H355.209c-14.754,0-26.715-12.881-26.715-28.77S340.455,604.166,355.209,604.166Z"
            />
        </svg>
    );
};