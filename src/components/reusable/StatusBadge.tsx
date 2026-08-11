import { Badge } from "../../ui/badge";

interface Props {
  input: string;
}

const StatusBadge = ({ input }: Props) => {
  const status = input.toLowerCase();

  const statusStyles =
    status === "delivered" || status === "completed"
      ? "bg-[#EDFDF3] text-[#45B48F] dark:bg-[#173539] dark:text-green-500"
      : status === "pending"
        ? "bg-[#FFFAEB] text-[#ED9B51] dark:bg-[#393029] dark-text-[#D56832]"
        : "bg-[#FFF2F2] text-[#E36D67] dark:bg-[#382531] dark-text-[#C23D37]";

  return <Badge className={statusStyles}>{input}</Badge>;
};

export default StatusBadge;
