/**
 *   -下载插件 json2ts
 * 	 -创建json文件 粘贴请求返回的数据
 * 	 -快捷键：Ctrl + Alt + V  生成json -> ts (数据类型)
 */


export interface ChinaTotal {
	noInfect: number;
	showLocalConfirm: number;
	noInfectH5: number;
	localConfirmH5: number;
	highRiskAreaNum: number;
	localConfirm: number;
	mRiskTime: string;
	suspect: number;
	local_acc_confirm: number;
	localWzzAdd: number;
	nowLocalWzz: number;
	mtime: string;
	confirm: number;
	nowSevere: number;
	importedCase: number;
	showlocalinfeciton: number;
	deadAdd: number;
	localConfirmAdd: number;
	mediumRiskAreaNum: number;
	nowConfirm: number;
	heal: number;
	confirmAdd: number;
	dead: number;
}

export interface ChinaAdd {
	heal: number;
	nowConfirm: number;
	nowSevere: number;
	importedCase: number;
	noInfectH5: number;
	confirm: number;
	dead: number;
	suspect: number;
	noInfect: number;
	localConfirm: number;
	localConfirmH5: number;
}

export interface ShowAddSwitch {
	all: boolean;
	dead: boolean;
	nowConfirm: boolean;
	nowSevere: boolean;
	localinfeciton: boolean;
	confirm: boolean;
	suspect: boolean;
	heal: boolean;
	importedCase: boolean;
	noInfect: boolean;
	localConfirm: boolean;
}

export interface Today {
	confirm: number;
	confirmCuts: number;
	isUpdated: boolean;
	tip: string;
	wzz_add: number;
	local_confirm_add: number;
	abroad_confirm_add: number;
	dead_add: number;
}

export interface Total {
	nowConfirm: number;
	showHeal: boolean;
	provinceLocalConfirm: number;
	highRiskAreaNum: number;
	continueDayZeroConfirm: number;
	adcode: string;
	heal: number;
	continueDayZeroConfirmAdd: number;
	dead: number;
	wzz: number;
	confirm: number;
	showRate: boolean;
	mediumRiskAreaNum: number;
	continueDayZeroLocalConfirmAdd: number;
	mtime: string;
}

export interface Today {
	isUpdated: boolean;
	wzz_add: number;
	local_confirm_add: number;
	confirm: number;
	confirmCuts: number;
}

export interface Total {
	provinceLocalConfirm: number;
	showRate: boolean;
	confirm: number;
	wzz: number;
	nowConfirm: number;
	highRiskAreaNum: number;
	continueDayZeroLocalConfirmAdd: number;
	continueDayZeroLocalConfirm: number;
	mtime: string;
	mediumRiskAreaNum: number;
	heal: number;
	showHeal: boolean;
	adcode: string;
	dead: number;
}

export interface Children {
	name: string;
	adcode: string;
	date: string;
	today: Today;
	total: Total;
}

export interface Children {
	today: Today;
	total: Total;
	children: Children[];
	name: string;
	adcode: string;
	date: string;
}

export interface Today {
	confirm: number;
	isUpdated: boolean;
}

export interface Total {
	provinceLocalConfirm: number;
	continueDayZeroLocalConfirm: number;
	mtime: string;
	nowConfirm: number;
	heal: number;
	wzz: number;
	mediumRiskAreaNum: number;
	adcode: string;
	confirm: number;
	dead: number;
	showHeal: boolean;
	continueDayZeroLocalConfirmAdd: number;
	showRate: boolean;
	highRiskAreaNum: number;
}

export interface AreaTree {
	children: Children[];
	name: string;
	today: Today;
	total: Total;
}

export interface Diseaseh5Shelf {
	lastUpdateTime: string;
	chinaTotal: ChinaTotal;
	chinaAdd: ChinaAdd;
	isShowAdd: boolean;
	showAddSwitch: ShowAddSwitch;
	areaTree: AreaTree[];
}

export interface StatisGradeCityDetail {
	confirm: number;
	dead: number;
	grade: string;
	sdate: string;
	province: string;
	city: string;
	nowConfirm: number;
	confirmAdd: number;
	syear: number;
	heal: number;
	date: string;
	mtime: string;
	wzz_add: string;
}

export interface Data {
	diseaseh5Shelf: Diseaseh5Shelf;
	statisGradeCityDetail: StatisGradeCityDetail[];
}

export interface RootObject {
	ret: number;
	info: string;
	data: Data;
}