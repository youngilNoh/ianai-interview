import {
    Button,
    Group,
    LoadingOverlay,
    Modal,
    NumberInput,
    Stack,
    Text,
    TextInput
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Entity } from "../../constants/entity";
import { Item } from "../../models/item";
import { ItemService } from "../../services/item";
import { showCheckCloseModal } from "../../utils/modals";
import { showErrorNotification, showSuccessNotification } from "../../utils/notifications";

const initialValues: Partial<Item> = {
    id: undefined,
    name: "",
    price: 0
};

function nameValidate(value?: string): string | null {
    return !value || value.trim().length == 0 ? "이름을 입력해주세요." : null;
}

interface ItemFormModalProps {
    opened: boolean;
    close: () => void;
    item: Item | null;
}

export function ItemFormModal({ opened, close, item }: ItemFormModalProps) {
    const queryClient = useQueryClient();
    const form = useForm<Partial<Item>>({
        mode: 'uncontrolled',
        initialValues: initialValues,
        validate: { name: nameValidate },
    });

    const isEdit = !!item;
    const { data: detailData, isLoading } = useQuery({
        queryKey: [Entity.Item, item?.id],
        queryFn: () => ItemService.getItem(item!.id),
        enabled: isEdit,
    });

    useEffect(() => {
        const data = detailData ?? initialValues;
        form.setValues(data);
        form.resetDirty(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [detailData]);

    const createItem = useMutation({
        mutationFn: ItemService.createItem,
        onSuccess: () => {
            showSuccessNotification("생성 완료", "아이템이 추가되었습니다.");
            queryClient.invalidateQueries({ queryKey: [Entity.Item] });
            closeWithReset();
        },
        onError: (error: Error) => showErrorNotification(error),
    });

    const editItem = useMutation({
        mutationFn: ItemService.editItem,
        onSuccess: () => {
            showSuccessNotification("수정 완료", "아이템이 수정되었습니다.");
            queryClient.invalidateQueries({ queryKey: [Entity.Item] });
            closeWithReset();
        },
        onError: (error: Error) => showErrorNotification(error),
    });

    const onSubmit = (value: Partial<Item>) => {
        if (!form.isDirty()) {
            closeWithReset();
            return;
        }

        if (isEdit) editItem.mutate(value);
        else createItem.mutate(value);
    };

    const deleteItem = useMutation({
        mutationFn: ItemService.deleteItem,
        onSuccess: () => {
            showSuccessNotification("삭제 완료", "아이템이 삭제되었습니다.");
            queryClient.invalidateQueries({ queryKey: [Entity.Item] });
            closeWithReset();
        },
        onError: (error: Error) => showErrorNotification(error),
    });

    const onDelete = () => {
        deleteItem.mutate(item!.id);
    };

    const onClose = () => {
        if (form.isDirty()) {
            showCheckCloseModal({ onClose: closeWithReset });
        } else {
            closeWithReset();
        }
    };

    const closeWithReset = () => {
        close();
        form.reset();
    };

    return (
        <Modal opened={opened} onClose={onClose} title={`아이템 ${isEdit ? "수정" : "추가"}`}>
            <LoadingOverlay visible={isLoading} />
            <form onSubmit={form.onSubmit(onSubmit)}>
                <Stack>
                    <TextInput
                        required
                        label="이름"
                        placeholder="아이템 이름을 입력하세요."
                        key={form.key("name")}
                        {...form.getInputProps("name")}
                    />
                    <NumberInput
                        required
                        label="가격"
                        placeholder="가격을 입력하세요."
                        key={form.key("price")}
                        {...form.getInputProps("price")}
                    />
                    <Group justify="end">
                        {isEdit && (
                            <Button mt="sm" bg="red" flex={1} onClick={onDelete}>
                                <Text>삭제</Text>
                            </Button>
                        )}
                        <Button type="submit" mt="sm" flex={1}>
                            <Text>{isEdit ? "수정" : "저장"}</Text>
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
}
