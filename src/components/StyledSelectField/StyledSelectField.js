import Select from 'react-select';
import { forwardRef } from "react";

const StyledSelect = forwardRef(({ values = [],
	placeholder,
	closeMenuOnSelect = true,
	isMulti = false,
	selected = '',
	isClearable = true,
	customStyles = {},
	...rest }, ref) => {

	return <Select
		options={values}
		placeholder={placeholder}
		closeMenuOnSelect={closeMenuOnSelect}
		isMulti={isMulti}
		defaultValue={values[selected]}
		isClearable={isClearable}
		ref={ref}
		theme={(theme) => ({
			...theme,
			colors: {
				...theme.colors,
				primary: '#513166',
			},
		})}
		components={{}}
		{...rest}
		styles={{
			menu: (provided) => ({
				...provided,
				zIndex: 2,
			}),
			control: provided => ({
				...provided,
				height: 40
			}),
			option: base => ({
				...base,
				background: 'inherit',
				color: '#000',
				cursor: 'pointer',
				":hover": {
					background: '#EEEBF0'
				}
			}),

			...customStyles
		}}
	/>
}
);

export default StyledSelect

