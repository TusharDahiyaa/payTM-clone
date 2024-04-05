"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import axios from "axios";

export async function createOnRampTransaction(
  provider: string,
  amount: number
) {
  // Ideally the token should come from the banking provider (hdfc/axis)
  const session = await getServerSession(authOptions);
  if (!session?.user || !session.user?.id) {
    return {
      message: "Unauthenticated request",
    };
  }
  const token = (Math.random() * 1000).toString();

  const response = await prisma.onRampTransaction.create({
    data: {
      provider,
      status: "Processing",
      startTime: new Date(),
      token: token,
      userId: Number(session?.user?.id),
      amount: amount * 100,
    },
  });

  // console.log(response);

  if (response.status === "Processing") {
    const _amount = response.amount.toString();
    try {
      const res = await axios.post("http://localhost:3003/hdfcWebhook", {
        token: response.token,
        user_identifier: response.userId,
        amount: _amount,
      });
    } catch (err) {
      console.error(
        "Error while calling Bank API for Initiating Payment.",
        err
      );
    }
  }

  return {
    message: "Done",
  };
}
