import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { DataTable } from "./data-table"
import { columns } from "./columns"

export default async function ListChata() {
  const { userId } = await auth();
  
  if (!userId) {
    return redirect("/")
  }

  const chatas = await db.chata.findMany({
    orderBy: {
        createdAt: "desc"
    }
  })

  return (
    <DataTable columns={columns} data={chatas}/>
  )
}