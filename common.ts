///<reference path='definitions/node.d.ts' />

export function get_option(value : any, default_value : any = null, value_format_callback : any = null) : any {
	if (value !== undefined && value !== null && value != "") {
		return value_format_callback === null
			? value
			: value_format_callback(value);
	}

	return default_value;
}

export function parse_items_count(filename : string) : number {
	return parseFloat(filename.trim().replace(/^.*knap_/, '').replace(/_\d+(\.\d+)?\.inst\.dat$/, ''));
}

export function parse_second_size(filename : string) : number {
	return parseFloat(filename.trim().replace(/^.*knap_\d+_/, '').replace(/\.inst\.dat$/, ''));
}
