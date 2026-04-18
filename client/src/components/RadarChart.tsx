import React from 'react';
import { Locale, QuestionCategory } from '../types';
import { getCategoryLabel } from '../categoryLabels';

type Props = {
  locale: Locale;
  data: Record<QuestionCategory, number>;
  size?: number;
};

export function RadarChart({ locale, data, size = 420 }: Props) {
  const entries = Object.entries(data) as [QuestionCategory, number][];
  const center = size / 2;
  const radius = size * 0.32;
  const levels = 5;

  const angleStep = (Math.PI * 2) / entries.length;

  const pointFor = (index: number, value: number, max = 5) => {
    const angle = -Math.PI / 2 + index * angleStep;
    const r = (value / max) * radius;
    return {
      x: center + Math.cos(angle) * r,
      y: center + Math.sin(angle) * r
    };
  };

  const polygonPoints = entries
    .map(([, value], index) => {
      const p = pointFor(index, value);
      return `${p.x},${p.y}`;
    })
    .join(' ');

  return (
    <div style={{ display: 'grid', placeItems: 'center' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Radar chart">
        {[...Array(levels)].map((_, levelIndex) => {
          const level = (levelIndex + 1) / levels;
          const points = entries
            .map((_, index) => {
              const angle = -Math.PI / 2 + index * angleStep;
              const r = radius * level;
              const x = center + Math.cos(angle) * r;
              const y = center + Math.sin(angle) * r;
              return `${x},${y}`;
            })
            .join(' ');

          return (
            <polygon
              key={levelIndex}
              points={points}
              fill="none"
              stroke="#d8deea"
              strokeWidth="1"
            />
          );
        })}

        {entries.map((_, index) => {
          const p = pointFor(index, 5, 5);
          return (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={p.x}
              y2={p.y}
              stroke="#d8deea"
              strokeWidth="1"
            />
          );
        })}

        <polygon
          points={polygonPoints}
          fill="rgba(29, 78, 216, 0.18)"
          stroke="#1d4ed8"
          strokeWidth="2"
        />

        {entries.map(([key, value], index) => {
          const p = pointFor(index, value);
          return <circle key={key} cx={p.x} cy={p.y} r="4" fill="#1d4ed8" />;
        })}

        {entries.map(([key], index) => {
          const angle = -Math.PI / 2 + index * angleStep;
          const labelRadius = radius + 34;
          const x = center + Math.cos(angle) * labelRadius;
          const y = center + Math.sin(angle) * labelRadius;

          return (
            <text
              key={key}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="12"
              fill="#5b6472"
            >
              {getCategoryLabel(key, locale)}
            </text>
          );
        })}
      </svg>
    </div>
  );
}