import moment from "moment";

export default function Date({ dateString }) {
  if (!dateString) return;

  return (
    <time dateTime={dateString}>{moment(dateString).format("DD/MM/YYYY")}</time>
  );
}
