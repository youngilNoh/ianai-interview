import { modals } from "@mantine/modals";

export enum ContextModalType {
    CheckClose = "check-close",
}

export function showCheckCloseModal({ onClose }: { onClose: () => void }) {
    modals.openContextModal({
        modal: ContextModalType.CheckClose,
        title: "종료 확인",
        innerProps: { onClose },
    });
}
