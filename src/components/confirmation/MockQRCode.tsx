function hashToGrid(data: string, size: number): boolean[][] {
  const grid: boolean[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => false),
  )

  let hash = 0
  for (let i = 0; i < data.length; i++) {
    hash = (hash * 31 + data.charCodeAt(i)) >>> 0
  }

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      hash = (hash * 1103515245 + 12345) >>> 0
      grid[r][c] = (hash & 1) === 1
    }
  }

  // Fixed finder patterns (top-left, top-right, bottom-left)
  const drawFinder = (startR: number, startC: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const isBorder = r === 0 || r === 6 || c === 0 || c === 6
        const isCenter = r >= 2 && r <= 4 && c >= 2 && c <= 4
        if (startR + r < size && startC + c < size) {
          grid[startR + r][startC + c] = isBorder || isCenter
        }
      }
    }
  }

  drawFinder(0, 0)
  drawFinder(0, size - 7)
  drawFinder(size - 7, 0)

  return grid
}

interface MockQRCodeProps {
  data: string
  size?: number
}

export function MockQRCode({ data, size = 21 }: MockQRCodeProps) {
  const grid = hashToGrid(data, size)
  const cellSize = 200 / size

  return (
    <svg
      viewBox={`0 0 200 200`}
      className="h-36 w-36 shrink-0 rounded-md border border-slate-200 bg-white p-1.5"
      role="img"
      aria-label={`QR code for ${data}`}
    >
      {grid.map((row, r) =>
        row.map((filled, c) =>
          filled ? (
            <rect
              key={`${r}-${c}`}
              x={c * cellSize}
              y={r * cellSize}
              width={cellSize}
              height={cellSize}
              fill="#0f172a"
            />
          ) : null,
        ),
      )}
    </svg>
  )
}
