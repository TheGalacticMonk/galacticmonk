import ExpandableImage from "./ExpandableImage";

const MATRIX_COLUMNS: { i: number; chars: string[] }[] = [
  { i: 6, chars: ["7", "3", "z", "9"] },
  { i: 9, chars: ["A", "1", "f"] },
  { i: 5, chars: ["0", "q", "8", "k", "2"] },
  { i: 11, chars: ["$", "5", "m", "0", "1"] },
  { i: 7, chars: ["j", "4", "7"] },
  { i: 13, chars: ["9", "s", "0", "b", "3", "x"] },
  { i: 8, chars: ["2", "y", "6"] },
  { i: 6, chars: ["#", "1", "d", "9"] },
  { i: 10, chars: ["4", "8", "p", "0", "n"] },
  { i: 5, chars: ["u", "3", "g"] },
  { i: 12, chars: ["a", "t", "7", "2", "g", "h", "0", "k"] },
  { i: 9, chars: ["6", "3", "0"] },
  { i: 6, chars: ["7", "s", "b", "q"] },
  { i: 14, chars: ["1", "e", "5", "z", "8", "0"] },
  { i: 7, chars: ["%", "4", "w"] },
  { i: 11, chars: ["3", "0", "r", "9", "1"] },
  { i: 5, chars: ["k", "6", "2"] },
  { i: 8, chars: ["9", "0", "v", "3"] },
  { i: 10, chars: ["c", "5", "1", "8"] },
  { i: 6, chars: ["0", "&", "7", "2"] },
  { i: 13, chars: ["5", "m", "9", "0", "d", "1"] },
  { i: 8, chars: ["2", "f", "0", "6"] },
];

export default function MatrixPhotoFrame({
  src,
  alt,
  className,
  frameClassName,
  mat = true,
}: {
  src: string;
  alt: string;
  className?: string;
  frameClassName?: string;
  mat?: boolean;
}) {
  const frame = (
    <div className={`matrix-frame ${frameClassName ?? ""}`}>
      <div className="matrix-frame-bg" aria-hidden="true">
        {MATRIX_COLUMNS.map((col, i) => (
          <span
            key={i}
            style={{ "--i": col.i } as React.CSSProperties}
            className="matrix-code-line"
          >
            {col.chars.map((c, j) => (
              <p key={j} className="matrix-code">
                {c}
              </p>
            ))}
          </span>
        ))}
      </div>
      <div className="matrix-frame-photo-wrap">
        <ExpandableImage
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );

  if (!mat) return frame;

  return <div className={`polaroid-frame ${className ?? ""}`}>{frame}</div>;
}
