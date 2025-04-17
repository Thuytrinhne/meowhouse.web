"use client";

// import libs
import Image from "next/image";
import {
  CellContext,
  Column,
  ColumnDef,
  HeaderContext,
  Row,
  Table,
} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import Link from "next/link";

// import components
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { AdminColumnSort } from "@/components";
import ActionCell from "./action-cell";
import { UserData } from "@/types/user";
import { formatDateTime } from "@/utils/functions/convert";

// import data
import { COLUMN_NAMES, SORT_NAMES } from "@/data/admin";

interface IAdminTableHandler<T> {
  table: Table<T>;
  column: Column<T, unknown>;
  row?: Row<T>;
  type: string;
}

// import data
// import { datacategory } from "@/data/data-place";

const HeaderHandler = ({
  table,
  column,
  type,
}: IAdminTableHandler<UserData>) => {
  const [sortState, setSortState] = useState<string>("none");
  const isSortedOrFiltered = sortState !== "none";

  useEffect(() => {
    if (sortState === "none") column.clearSorting();
    else if (sortState === "asc") column.toggleSorting(false);
    else if (sortState === "desc") column.toggleSorting(true);
  }, [column, sortState]);

  const filterValue = table.getColumn(column.id)?.getFilterValue();
  const setFilterValue = table.getColumn(column.id)?.setFilterValue;

  const getHeader = () => {
    switch (type) {
      case "select":
        return (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate") ||
              false
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        );
      default:
        return (COLUMN_NAMES as any)[column.id] ?? "";
    }
  };

  if (["name", "price", "rating"].includes(type))
    return (
      <AdminColumnSort
        isSortedOrFiltered={isSortedOrFiltered}
        label={getHeader() as string}
        setSortState={setSortState}
        sortState={sortState}
      />
    );
  else return getHeader();
};

const CellHandler = ({ row, type }: IAdminTableHandler<UserData>) => {
  const getCell = () => {
    switch (type) {
      case "select":
        return (
          <Checkbox
            checked={row?.getIsSelected()}
            onCheckedChange={(value) => row?.toggleSelected(!!value)}
            aria-label="Select row"
          />
        );
      case "img":
        return (
          <Link
            href={`/admin/users/${row?.original._id}`}
            className="w-fit h-fit aspect-square">
            <div className="relative w-20 h-20 aspect-square">
              <Image
                className="object-cover aspect-square"
                src={row?.original.user_avt as string}
                alt={row?.original.user_name as string}
                fill
              />
            </div>
          </Link>
        );
      case "name":
        return (
          <Link
            href={`/admin/users/${row?.original._id}`}
            className="w-full min-w-40 h-full text-sm line-clamp-3">
            <div className="w-full h-full text-sm textHidden3 ">
              {row?.original.user_name}
            </div>
          </Link>
        );
      case "createdAt":
        return (
          <div className="text-sm min-w-40 line-clamp-3">
            {formatDateTime(row?.original.createdAt)}
          </div>
        );

      case "action":
        return <ActionCell row={row} />;
      default:
        return "";
    }
  };

  return getCell();
};

const columns: ColumnDef<UserData>[] = [
  {
    id: "_id",
    header: (props: HeaderContext<UserData, unknown>) => (
      <HeaderHandler {...props} type="select" />
    ),
    cell: (props: CellContext<UserData, unknown>) => (
      <CellHandler {...props} type="select" />
    ),
    enableSorting: false,
    enableHiding: false,
    enableGlobalFilter: false,
  },
  {
    id: "column-img",
    accessorKey: "user_avt",
    header: (props: HeaderContext<UserData, unknown>) => (
      <HeaderHandler {...props} type="img" />
    ),
    cell: (props: CellContext<UserData, unknown>) => (
      <CellHandler {...props} type="img" />
    ),
    enableGlobalFilter: false,
  },
  {
    id: "column-name",
    accessorKey: "user_name",
    header: (props: HeaderContext<UserData, unknown>) => (
      <HeaderHandler {...props} type="name" />
    ),
    cell: (props: CellContext<UserData, unknown>) => (
      <CellHandler {...props} type="name" />
    ),
    enableGlobalFilter: true,
  },
  {
    id: "column-date-created",
    accessorKey: "createdAt",
    header: (props: HeaderContext<UserData, unknown>) => (
      <HeaderHandler {...props} type="createdAt" />
    ),
    cell: (props: CellContext<UserData, unknown>) => (
      <CellHandler {...props} type="createdAt" />
    ),
    enableGlobalFilter: true,
  },
  {
    id: "actions",
    cell: (props: CellContext<UserData, unknown>) => (
      <CellHandler {...props} type="action" />
    ),
    enableHiding: false,
    enableGlobalFilter: false,
  },
];

export default columns;
