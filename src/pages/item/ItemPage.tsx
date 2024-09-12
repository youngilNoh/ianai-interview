import { Container, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Item } from "../../models/item";
import { ItemFormModal } from "./ItemFormModal";
import { ItemTable } from "./ItemTable";

const ItemPage = () => {
    const [openedForm, { open: openForm, close: closeForm }] = useDisclosure(false, {
        onClose: () => setSelectedItem(null),
    });
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    const onClickRow = (item: Item) => {
        setSelectedItem(item);
        openForm();
    };

    return (
        <Container>
            <Stack>
                <ItemTable openForm={openForm} onClickRow={onClickRow} />
                <ItemFormModal opened={openedForm} close={closeForm} item={selectedItem} />
            </Stack>
        </Container>
    );
}

export default ItemPage