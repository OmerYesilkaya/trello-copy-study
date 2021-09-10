import { User } from "./User";

export type Comment = {
	id: string;
	text: string;
	user: User;
	createDate: Date;
	lastEditDate: Date | null;
};
