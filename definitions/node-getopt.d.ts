/************************************************
*                                               *
*             node-getopt v0.2.3 API            *
*                                               *
************************************************/

declare class GetOpt {
	public static HAS_ARGUMENT : boolean;
	public static NO_ARGUMENT : boolean;
	public static MULTI_SUPPORTED : boolean;
	public static SINGLE_ONLY : boolean;
	public static VERSION : string;
	constructor(options : Array[]);
	public parse(argv : Array) : GetOpt;
	public parseSystem() : GetOpt;
	public setHelp(help : any) : string;
	public getHelp() : string;
	public showHelp() : void;
	public bindHelp(help : any) : GetOpt;
	public getVersion() : string;
	public error(errorFunc : any) : GetOpt;
	public static create(options : Array[]) : GetOpt;
	public static getVersion() : string;
}
