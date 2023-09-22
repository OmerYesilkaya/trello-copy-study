import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger,
} from "@chakra-ui/popover";
import { Button, Text, Grid, Checkbox } from "@chakra-ui/react";

import { Card } from "models";
import { useBoardStore } from "store";

type Props = {
    card: Card;
};

export function CardTagPopover({ card }: Props) {
    const { updateCardTags, getCurrentTheme } = useBoardStore((state) => ({
        updateCardTags: state.updateCardTags,
        getCurrentTheme: state.getCurrentTheme,
    }));
    const tags = ["Red", "Green", "Blue", "Purple", "Cyan", "Pink", "Yellow", "Orange", "Teal"];
    const [activeTags, setActiveTags] = useState<string[]>(card.tags);

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (activeTags.includes(e.target.value)) {
            setActiveTags((prev) => {
                let copy = [...prev];
                let idx = prev.findIndex((x) => x === e.target.value);
                copy.splice(idx, 1);
                console.log("tags", copy);
                return copy;
            });
        } else {
            setActiveTags((prev) => [...prev, e.target.value]);
        }
    }

    return (
        <Popover>
            <PopoverTrigger>
                <Button mt="5px" size="xs">
                    <Text mr="5px">Add Badge</Text> <FaPlus size="0.8em" />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody fontSize="sm">
                    <Text>Pick the badges you want to add:</Text>
                    <Grid templateColumns="repeat(3,1fr)" my="5px">
                        {tags.map((tag, idx) => (
                            <Checkbox
                                defaultChecked={activeTags.includes(tag)}
                                value={tag}
                                key={idx}
                                onChange={handleOnChange}
                                mr="5px"
                                size="sm"
                                colorScheme={tag.toLowerCase()}
                            >
                                {tag}
                            </Checkbox>
                        ))}
                    </Grid>
                    <Button
                        colorScheme={getCurrentTheme()}
                        size="xs"
                        mt="5px"
                        onClick={() => updateCardTags(card.id, card.parentListId, activeTags)}
                    >
                        Save
                    </Button>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
}
