interface LogoProps {
  className?: string;
}

export function Logo({ className = "w-8 h-8" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Gradient for ripe mulberry - deep purple */}
        <radialGradient id="drupelet1" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#e879f9" />
          <stop offset="30%" stopColor="#c026d3" />
          <stop offset="70%" stopColor="#a21caf" />
          <stop offset="100%" stopColor="#86198f" />
        </radialGradient>

        <radialGradient id="drupelet2" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#d946ef" />
          <stop offset="30%" stopColor="#a855f7" />
          <stop offset="70%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7c3aed" />
        </radialGradient>

        <radialGradient id="drupelet3" cx="38%" cy="38%">
          <stop offset="0%" stopColor="#f0abfc" />
          <stop offset="30%" stopColor="#d946ef" />
          <stop offset="70%" stopColor="#c026d3" />
          <stop offset="100%" stopColor="#a21caf" />
        </radialGradient>

        {/* Gradient for stem */}
        <linearGradient id="stemGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#65a30d" />
          <stop offset="50%" stopColor="#4d7c0f" />
          <stop offset="100%" stopColor="#3f6212" />
        </linearGradient>

        {/* Gradient for leaf */}
        <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#84cc16" />
          <stop offset="50%" stopColor="#65a30d" />
          <stop offset="100%" stopColor="#4d7c0f" />
        </linearGradient>

        {/* Shadow */}
        <radialGradient id="shadowGradient">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Shadow beneath mulberry */}
      <ellipse cx="50" cy="85" rx="18" ry="4" fill="url(#shadowGradient)" />

      {/* Stem */}
      <path
        d="M50 15 Q52 18, 51 22 Q50 26, 50 30"
        stroke="url(#stemGradient)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Small stem detail */}
      <path
        d="M50.5 18 Q51 20, 50.8 23"
        stroke="#84cc16"
        strokeWidth="0.6"
        fill="none"
        opacity="0.5"
      />

      {/* Leaf */}
      <path
        d="M50 18 Q40 15, 35 18 Q32 20, 33 24 Q34 28, 38 30 Q42 32, 47 30 Q50 28, 50 24 Z"
        fill="url(#leafGradient)"
      />

      {/* Leaf vein */}
      <path
        d="M47 25 Q43 26, 38 26"
        stroke="#4d7c0f"
        strokeWidth="0.8"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M45 27 Q42 28, 39 28"
        stroke="#4d7c0f"
        strokeWidth="0.6"
        fill="none"
        opacity="0.4"
      />

      {/* Leaf highlight */}
      <ellipse
        cx="40"
        cy="23"
        rx="3"
        ry="2"
        fill="#a3e635"
        opacity="0.3"
      />

      {/* MULBERRY FRUIT - Elongated cluster of drupelets */}
      
      {/* Back row of drupelets (darker, for depth) */}
      <circle cx="45" cy="45" r="5.5" fill="url(#drupelet2)" opacity="0.7" />
      <circle cx="55" cy="45" r="5.5" fill="url(#drupelet2)" opacity="0.7" />
      <circle cx="45" cy="55" r="5.5" fill="url(#drupelet2)" opacity="0.7" />
      <circle cx="55" cy="55" r="5.5" fill="url(#drupelet2)" opacity="0.7" />
      <circle cx="48" cy="65" r="5.5" fill="url(#drupelet2)" opacity="0.7" />
      <circle cx="52" cy="65" r="5" fill="url(#drupelet2)" opacity="0.7" />

      {/* Top drupelets */}
      <circle cx="50" cy="32" r="5.5" fill="url(#drupelet1)" />
      <circle cx="44" cy="36" r="6" fill="url(#drupelet3)" />
      <circle cx="56" cy="36" r="6" fill="url(#drupelet1)" />

      {/* Upper middle drupelets */}
      <circle cx="50" cy="42" r="6.5" fill="url(#drupelet3)" />
      <circle cx="42" cy="44" r="6" fill="url(#drupelet1)" />
      <circle cx="58" cy="44" r="6" fill="url(#drupelet3)" />

      {/* Center drupelets */}
      <circle cx="50" cy="51" r="7" fill="url(#drupelet1)" />
      <circle cx="41" cy="52" r="6.5" fill="url(#drupelet3)" />
      <circle cx="59" cy="52" r="6.5" fill="url(#drupelet1)" />

      {/* Lower middle drupelets */}
      <circle cx="50" cy="60" r="6.5" fill="url(#drupelet3)" />
      <circle cx="43" cy="61" r="6" fill="url(#drupelet1)" />
      <circle cx="57" cy="61" r="6" fill="url(#drupelet3)" />

      {/* Bottom drupelets - narrowing */}
      <circle cx="50" cy="69" r="6" fill="url(#drupelet1)" />
      <circle cx="45" cy="71" r="5" fill="url(#drupelet3)" />
      <circle cx="55" cy="71" r="5" fill="url(#drupelet1)" />

      {/* Bottom tip */}
      <circle cx="50" cy="77" r="4.5" fill="url(#drupelet3)" />

      {/* Highlights on drupelets - adds shine and realism */}
      <circle cx="51" cy="31" r="1.8" fill="white" opacity="0.6" />
      <circle cx="45" cy="35" r="2" fill="white" opacity="0.5" />
      <circle cx="57" cy="35" r="2" fill="white" opacity="0.5" />
      <circle cx="51" cy="41" r="2.2" fill="white" opacity="0.5" />
      <circle cx="43" cy="43" r="1.8" fill="white" opacity="0.4" />
      <circle cx="59" cy="43" r="1.8" fill="white" opacity="0.4" />
      <circle cx="51" cy="50" r="2.5" fill="white" opacity="0.6" />
      <circle cx="42" cy="51" r="2" fill="white" opacity="0.5" />
      <circle cx="60" cy="51" r="2" fill="white" opacity="0.5" />
      <circle cx="51" cy="59" r="2.2" fill="white" opacity="0.5" />
      <circle cx="44" cy="60" r="1.8" fill="white" opacity="0.4" />
      <circle cx="58" cy="60" r="1.8" fill="white" opacity="0.4" />
      <circle cx="51" cy="68" r="2" fill="white" opacity="0.5" />
      <circle cx="46" cy="70" r="1.5" fill="white" opacity="0.4" />
      <circle cx="51" cy="76" r="1.5" fill="white" opacity="0.5" />

      {/* Small detail dots on drupelets for texture */}
      <circle cx="50" cy="43" r="0.6" fill="#701a75" opacity="0.5" />
      <circle cx="50" cy="52" r="0.6" fill="#701a75" opacity="0.5" />
      <circle cx="50" cy="61" r="0.6" fill="#701a75" opacity="0.5" />
      <circle cx="50" cy="70" r="0.6" fill="#701a75" opacity="0.5" />
      <circle cx="44" cy="45" r="0.5" fill="#701a75" opacity="0.4" />
      <circle cx="56" cy="45" r="0.5" fill="#701a75" opacity="0.4" />
      <circle cx="43" cy="53" r="0.5" fill="#701a75" opacity="0.4" />
      <circle cx="57" cy="53" r="0.5" fill="#701a75" opacity="0.4" />

      {/* Subtle depth shadows between drupelets */}
      <ellipse cx="50" cy="38" rx="3" ry="2" fill="#581c87" opacity="0.2" />
      <ellipse cx="50" cy="47" rx="3" ry="2" fill="#581c87" opacity="0.2" />
      <ellipse cx="50" cy="56" rx="3" ry="2" fill="#581c87" opacity="0.2" />
      <ellipse cx="50" cy="65" rx="3" ry="2" fill="#581c87" opacity="0.2" />
      <ellipse cx="50" cy="73" rx="2.5" ry="1.5" fill="#581c87" opacity="0.2" />
    </svg>
  );
}
