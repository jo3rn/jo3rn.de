import { parseISO, format } from "date-fns";
import { de } from "date-fns/locale";

export default function DateTimeElement({ dateString }) {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString}>
      {format(date, "do LLLL yyyy", { locale: de })}
    </time>
  );
}
