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
	return parseInt(filename.trim().replace(/^knap_/, '').replace(/\.inst\.dat$/, ''));
}
