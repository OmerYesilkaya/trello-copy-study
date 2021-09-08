import { User } from "./User";

export type Comment = {
	id: string;
	text: string;
	replies: string[];
	user: User;
	createDate: Date;
};
