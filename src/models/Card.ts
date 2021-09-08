import { Comment } from "./Comment";
import { User } from "./User";

export type Card = {
	id: string;
	name: string;
	thumbnail: string;
	description: string;
	comments: Comment[];
	isFollowed: boolean;
	assignees: User[];
	parentListId: string;
};
