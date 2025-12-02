import { Cell, Pie, PieChart, type PieLabelRenderProps } from 'recharts'
import { COLORS, RADIAN } from '~/constants'
import type { CategoryPieChartProps } from '~/interfaces'


export const CategoryPieChart: React.FC<CategoryPieChartProps> = ({
    isAnimationActive = true,
    data = [],
    className = '',
    style = {},
    fill = '#8884d8',
    pieColors = COLORS,
    textColor = "white",
    renderCustomLabel
}): React.ReactElement => {
    const pieData = data as unknown as Record<string, unknown>[]
    const renderCategoryLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: PieLabelRenderProps) => {
      if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
        return null
      }
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5
      const ncx = Number(cx)
      const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN)
      const ncy = Number(cy)
      const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN)

      return (
        <text x={x} y={y} fill={textColor} textAnchor={x > ncx ? 'start' : 'end'} dominantBaseline="central">
          {`${name} (${((percent ?? 1) * 100).toFixed(0)}%)`}
        </text>
      )
    }
    return (
        <PieChart 
          style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1, ...style }}
          className={className}
          responsive
        >
            <Pie
              data={pieData}
              labelLine={false}
              label={renderCustomLabel ?? renderCategoryLabel}
              fill={fill}
              dataKey="count"
              isAnimationActive={isAnimationActive}
            >
            {data.map((entry, index) => (
                <Cell 
                  key={`cell-${entry.category}`}
                  fill={pieColors[index]}
                />
            ))}
            </Pie>
        </PieChart>
    )
}