import { List } from "./List";
import { User } from "./User";

export type Board = {
	id: string;
	name: string;
	lists: List[];
	isFavorited: boolean;
	assignees: User[];
	themeColor: string;
};
