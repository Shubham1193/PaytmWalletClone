import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { Chart } from "../../../components/BalanceChart";
import LineChart from "../../../components/Chart";
import { Session } from "inspector";




// sfdlhslf






async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
      where: {
        userId: Number(session?.user?.id)
      }
    });
    return {
      amount: balance?.amount || 0,
      locked: balance?.locked || 0
    };
}

async function getsentP2PTransactions() {
    const session = await getServerSession(authOptions)
    const txns = await prisma.transactionHistory.findMany({
      where: {
        // OR : [{fromUserId: Number(session?.user?.id)}, {toUserId : Number(session?.user?.id)}]
        userId : Number(session?.user?.id)
     
      },
    })
  
    return txns.map((t) => ({
      time: t.timestamp,
    //   amount: t.amount,
      // transaction : t.fromUserId === Number(session?.user?.id) ? - t.amount / 100 : + t.amount / 100
      amount : t.amount
    }))
  }


export default async function() {
    const balance = await getBalance();
    const transfer = await getsentP2PTransactions()
    const session = await getServerSession(authOptions);
    return <div className="w-screen">
       <div className="text-4xl text-[#6a51a6] pt-8 mb-2 font-bold"> Welcome  {session?.user?.name}</div>
       <div className="text-xl  border-2   h-[70%] rounded-lg w-[70%] bg-white p-4">
        <p>Available Balance</p>
        <p>$ {balance.amount / 100}</p>         
        <Chart data={transfer}/>
       {/* <LineChart/> */}
        </div>
    </div>
}