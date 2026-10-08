import type { ReportItem } from "../data";
import { StatusIcon } from "./StatusIcon";
import { TagChip } from "./TagChip";

/** Figma : Ligne conforme. */
export function OkRow({ item }: { item: ReportItem }) {
  return (
    <li className="flex items-center gap-2.5 border-t border-border/60 py-2 text-[0.8438rem]">
      <StatusIcon status="ok" size={15} />
      <span className="flex-1">{item.title}</span>
      <TagChip label={item.rgaa ?? item.tag} />
    </li>
  );
}
