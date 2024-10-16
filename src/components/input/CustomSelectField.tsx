import AsyncSelect from 'react-select/async'
import { Controller, useController, type Control } from 'react-hook-form'
import { ArrowDownIconSVG } from 'assets/icons'
import { type CityOption } from 'api/types'

import InputLabel from './InputLabel'

interface CustomSelectFieldProps {
  control: Control
  name: string
  placeholder: string
  label: string
  loadOptions: (inputValue: string) => Promise<CityOption[]>
  defaultValue?: CityOption
  defaultOptions?: CityOption[]
  onCityChange?: (option: CityOption) => void
  required?: boolean
}

const customStyles = {
  control: () => ({
    border: '1px solid #C6CAFF',
    borderRadius: '0.5rem',
    padding: '0.2rem 2.2rem 0.2rem 0.3rem',
    height: '40px',
    boxShadow: 'none',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    background: 'white',
  }),
  dropdownIndicator: () => ({
    display: 'none',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  clearIndicator: () => ({
    padding: '0 8px',
  }),
}

const CustomSelectField: React.FC<CustomSelectFieldProps> = ({
  control,
  name,
  placeholder,
  label,
  loadOptions,
  defaultValue,
  defaultOptions,
  onCityChange = () => {},
  required = true,
}) => {
  const {
    fieldState: { error },
  } = useController({
    control,
    name,
    rules: required ? { required: label + 'harus diisi' } : {},
  })

  return (
    <div className="relative mt-3 w-full">
      <InputLabel label={label} />
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, ref } }) => (
          <AsyncSelect
            ref={ref}
            classNames={{
              placeholder: () => 'text-sm',
              control: () => '!border-blue-gray-200',
              menu: () => 'text-sm',
              singleValue: () => 'text-sm',
            }}
            placeholder={placeholder}
            noOptionsMessage={() => 'Ketik nama kota untuk mencari'}
            loadOptions={loadOptions}
            defaultOptions={defaultOptions || true}
            value={defaultValue}
            onChange={(selectedOption) => {
              if (selectedOption !== null) {
                onChange(selectedOption.value)
                if (onCityChange) {
                  onCityChange(selectedOption)
                }
              }
            }}
            onBlur={onBlur}
            styles={customStyles}
          />
        )}
      />
      {error && (
        <p className="mt-1 self-stretch text-sm leading-5 text-red-500">
          {error.message === 'Required'
            ? label + ' harus diisi'
            : error.message}
        </p>
      )}
      <div className="pointer-events-none absolute right-3 top-[36px] group-hover:pointer-events-auto">
        <ArrowDownIconSVG />
      </div>
    </div>
  )
}

export default CustomSelectField
