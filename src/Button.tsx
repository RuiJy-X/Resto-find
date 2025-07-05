interface Props {
  text: string;
  onClick?: () => void;
}

export default function Button(props: Props) {
  return (
    <>
      <button
        className="btn orange-bg shadow text-white text-center py-2 px-3 rounded-3"
        type="submit"
        onClick={props.onClick}
      >
        {props.text}
      </button>
    </>
  );
}
