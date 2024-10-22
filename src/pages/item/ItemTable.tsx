import { Box, Button, Group, Switch, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "mantine-datatable";
import { ChangeEvent, useEffect, useState } from "react";
import { Entity } from "../../constants/entity";
import { Item } from "../../models/item";
import { ItemService } from "../../services/item";

interface ItemTableProps {
    openForm: () => void;
    onClickRow: (item: Item) => void;
}

export function ItemTable({ openForm, onClickRow }: ItemTableProps) {
    const [records, setRecords] = useState<Item[]>([]);
    const [filter, setFilter] = useState<boolean>(false);

    const { data, isFetching } = useQuery({
        queryKey: [Entity.Item],
        queryFn: ItemService.getItemList,
    });

    useEffect(() => {
        if (data) {
            const filteredData = filter ? data.filter((item: Item) => item.price > 0) : data;
            setRecords(filteredData);
        }
    }, [data, filter]);

    const onClickFilter = (event: ChangeEvent<HTMLInputElement>) =>
        setFilter(event.currentTarget.checked);


    return (
        <>
            <Group justify="space-between">
                <Title order={3}>{"아이템"}</Title>
                <Group justify="space-between">
                    <Button onClick={openForm}>
                        추가
                    </Button>
                    <Switch
                        checked={filter}
                        onChange={onClickFilter}
                        label="필터"
                    />
                </Group>
            </Group>
            <DataTable
                fetching={isFetching}
                minHeight={records.length > 0 ? undefined : 150}
                withTableBorder
                borderRadius="sm"
                withColumnBorders
                striped
                highlightOnHover
                noRecordsText="등록된 아이템이 없습니다."
                records={records}
                columns={[
                    {
                        accessor: "name",
                        title: "이름",
                        render: ({ name, price }) => (
                            <Box c={price < 0 ? 'red' : 'black'}>
                                {name}
                            </Box>
                        ),
                    },
                    {
                        accessor: "price",
                        title: "가격",
                    },
                ]}
                onRowClick={({ record }) => onClickRow(record)}
            />
        </>
    );
}
