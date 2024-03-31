"use client";

import { handleDeleteUserAction } from "@/actions";
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IStudent } from "../../../types";
import CreateStudent from "../CreateStudent";
import UpdateStudent from "../UpdateStudent";

interface IProps {
  students: IStudent[] | [];
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
}

const TableStudent = (props: IProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const { students, pagination } = props;
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<any>(null);

  useEffect(() => {
    if (students) setIsFetching(false);
  }, [students]);

  const columns: ColumnsType<IStudent> = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
    },
    {
      title: "Tuổi",
      dataIndex: "age",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
    },
    {
      title: "Điểm",
      dataIndex: "mark",
    },
    {
      title: "Thành phố",
      dataIndex: "city",
    },
    {
      title: "Actions",
      align: "center",
      render: (text, record, index) => {
        return (
          <>
            <EditTwoTone
              twoToneColor="#f57800"
              style={{ cursor: "pointer", margin: "0 20px" }}
              onClick={() => {
                setIsUpdateModalOpen(true);
                setDataUpdate(record);
              }}
            />

            <Popconfirm
              placement="leftTop"
              title={"Xác nhận xóa user"}
              description={"Bạn có chắc chắn muốn xóa user này ?"}
              onConfirm={() => handleDeleteUser(record)}
              okText="Xác nhận"
              cancelText="Hủy"
            >
              <span style={{ cursor: "pointer" }}>
                <DeleteTwoTone twoToneColor="#ff4d4f" />
              </span>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const handleDeleteUser = async (user: any) => {
    await handleDeleteUserAction({ id: user.id });
  };

  const renderHeader = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Danh sách học sinh</span>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => setIsCreateModalOpen(true)}
        >
          Thêm mới
        </Button>
      </div>
    );
  };

  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    if (pagination && pagination.current) {
      const params = new URLSearchParams(searchParams);
      params.set("page", pagination.current);
      replace(`${pathname}?${params.toString()}`);
      setIsFetching(true);
    }
  };

  return (
    <div>
      <Table
        title={renderHeader}
        loading={isFetching}
        rowKey={"id"}
        bordered
        dataSource={students}
        columns={columns}
        onChange={onChange}
        pagination={{
          ...pagination,
          showTotal: (total, range) => {
            return (
              <div>
                {" "}
                {range[0]}-{range[1]} trên {total} dữ liệu
              </div>
            );
          },
        }}
      />

      <CreateStudent
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />

      <UpdateStudent
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />
    </div>
  );
};

export default TableStudent;
