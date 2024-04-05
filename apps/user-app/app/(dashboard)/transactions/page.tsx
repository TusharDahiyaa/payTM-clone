import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import { authOptions } from "../../lib/auth";
import { P2PTransaction } from "../../../components/P2PTransactions";

export default async function () {
  async function sentTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
      where: {
        fromUserId: Number(session?.user?.id),
      },
      include: {
        toUser: {
          select: {
            name: true,
          },
        },
      },
    });

    return txns.map((t) => ({
      time: t.timestamp,
      amount: t.amount,
      name: t.toUser?.name || "",
    }));
  }

  async function receivedTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
      where: {
        toUserId: Number(session?.user?.id),
      },
      include: {
        fromUser: {
          select: {
            name: true,
          },
        },
      },
    });
    return txns.map((t) => ({
      time: t.timestamp,
      amount: t.amount,
      name: t.fromUser?.name || "",
    }));
  }

  const sendTransactions = await sentTransactions();
  const getTransactions = await receivedTransactions();

  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transactions
      </div>
      <div className="mx-10">
        <P2PTransaction
          sendTransactions={sendTransactions}
          getTransactions={getTransactions}
        />
      </div>
    </div>
  );
}
