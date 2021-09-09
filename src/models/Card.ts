import { Comment } from "./Comment";
import { Tag } from "./Tag";
import { User } from "./User";

export type Card = {
	id: string;
	name: string;
	color: string;
	tags: Tag[];
	assignees: User[];
	description: string;
	comments: Comment[];
	isFollowed: boolean;
	parentListId: string;
};
