import type { ReactNode } from "react";
import { WrenchIcon } from "./icons";

/** Figma : Encart note. */
export function NoteBox({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-border-interactive bg-subtle p-4">
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5 text-muted-foreground" aria-hidden="true">
          <WrenchIcon size={17} />
        </span>
        <p className="text-[0.8438rem] leading-relaxed text-muted-foreground">
          {children}
        </p>
      </div>
    </div>
  );
}
