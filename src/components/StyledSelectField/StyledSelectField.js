import Select from 'react-select';
import { forwardRef } from "react";

const StyledSelect = forwardRef(({ values = [],
	placeholder,
	closeMenuOnSelect = true,
	isMulti = false,
	selected = '',
	isClearable = true,
	customStyles = {},
	...rest }, ref) => <Select
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
		{...rest}
		styles={{
			menu: (provided) => ({
				...provided,
				zIndex: 2,
			}),
			...customStyles
		}}
	/>
);

export default StyledSelect

