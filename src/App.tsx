import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import CheckCloseModal from "./components/CheckCloseModal";
import router from "./routes";
import { theme } from "./theme";
import { ContextModalType } from "./utils/modals";

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <MantineProvider theme={theme}>
                <Notifications position="top-left" zIndex={1000} />
                <ModalsProvider
                    modals={{
                        [ContextModalType.CheckClose]: CheckCloseModal,
                    }}
                >
                    <RouterProvider router={router} />
                </ModalsProvider>
            </MantineProvider>
        </QueryClientProvider>
    );
}
