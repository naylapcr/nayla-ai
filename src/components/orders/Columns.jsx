import { FaClock, FaTruck, FaCheckCircle, FaEllipsisV } from "react-icons/fa";

const statusIcon = {
  Processing: <FaClock className="text-amber-500" />,
  Shipped: <FaTruck className="text-indigo-500" />,
  Delivered: <FaCheckCircle className="text-emerald-500" />,
};

const statusBg = {
  Processing: "bg-amber-50",
  Shipped: "bg-indigo-50",
  Delivered: "bg-emerald-50",
};

export const columns = [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => (
      <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">
        {row.getValue("id")}
      </span>
    ),
  },
  {
    accessorKey: "user",
    header: "Customer",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className={`${statusBg[order.status]} w-10 h-10 rounded-xl flex items-center justify-center text-lg`}>
            {statusIcon[order.status]}
          </div>
          <div>
            <p className="text-sm font-black text-gray-900">{order.user}</p>
            <p className="text-xs text-gray-400">{order.item}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Ordered At",
    cell: ({ row }) => (
      <span className="text-sm text-gray-500 font-medium">{row.getValue("date")}</span>
    ),
  },
  {
    accessorKey: "total",
    header: "Total Amount",
    cell: ({ row }) => (
      <span className="text-sm font-black text-gray-900">Rp {row.getValue("total")}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-gray-100 ${
          status === "Delivered" ? "text-emerald-500" : "text-indigo-500"
        }`}>
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: () => (
      <button className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-900 hover:text-white transition-all">
        <FaEllipsisV className="text-xs" />
      </button>
    ),
  },
];