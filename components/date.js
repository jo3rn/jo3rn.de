import { parseISO, format } from "date-fns";
import { de, en } from "date-fns/locale";

export default function DateTimeElement({ dateString, locale }) {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString}>
      {format(date, "do LLLL yyyy", { locale: locale === "de" ? de : en })}
    </time>
  );
}
