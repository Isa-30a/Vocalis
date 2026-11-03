import Image from "next/image";
import vocalisMark from "@/src/assets/vocalist-logo.svg";

type VocalisMarkProps = {
  className?: string;
};

export function VocalisMark({
  className = "h-8 w-auto",
}: VocalisMarkProps) {
  return (
    <Image
      src={vocalisMark}
      alt=""
      aria-hidden="true"
      className={className}
      priority
    />
  );
}
