import Select from 'react-select';

export default function StyledSelect({
	values = [],
	placeholder,
	closeMenuOnSelect = true,
	isMulti = false,
	selected = '',
	isClearable = true,
	...rest
}) {
	return (
		<Select
			options={values}
			placeholder={placeholder}
			closeMenuOnSelect={closeMenuOnSelect}
			isMulti={isMulti}
			defaultValue={values[selected]}
			isClearable={isClearable}
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
			}}
		/>
	);
}