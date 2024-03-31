import TableStudent from "./students/_components/TableStudent";

const HomePage = async (props: any) => {
  const limit = 10;
  const page = props?.searchParams?.page ?? 1;

  const res = await fetch(
    `https://js-post-api.herokuapp.com/api/students`,
    {
      method: "GET",
      next: { tags: ["students"] },
    }
  );
  const data = await res.json();
  return (
    <div>
      <TableStudent
        students={data ? data : []}
        pagination={{
          current: +page,
          pageSize: limit,
          total: data.length,
        }}
      />
    </div>
  );
};

export default HomePage;
