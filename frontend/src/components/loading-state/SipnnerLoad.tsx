export function SipnnerLoad({
  color = "#fff",
  borderW = 2,
  size = 4.5,
}: {
  color?: string;
  borderW?: number;
  size?: number;
}) {
  return (
    <div
      className="animate-spin rounded-full"
      style={{
        borderColor: color,
        borderTopColor: "transparent",
        borderStyle: "solid",
        borderWidth: borderW,
        width: size * 4,
        height: size * 4,
      }}
    />
  );
}
