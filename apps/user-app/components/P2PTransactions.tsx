import { Card } from "@repo/ui/card";

export const P2PTransaction = ({
  sendTransactions,
  getTransactions,
}: {
  sendTransactions: {
    time: Date;
    amount: number;
    name: string;
  }[];
  getTransactions: {
    time: Date;
    amount: number;
    name: string;
  }[];
}) => {
  if (!sendTransactions.length && !getTransactions.length) {
    return (
      <Card title="All Transactions">
        <div className="text-center pb-8 pt-8">No Recent P2P transactions</div>
      </Card>
    );
  }

  return (
    <div className="flex items-center justify evenly">
      <div className="w-[50%] mx-5 h-lvh">
        <Card title="Expenses">
          <div className="h-[70vh] overflow-scroll">
            {sendTransactions.map((t) => (
              <div className="flex justify-between pt-2 text-sm">
                <div>
                  <div className="">Sent INR</div>
                  <div className="text-slate-600">{t.time.toDateString()}</div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="text-right">- Rs {t.amount / 100}</div>
                  <div className="text-slate-600">Sent to {t.name}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="w-[50%] mx-5 h-[100lvh]">
        <Card title="Deposits">
          {!getTransactions.length ? (
            <div className="text-center pb-8 pt-8">No Deposits yet</div>
          ) : (
            <div className="h-[70vh] overflow-scroll">
              {getTransactions.map((t) => (
                <div className="flex justify-between pt-2 text-sm">
                  <div>
                    <div className="">Received INR</div>
                    <div className="text-slate-600">
                      {t.time.toDateString()}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="text-right">+ Rs {t.amount / 100}</div>
                    <div className="text-slate-600">Received from {t.name}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
