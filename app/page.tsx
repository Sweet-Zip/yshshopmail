import Card from "@/components/Card";
import NavigationBar from "@/components/NavigationBar";
import SideBar from "@/components/SideBar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#15263a] min-h-screen">
      <NavigationBar />
      <div className="flex justify-start items-start w-full gap-10 px-5">
        <SideBar />
        <div className="grid grid-cols-2 gap-4 w-full">
          <Card />
          <Card />
          {/* <Card /> */}
        </div>
      </div>
    </div>
  );
}
