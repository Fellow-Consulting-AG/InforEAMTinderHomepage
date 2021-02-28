
export interface IMIResponse {
	Program: string;
	Transaction: string;
	MIRecord: IMIRecord[];
}

export interface IMIRecord {
	RowIndex: number;
	NameValue: INameValue[];
}

export interface INameValue {
	Name: string;
	Value: string;
}

export interface IListItem {
	title: string;
	description: string;
}
