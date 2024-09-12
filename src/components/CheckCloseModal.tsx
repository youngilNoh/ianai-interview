import { Button, Group, Stack, Text } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";

const CheckCloseModal = ({
    context,
    id,
    innerProps,
}: ContextModalProps<{ onClose: () => void }>) => (
    <>
        <Stack>
            <Text ta="center">저장하지 않은 값이 있어요.</Text>
            <Group justify="end">
                <Button variant="default" onClick={() => context.closeModal(id)}>
                    머무르기
                </Button>
                <Button
                    onClick={() => {
                        context.closeModal(id);
                        innerProps.onClose();
                    }}
                >
                    그래도 닫기
                </Button>
            </Group>
        </Stack>
    </>
);

export default CheckCloseModal;
