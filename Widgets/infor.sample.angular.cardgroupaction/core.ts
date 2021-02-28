export interface ICardItem {
	isError?: boolean;
	title: string;
	description: string;
	category: Category;
}

export enum Category {
	All = "All",
	Customer = "Customer",
	Warehouse = "Warehouse"
}

export const mockData = [
	{
		isError: true,
		title: "Stock level 31-22",
		description: "Stocklevel has reached 100 items",
		category: Category.Warehouse
	},
	{
		title: "Customer returns",
		description: "Customer returns has increased with 10%",
		category: Category.Customer
	},
	{
		title: "Customer approved",
		description: "Customer Hulk Holding has been approved.",
		category: Category.Customer
	},
	{
		title: "Stock level Chair-3",
		description: "WHLO 200 has 500 items",
		category: Category.Customer
	},
	{
		title: "Planned machine maintenance",
		description: "Planned time",
		category: Category.Warehouse
	}
];
