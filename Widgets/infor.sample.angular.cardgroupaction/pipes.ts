import { Pipe, PipeTransform } from "@angular/core";
import { Category, ICardItem } from "./core";

@Pipe({ name: "filterBy" })
export class CategoryFilterPipe implements PipeTransform {
	transform(items: ICardItem[], category: Category): ICardItem[] {
		if (category === Category.All) {
			return items;
		}
		return items.filter(item => item.category === category);
	}
}
