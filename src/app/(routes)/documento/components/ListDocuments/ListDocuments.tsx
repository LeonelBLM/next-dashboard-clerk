import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { DataTable } from "./data-table";
import { columns } from "./columns";


export default async function ListDocuments() {
  const { userId } = await auth();
  
  if (!userId) {
    return redirect("/")
  }

  const documento_chofer = await db.documentoChofer.findMany({
    orderBy: {
        createdAt: "desc"
    }
  })

    return (
    <DataTable columns={columns} data={documento_chofer}/>
  )
}
