import { Button, Group, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "mantine-datatable";
import { useEffect, useState } from "react";
import { Entity } from "../../constants/entity";
import { Item } from "../../models/item";
import { ItemService } from "../../services/item";

interface ItemTableProps {
    openForm: () => void;
    onClickRow: (item: Item) => void;
}

export function ItemTable({ openForm, onClickRow }: ItemTableProps) {
    const { data, isFetching } = useQuery({
        queryKey: [Entity.Item],
        queryFn: ItemService.getItemList,
    });

    useEffect(() => {
        if (data) {
            setRecords(data);
        }
    }, [data]);

    const [records, setRecords] = useState<Item[]>([]);

    return (
        <>
            <Group justify="space-between">
                <Title order={3}>{"아이템"}</Title>
                <Button onClick={openForm}>
                    추가
                </Button>
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
