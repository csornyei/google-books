interface InputProps {
  value: string;
  setValue: (value: string) => void;
  onClick: () => void;
}

const Input: React.FC<InputProps> = ({ value, setValue, onClick }) => {
  return (
    <div className="mx-auto flex w-full flex-col items-center px-4 md:w-1/3 md:px-0">
      <input
        type="text"
        onChange={(e) => setValue(e.target.value)}
        className="mx-4 mb-2 w-full rounded border py-2 px-4 md:mx-0"
      />
      <button
        className="w-1/2 rounded border bg-green-500 py-2 px-4 text-slate-100"
        onClick={onClick}
        disabled={value.length === 0}
      >
        Search
      </button>
    </div>
  );
};

export default Input;
