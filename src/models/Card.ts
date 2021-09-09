import { Comment } from "./Comment";
import { User } from "./User";

export type Card = {
	id: string;
	name: string;
	color: string;
	tags: string[];
	assignees: User[];
	description: string;
	comments: Comment[];
	isFollowed: boolean;
	parentListId: string;
};
