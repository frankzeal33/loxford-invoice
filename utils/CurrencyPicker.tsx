"use client";

import { useState, useMemo, useEffect } from "react";
import Select, { SingleValue, StylesConfig, components, OptionProps, SingleValueProps } from "react-select";
import { currencies } from "@/constants/data";

export const currencyOptions = currencies.map((c) => ({
  value: c.code,
  label: `${c.name} (${c.symbol})`,
  currency: c,
}));

export type CurrencyOption = typeof currencyOptions[number];

// Flag component
const Flag = ({ country }: { country: string }) => (
  <span
    className={`fi fi-${country}`}
    style={{ width: 20, height: 15, borderRadius: 2, flexShrink: 0 }}
  />
);

// Custom Option row (in dropdown list)
const CustomOption = (props: OptionProps<CurrencyOption, false>) => (
  <components.Option {...props}>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <Flag country={props.data.currency.country} />
      <span style={{ fontWeight: 500, color: "#111827" }}>{props.data.currency.code}</span>
      <span style={{ color: "#6b7280", fontSize: 13 }}>
        {props.data.currency.name}
      </span>
      <span style={{ marginLeft: "auto", color: "#9ca3af", fontSize: 13 }}>
        {props.data.currency.symbol}
      </span>
    </div>
  </components.Option>
);

// Custom selected value (what shows in the input after selection)
const CustomSingleValue = (props: SingleValueProps<CurrencyOption, false>) => (
  <components.SingleValue {...props}>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Flag country={props.data.currency.country} />
      <span style={{ fontWeight: 500 }}>{props.data.currency.code}</span>
      <span style={{ color: "#6b7280", fontSize: 13 }}>
        {props.data.currency.name} ({props.data.currency.symbol})
      </span>
    </div>
  </components.SingleValue>
);

interface CurrencyPickerProps {
  onChange: (currency: CurrencyOption | null) => void;
  defaultValue?: CurrencyOption;
  placeholder?: string;
  customStyles?: StylesConfig<CurrencyOption, false>;
  isClearable?: boolean;
}

export default function CurrencyPicker({
  onChange,
  defaultValue,
  placeholder = "Select currency",
  isClearable = true,
}: CurrencyPickerProps) {
  const [selected, setSelected] = useState<CurrencyOption | null>(defaultValue ?? null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (option: SingleValue<CurrencyOption>) => {
    setSelected(option ?? null);
    onChange(option ?? null);
  };

  const styles: StylesConfig<CurrencyOption, false> = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#fff",
      borderColor: "#d1d5db",
      color: "#111827",
      minHeight: 40,
      borderRadius: 6,
      boxShadow: "none",
      ":hover": { borderColor: "#9ca3af" },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#ffffff",
      borderRadius: 8,
      overflow: "hidden",
      zIndex: 50,
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    option: (provided) => ({
      ...provided,
      padding: "8px 12px",
      backgroundColor: "transparent",
      cursor: "pointer",
      ":hover": { backgroundColor: "#f3f4f6" },
    }),
    singleValue: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      color: "#111827",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#6b7280",
    }),
    input: (provided) => ({
      ...provided,
      color: "#111827",
    }),
  };

  const options = useMemo(() => currencyOptions, []);

  return (
    <Select
      instanceId="currency-picker" 
      options={options}
      value={selected}
      onChange={handleChange}
      placeholder={placeholder}
      isClearable={isClearable}
      styles={styles}
      components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
      menuPortalTarget={mounted ? document.body : undefined}
      menuPosition="fixed"
    />
  );
}