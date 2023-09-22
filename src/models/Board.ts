import { ListMap } from "./List";
import { User } from "./User";

export type Board = {
    id: string;
    name: string;
    lists: ListMap;
    listOrder: string[];
    isFavorited: boolean;
    assignees: User[];
    themeColor: string;
};
