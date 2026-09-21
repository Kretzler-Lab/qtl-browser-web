import React, { useRef, useEffect } from 'react';
export default function CustomTextFilter(props: any) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { model, onModelChange } = props;
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onModelChange(value === '' ? null : value);
  };

  return (
    <div className="custom-text-filter">
      <input
        ref={inputRef}
        type="text"
        className="custom-text-filter__input"
        placeholder="Filter..."
        value={model || ''}
        onChange={handleInputChange}
      />
    </div>
  );
}
