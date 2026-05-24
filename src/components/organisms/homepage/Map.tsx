'use client'

import { useMemo, useState } from 'react'

import People from '@/components/atoms/icon/People'

import indonesiaGeoJson from '@/assets/maps/id.json'
import provinceJson from '@/assets/maps/province.json'
import type { Bounds, GeoCollection, Geometry, Position, ProvincePathData, ProvinceSummaryMap } from '@/types/maps'

const SVG_WIDTH = 1440
const SVG_HEIGHT = 520
const SVG_PADDING = 30

const geoData = indonesiaGeoJson as unknown as GeoCollection
const provinceMap = provinceJson as ProvinceSummaryMap

const getBounds = (features: GeoCollection['features']): Bounds => {
  let minLon = Infinity
  let maxLon = -Infinity
  let minLat = Infinity
  let maxLat = -Infinity

  const pushPoint = ([lon, lat]: Position) => {
    if (lon < minLon) minLon = lon
    if (lon > maxLon) maxLon = lon
    if (lat < minLat) minLat = lat
    if (lat > maxLat) maxLat = lat
  }

  features.forEach(({ geometry }) => {
    if (geometry.type === 'Polygon') {
      geometry.coordinates.forEach((ring) => {
        ring.forEach(pushPoint)
      })
      return
    }

    geometry.coordinates.forEach((polygon) => {
      polygon.forEach((ring) => {
        ring.forEach(pushPoint)
      })
    })
  })

  return { minLon, maxLon, minLat, maxLat }
}

const mapBounds = getBounds(geoData.features)
const lonRange = mapBounds.maxLon - mapBounds.minLon || 1
const latRange = mapBounds.maxLat - mapBounds.minLat || 1
const mapScale = Math.min((SVG_WIDTH - SVG_PADDING * 2) / lonRange, (SVG_HEIGHT - SVG_PADDING * 2) / latRange)
const offsetX = (SVG_WIDTH - lonRange * mapScale) / 2
const offsetY = (SVG_HEIGHT - latRange * mapScale) / 2

const projectPoint = ([lon, lat]: Position): Position => {
  const x = (lon - mapBounds.minLon) * mapScale + offsetX
  const y = (mapBounds.maxLat - lat) * mapScale + offsetY

  return [x, y]
}

const buildRingPath = (ring: Position[]) => {
  if (!ring.length) return ''

  const [firstPoint, ...restPoints] = ring
  const startPoint = projectPoint(firstPoint)
  const start = `M ${startPoint[0].toFixed(2)} ${startPoint[1].toFixed(2)}`
  const lines = restPoints
    .map((point) => {
      const [x, y] = projectPoint(point)
      return `L ${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(' ')

  return `${start} ${lines} Z`
}

const buildPolygonPath = (rings: Position[][]) => rings.map((ring) => buildRingPath(ring)).join(' ')

const buildGeometryPath = (geometry: Geometry) => {
  if (geometry.type === 'Polygon') {
    return buildPolygonPath(geometry.coordinates)
  }

  return geometry.coordinates.map((polygon) => buildPolygonPath(polygon)).join(' ')
}

const getGeometryCenter = (geometry: Geometry): Position => {
  let minLon = Infinity
  let maxLon = -Infinity
  let minLat = Infinity
  let maxLat = -Infinity

  const pushPoint = ([lon, lat]: Position) => {
    if (lon < minLon) minLon = lon
    if (lon > maxLon) maxLon = lon
    if (lat < minLat) minLat = lat
    if (lat > maxLat) maxLat = lat
  }

  if (geometry.type === 'Polygon') {
    geometry.coordinates.forEach((ring) => {
      ring.forEach(pushPoint)
    })
  } else {
    geometry.coordinates.forEach((polygon) => {
      polygon.forEach((ring) => {
        ring.forEach(pushPoint)
      })
    })
  }

  return [(minLon + maxLon) / 2, (minLat + maxLat) / 2]
}

const provinces: ProvincePathData[] = geoData.features.map((feature) => {
  const provinceInfo = provinceMap[feature.properties.id]
  const center = getGeometryCenter(feature.geometry)
  const [centerX, centerY] = projectPoint(center)
  const totalMahasiswa = provinceInfo?.totalMahasiswa ?? 0

  return {
    id: feature.properties.id,
    province: provinceInfo?.province ?? feature.properties.name,
    totalMahasiswa,
    path: buildGeometryPath(feature.geometry),
    centerX,
    centerY,
    fillClassName: provinceInfo.fillClassName || 'fill-neutral-cs-10'
  }
})

const provinceById = provinces.reduce<Record<string, ProvincePathData>>((acc, province) => {
  acc[province.id] = province
  return acc
}, {})

const Map = () => {
  const [hoveredProvinceId, setHoveredProvinceId] = useState<string | null>(null)
  const hoveredProvince = useMemo(
    () => (hoveredProvinceId ? (provinceById[hoveredProvinceId] ?? null) : null),
    [hoveredProvinceId]
  )

  return (
    <section className="bg-yellow-cs-30 z-0 flex min-h-screen w-full flex-col items-center py-10 md:py-16">
      <div className="w-full max-w-[1440px] px-4 md:px-8">
        <h1 className="font-rubikone text-blue-cs-30 text-stroke-white text-center text-5xl md:text-7xl">
          EVASTRA Maps
        </h1>
      </div>
      <div className="relative mt-8 w-full max-w-[1440px] px-3 py-16 md:px-6">
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className="h-auto w-full"
          role="img"
          aria-label="Peta Indonesia per provinsi"
          onMouseLeave={() => setHoveredProvinceId(null)}
        >
          <g fillRule="evenodd" clipRule="evenodd">
            {provinces.map((province) => (
              <path
                key={province.id}
                d={province.path}
                className={`${province.fillClassName} stroke-neutral-cs-10 hover:fill-blue-cs-10 transition-colors duration-200`}
                strokeWidth={1}
                onMouseEnter={() => setHoveredProvinceId(province.id)}
              />
            ))}
          </g>
        </svg>
        {hoveredProvince ? (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[110%]"
            style={{
              left: `${(hoveredProvince.centerX / SVG_WIDTH) * 100}%`,
              top: `${(hoveredProvince.centerY / SVG_HEIGHT) * 100}%`
            }}
          >
            <div className="bg-neutral-cs-10 relative w-46 rounded-3xl px-6 py-3 text-center shadow-lg">
              <p className="font-semibold">{hoveredProvince.province}</p>
              <div className="mt-1 flex items-center justify-center gap-2">
                <p className="text-yellow-cs-40 font-rubikone text-2xl leading-none">
                  {hoveredProvince.totalMahasiswa}
                </p>
                <People />
              </div>
              <span className="sr-only">Total mahasiswa {hoveredProvince.totalMahasiswa}</span>
              <div className="absolute bottom-[-12px] left-1/2 h-0 w-0 -translate-x-1/2 border-t-[14px] border-r-[12px] border-l-[12px] border-t-white border-r-transparent border-l-transparent" />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default Map
