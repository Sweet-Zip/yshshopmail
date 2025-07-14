import Card from "@/components/Card";

export default function Home() {
  return (
    <div className="grid gap-4 w-full grid-cols-1 lg:grid-cols-2 ">
      <Card balance={"100"} usagePercent={0} title={"Account Balance"} />
      <Card balance={"1000"} usagePercent={0} title={"Total Top up Amount"} />
      {/* <Card /> */}
    </div>
  );
}
