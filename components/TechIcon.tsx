'use client'

interface TechIconProps {
  tech: string
  iconPath: string
}

export default function TechIcon({ tech, iconPath }: TechIconProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-gray-700 text-gray-200 text-sm rounded-lg border border-gray-600 hover:border-primary transition-colors">
      <img
        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconPath}`}
        alt={tech}
        className="w-5 h-5"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
      <span>{tech}</span>
    </div>
  )
}
