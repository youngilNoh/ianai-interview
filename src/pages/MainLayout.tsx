import { ActionIcon, AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconHome } from "@tabler/icons-react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const MainLayout = () => {
    const [opened, { toggle }] = useDisclosure();
    const navigate = useNavigate();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: "sm",
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <ActionIcon onClick={() => navigate('/')}>
                        <IconHome />
                    </ActionIcon>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <Link to="/">홈</Link>
                <Link to="/item">아이템</Link>
            </AppShell.Navbar>

            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
};

export default MainLayout;
