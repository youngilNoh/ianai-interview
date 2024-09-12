import { notifications } from "@mantine/notifications";

export function showSuccessNotification(title: string, message: string) {
    notifications.show({
        title: title,
        message: message,
        color: "green",
    });
}

export function showErrorNotification(error: Error) {
    notifications.show({
        title: "오류",
        message: error.message,
        color: "red",
    });
}

export function showWarnNotification(title: string, message: string) {
    notifications.show({
        title: title,
        message: message,
        color: "yellow",
    });
}
