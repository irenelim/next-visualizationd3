import { ChangeEvent, Dispatch, SetStateAction } from "react";
import styles from "./Select.module.css";

interface Option {
  value: string;
  label: string;
}

interface Props {
  options: Option[];
  id: string;
  label: string;
  selectedValue: string;
  onSelectedValueChange: Dispatch<SetStateAction<string>>;
}

function NativeSelect({ options, id, label, selectedValue, onSelectedValueChange }: Props) {
  return (
    <div className="flex space-x-3">
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <select
        className={styles.nativeSelect}
        id={id}
        defaultValue={selectedValue}
        onChange={(event: ChangeEvent<HTMLSelectElement>) => onSelectedValueChange(event.target.value)}
      >
        {/* <option value="">--Please choose an option--</option> */}
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default NativeSelect;
