"use client";

// import libs
import Image from "next/image";
import { ArrowUpDown, Filter } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuRadioItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { AdminColumnSort } from "@/components";
import ActionCell from "./action-cell";

// import data
import { COLUMN_NAMES, SORT_NAMES } from "@/data/admin";

// import utils
import { formatDateTimeStr } from "@/utils/functions/format";

interface IAdminBlog {
  _id: string;
  article_name: string;
  article_avt: string;
  article_author_name: string;
  article_published_date: string;
  article_tags: string[];
}

interface IAdminTableHandler<T> {
  table: Table<T>;
  column: Column<T, unknown>;
  row?: Row<T>;
  type: string;
}

const HeaderHandler = ({
  table,
  column,
  type,
}: IAdminTableHandler<IAdminBlog>) => {
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

  if (["name", "published-date"].includes(type))
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

const CellHandler = ({ row, type }: IAdminTableHandler<IAdminBlog>) => {
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
            href={`/admin/blogs/${row?.original._id}`}
            className="w-fit h-fit aspect-square">
            <div className="relative w-20 h-20 aspect-square">
              <Image
                className="object-cover aspect-square"
                src={row?.original.article_avt as string}
                alt={row?.original.article_name as string}
                fill
              />
            </div>
          </Link>
        );
      case "name":
        return (
          <Link
            href={`/admin/blogs/${row?.original._id}`}
            className="w-full min-w-40 h-full text-sm line-clamp-3">
            <div className="w-full h-full text-sm textHidden3 ">
              {row?.original.article_name}
            </div>
          </Link>
        );
      case "author-name":
        return (
          <div className="text-sm min-w-40 line-clamp-3">
            {row?.original.article_author_name}
          </div>
        );
      case "published-date":
        return (
          <div className="text-sm min-w-40 line-clamp-3">
            {formatDateTimeStr(row?.original.article_published_date ?? "")}
          </div>
        );
      case "tags":
        return (
          <div className="text-sm min-w-40 flex flex-row flex-wrap gap-1">
            {row?.original.article_tags.map((tag, index) => (
              <Badge key={`tag name ${index}`}>{tag}</Badge>
            ))}
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

const columns: ColumnDef<IAdminBlog>[] = [
  {
    id: "_id",
    header: (props: HeaderContext<IAdminBlog, unknown>) => (
      <HeaderHandler {...props} type="select" />
    ),
    cell: (props: CellContext<IAdminBlog, unknown>) => (
      <CellHandler {...props} type="select" />
    ),
    enableSorting: false,
    enableHiding: false,
    enableGlobalFilter: false,
  },
  {
    id: "column-img",
    accessorKey: "article_avt",
    header: (props: HeaderContext<IAdminBlog, unknown>) => (
      <HeaderHandler {...props} type="img" />
    ),
    cell: (props: CellContext<IAdminBlog, unknown>) => (
      <CellHandler {...props} type="img" />
    ),
    enableGlobalFilter: false,
  },
  {
    id: "column-name",
    accessorKey: "article_name",
    header: (props: HeaderContext<IAdminBlog, unknown>) => (
      <HeaderHandler {...props} type="name" />
    ),
    cell: (props: CellContext<IAdminBlog, unknown>) => (
      <CellHandler {...props} type="name" />
    ),
    enableGlobalFilter: true,
  },
  {
    id: "column-author-name",
    accessorKey: "article_author_name",
    header: (props: HeaderContext<IAdminBlog, unknown>) => (
      <HeaderHandler {...props} type="author-name" />
    ),
    cell: (props: CellContext<IAdminBlog, unknown>) => (
      <CellHandler {...props} type="author-name" />
    ),
    enableGlobalFilter: true,
  },
  {
    id: "column-published-date",
    accessorKey: "article_published_date",
    header: (props: HeaderContext<IAdminBlog, unknown>) => (
      <HeaderHandler {...props} type="published-date" />
    ),
    cell: (props: CellContext<IAdminBlog, unknown>) => (
      <CellHandler {...props} type="published-date" />
    ),
    enableGlobalFilter: true,
    sortingFn: "datetime",
  },
  {
    id: "column-tags",
    accessorKey: "article_tags",
    header: (props: HeaderContext<IAdminBlog, unknown>) => (
      <HeaderHandler {...props} type="tags" />
    ),
    cell: (props: CellContext<IAdminBlog, unknown>) => (
      <CellHandler {...props} type="tags" />
    ),
    enableGlobalFilter: true,
  },
  {
    id: "actions",
    cell: (props: CellContext<IAdminBlog, unknown>) => (
      <CellHandler {...props} type="action" />
    ),
    enableHiding: false,
    enableGlobalFilter: false,
  },
];

export default columns;
