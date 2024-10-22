import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import { Item } from "../../models/item";

interface ItemDeleteModalProps {
    opened: boolean;
    close: VoidFunction;
    onDelete: VoidFunction;
    itemName: Item['name'];
}

export function ItemDeleteModal({ opened, close, onDelete, itemName }: ItemDeleteModalProps) {
    return (
        <Modal opened={opened} onClose={close} title={`${itemName} 삭제`}>

            <Stack>
                <Text>정말 아이템을 삭제하시겠습니까?</Text>
                <Group justify="end">

                    <Button mt="sm" bg="red" flex={1} onClick={onDelete}>
                        <Text>삭제</Text>
                    </Button>

                    <Button type="submit" mt="sm" flex={1} onClick={close}>
                        <Text>삭제 취소</Text>
                    </Button>
                </Group>
            </Stack>

        </Modal>
    );
}
