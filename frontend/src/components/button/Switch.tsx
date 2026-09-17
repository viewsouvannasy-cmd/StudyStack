interface SwitchProps {
  state: boolean;
  onChange: () => void;
}

export function Switch({ state, onChange }: SwitchProps) {
  return (
    <label className="inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        className="peer sr-only"
        checked={state}
        onChange={onChange}
      />
      <div className="peer relative h-5.5 w-10 rounded-full bg-gray-300 transition-colors duration-300 peer-checked:bg-(--color-primary) after:absolute after:top-0.5 after:left-0.5 after:h-4.5 after:w-4.5 after:rounded-full after:bg-white after:transition-all after:duration-300 after:content-[''] peer-checked:after:translate-x-4.5"></div>
    </label>
  );
}
