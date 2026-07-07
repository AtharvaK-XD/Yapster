export interface AnimalAvatarInfo {
  id: string;
  name: string;
  svg: string;
}

export const ANIMAL_AVATARS: AnimalAvatarInfo[] = [
  {
    id: 'cat',
    name: 'Curious Cat',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <defs>
        <linearGradient id="cat-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ff9a9e"/>
          <stop offset="100%" stop-color="#fecfef"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#cat-bg)"/>
      <g class="cat-head">
        <!-- Ears -->
        <polygon points="25,35 15,10 40,25" fill="#f5f5f7" stroke="#e4e4e7" stroke-width="1.5" stroke-linejoin="round" class="cat-ear-l"/>
        <polygon points="28,32 20,15 37,25" fill="#ffb6c1" class="cat-ear-l-inner"/>
        <polygon points="75,35 85,10 60,25" fill="#f5f5f7" stroke="#e4e4e7" stroke-width="1.5" stroke-linejoin="round" class="cat-ear-r"/>
        <polygon points="72,32 80,15 63,25" fill="#ffb6c1" class="cat-ear-r-inner"/>
        <!-- Face/Head -->
        <circle cx="50" cy="50" r="28" fill="#f5f5f7"/>
        <!-- Cheeks -->
        <ellipse cx="32" cy="55" rx="5" ry="3" fill="#ffa07a" opacity="0.4"/>
        <ellipse cx="68" cy="55" rx="5" ry="3" fill="#ffa07a" opacity="0.4"/>
        <!-- Eyes -->
        <g class="cat-eyes">
          <circle cx="40" cy="46" r="3.5" fill="#18181b"/>
          <circle cx="39" cy="45" r="1" fill="#ffffff"/>
          <circle cx="60" cy="46" r="3.5" fill="#18181b"/>
          <circle cx="59" cy="45" r="1" fill="#ffffff"/>
        </g>
        <!-- Nose/Mouth -->
        <polygon points="50,54 47,51 53,51" fill="#ffb6c1" class="cat-nose"/>
        <path d="M47,56 C49,58 50,58 50,56 C50,58 51,58 53,56" fill="none" stroke="#71717a" stroke-width="1.5" stroke-linecap="round"/>
        <!-- Whiskers -->
        <path d="M22,53 L10,51 M22,57 L8,57 M22,61 L10,63" stroke="#d4d4d8" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M78,53 L90,51 M78,57 L92,57 M78,61 L90,63" stroke="#d4d4d8" stroke-width="1.5" stroke-linecap="round"/>
      </g>
    </svg>`
  },
  {
    id: 'dog',
    name: 'Happy Dog',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <defs>
        <linearGradient id="dog-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#a1c4fd"/>
          <stop offset="100%" stop-color="#c2e9fb"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#dog-bg)"/>
      <g class="dog-head">
        <!-- Ears -->
        <path d="M22,30 C12,30 14,60 22,60 C26,60 28,45 28,35 Z" fill="#b45309" class="dog-ear-l"/>
        <path d="M78,30 C88,30 86,60 78,60 C74,60 72,45 72,35 Z" fill="#b45309" class="dog-ear-r"/>
        <!-- Head -->
        <circle cx="50" cy="50" r="26" fill="#d97706"/>
        <!-- Snout background -->
        <ellipse cx="50" cy="56" rx="14" ry="10" fill="#fef3c7"/>
        <!-- Eyes -->
        <circle cx="41" cy="44" r="3.5" fill="#18181b"/>
        <circle cx="40" cy="42" r="1" fill="#ffffff"/>
        <circle cx="59" cy="44" r="3.5" fill="#18181b"/>
        <circle cx="58" cy="42" r="1" fill="#ffffff"/>
        <!-- Tongue -->
        <path d="M47,60 C47,67 53,67 53,60 Z" fill="#ef4444" class="dog-tongue"/>
        <!-- Nose -->
        <ellipse cx="50" cy="50" rx="5" ry="3" fill="#18181b"/>
        <!-- Mouth lines -->
        <path d="M45,55 Q50,59 55,55" fill="none" stroke="#18181b" stroke-width="1.5" stroke-linecap="round"/>
      </g>
    </svg>`
  },
  {
    id: 'panda',
    name: 'Chill Panda',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <defs>
        <linearGradient id="panda-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#d4fc79"/>
          <stop offset="100%" stop-color="#96e6a1"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#panda-bg)"/>
      <g class="panda-head">
        <!-- Ears -->
        <circle cx="26" cy="30" r="10" fill="#18181b" class="panda-ear-l"/>
        <circle cx="74" cy="30" r="10" fill="#18181b" class="panda-ear-r"/>
        <!-- Head -->
        <circle cx="50" cy="50" r="28" fill="#ffffff" stroke="#e4e4e7" stroke-width="1"/>
        <!-- Eye Patches -->
        <ellipse cx="39" cy="48" rx="8" ry="10" fill="#18181b" transform="rotate(-15 39 48)" class="panda-eye-patch-l"/>
        <ellipse cx="61" cy="48" rx="8" ry="10" fill="#18181b" transform="rotate(15 61 48)" class="panda-eye-patch-r"/>
        <!-- Eyes -->
        <circle cx="39" cy="46" r="3" fill="#ffffff"/>
        <circle cx="39" cy="46" r="1.5" fill="#18181b"/>
        <circle cx="61" cy="46" r="3" fill="#ffffff"/>
        <circle cx="61" cy="46" r="1.5" fill="#18181b"/>
        <!-- Snout / Nose -->
        <ellipse cx="50" cy="58" rx="8" ry="5" fill="#ffffff"/>
        <polygon points="50,56 46,53 54,53" fill="#18181b" class="panda-nose"/>
        <path d="M47,59 Q50,62 53,59" fill="none" stroke="#71717a" stroke-width="1.5" stroke-linecap="round"/>
      </g>
    </svg>`
  },
  {
    id: 'fox',
    name: 'Sly Fox',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <defs>
        <linearGradient id="fox-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ff0844"/>
          <stop offset="100%" stop-color="#ffb199"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#fox-bg)"/>
      <g class="fox-head">
        <!-- Ears -->
        <polygon points="22,38 10,12 36,28" fill="#ea580c" stroke="#c2410c" stroke-width="1.5" class="fox-ear-l"/>
        <polygon points="25,35 15,18 33,27" fill="#ffffff" class="fox-ear-l-inner"/>
        <polygon points="78,38 90,12 64,28" fill="#ea580c" stroke="#c2410c" stroke-width="1.5" class="fox-ear-r"/>
        <polygon points="75,35 85,18 67,27" fill="#ffffff" class="fox-ear-r-inner"/>
        <!-- Face Orange Base -->
        <polygon points="50,75 18,36 82,36" fill="#ea580c" stroke="#c2410c" stroke-width="1"/>
        <!-- Cheeks White Base -->
        <polygon points="50,75 18,36 34,36 50,56" fill="#ffffff"/>
        <polygon points="50,75 82,36 66,36 50,56" fill="#ffffff"/>
        <!-- Eyes -->
        <g class="fox-eyes">
          <ellipse cx="36" cy="44" rx="3.5" ry="2" fill="#18181b" transform="rotate(-10 36 44)"/>
          <ellipse cx="64" cy="44" rx="3.5" ry="2" fill="#18181b" transform="rotate(10 64 44)"/>
        </g>
        <!-- Snout/Nose -->
        <circle cx="50" cy="74" r="3.5" fill="#18181b" class="fox-nose"/>
      </g>
    </svg>`
  },
  {
    id: 'rabbit',
    name: 'Bouncy Rabbit',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <defs>
        <linearGradient id="rabbit-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#e0c3fc"/>
          <stop offset="100%" stop-color="#8ec5fc"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#rabbit-bg)"/>
      <g class="rabbit-head">
        <!-- Ears -->
        <g class="rabbit-ear-l-group">
          <path d="M26,35 C18,8 30,5 32,35 Z" fill="#e4e4e7" stroke="#d4d4d8" stroke-width="1" class="rabbit-ear-l"/>
          <path d="M27,32 C21,12 28,10 29,32 Z" fill="#ffb6c1" class="rabbit-ear-l-inner"/>
        </g>
        <g class="rabbit-ear-r-group">
          <path d="M74,35 C82,8 70,5 68,35 Z" fill="#e4e4e7" stroke="#d4d4d8" stroke-width="1" class="rabbit-ear-r"/>
          <path d="M73,32 C79,12 72,10 71,32 Z" fill="#ffb6c1" class="rabbit-ear-r-inner"/>
        </g>
        <!-- Head -->
        <circle cx="50" cy="56" r="24" fill="#e4e4e7" stroke="#d4d4d8" stroke-width="0.5"/>
        <!-- Eyes -->
        <circle cx="40" cy="51" r="3.5" fill="#18181b"/>
        <circle cx="39" cy="49" r="1" fill="#ffffff"/>
        <circle cx="60" cy="51" r="3.5" fill="#18181b"/>
        <circle cx="59" cy="49" r="1" fill="#ffffff"/>
        <!-- Pink Cheeks -->
        <ellipse cx="32" cy="61" rx="4" ry="2.5" fill="#ffb6c1" opacity="0.6"/>
        <ellipse cx="68" cy="61" rx="4" ry="2.5" fill="#ffb6c1" opacity="0.6"/>
        <!-- Snout -->
        <polygon points="50,60 47,57 53,57" fill="#ffb6c1" class="rabbit-nose"/>
        <path d="M47,63 Q50,65 53,63" fill="none" stroke="#71717a" stroke-width="1.5" stroke-linecap="round"/>
      </g>
    </svg>`
  },
  {
    id: 'koala',
    name: 'Sleepy Koala',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <defs>
        <linearGradient id="koala-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#cfd9df"/>
          <stop offset="100%" stop-color="#e2ebf0"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#koala-bg)"/>
      <g class="koala-head">
        <!-- Large furry ears -->
        <circle cx="25" cy="38" r="15" fill="#9ca3af" stroke="#7b828f" stroke-width="1.5" class="koala-ear-l"/>
        <circle cx="25" cy="38" r="10" fill="#f3f4f6" class="koala-ear-l-inner"/>
        <circle cx="75" cy="38" r="15" fill="#9ca3af" stroke="#7b828f" stroke-width="1.5" class="koala-ear-r"/>
        <circle cx="75" cy="38" r="10" fill="#f3f4f6" class="koala-ear-r-inner"/>
        <!-- Head -->
        <circle cx="50" cy="50" r="26" fill="#9ca3af" stroke="#7b828f" stroke-width="0.5"/>
        <!-- Eyes -->
        <circle cx="39" cy="46" r="3" fill="#18181b"/>
        <circle cx="38" cy="45" r="0.8" fill="#ffffff"/>
        <circle cx="61" cy="46" r="3" fill="#18181b"/>
        <circle cx="60" cy="45" r="0.8" fill="#ffffff"/>
        <!-- Large oval nose -->
        <ellipse cx="50" cy="54" rx="7" ry="11" fill="#374151" class="koala-nose"/>
        <!-- Cheeks -->
        <ellipse cx="32" cy="56" rx="3.5" ry="2" fill="#ffb6c1" opacity="0.5"/>
        <ellipse cx="68" cy="56" rx="3.5" ry="2" fill="#ffb6c1" opacity="0.5"/>
      </g>
    </svg>`
  },
  {
    id: 'frog',
    name: 'Derpy Frog',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <defs>
        <linearGradient id="frog-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#55d284"/>
          <stop offset="100%" stop-color="#f2fcfe"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#frog-bg)"/>
      <g class="frog-head">
        <!-- Bulging Eyes -->
        <circle cx="34" cy="36" r="10" fill="#10b981" class="frog-eye-bulb-l"/>
        <circle cx="34" cy="36" r="7" fill="#ffffff"/>
        <circle cx="34" cy="36" r="3" fill="#18181b"/>
        <circle cx="66" cy="36" r="10" fill="#10b981" class="frog-eye-bulb-r"/>
        <circle cx="66" cy="36" r="7" fill="#ffffff"/>
        <circle cx="66" cy="36" r="3" fill="#18181b"/>
        <!-- Head / Body Base -->
        <ellipse cx="50" cy="56" rx="26" ry="20" fill="#10b981"/>
        <!-- Throat Puffing bubble -->
        <circle cx="50" cy="65" r="9" fill="#a7f3d0" opacity="0.85" class="frog-throat"/>
        <!-- Cheeks -->
        <ellipse cx="31" cy="56" rx="4" ry="2.5" fill="#f43f5e" opacity="0.6"/>
        <ellipse cx="69" cy="56" rx="4" ry="2.5" fill="#f43f5e" opacity="0.6"/>
        <!-- Smiling mouth -->
        <path d="M37,55 Q50,62 63,55" fill="none" stroke="#065f46" stroke-width="2.5" stroke-linecap="round"/>
      </g>
    </svg>`
  },
  {
    id: 'lion',
    name: 'Brave Lion',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <defs>
        <linearGradient id="lion-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f6d365"/>
          <stop offset="100%" stop-color="#fda085"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#lion-bg)"/>
      <g class="lion-head">
        <!-- Mane -->
        <circle cx="50" cy="50" r="34" fill="#d97706" class="lion-mane"/>
        <!-- Ears -->
        <circle cx="32" cy="28" r="8" fill="#f59e0b" stroke="#d97706" stroke-width="1.5"/>
        <circle cx="32" cy="28" r="5" fill="#ffb6c1"/>
        <circle cx="68" cy="28" r="8" fill="#f59e0b" stroke="#d97706" stroke-width="1.5"/>
        <circle cx="68" cy="28" r="5" fill="#ffb6c1"/>
        <!-- Head -->
        <circle cx="50" cy="51" r="24" fill="#f59e0b"/>
        <!-- Eyes -->
        <circle cx="41" cy="44" r="3.5" fill="#18181b"/>
        <circle cx="40" cy="42" r="1" fill="#ffffff"/>
        <circle cx="59" cy="44" r="3.5" fill="#18181b"/>
        <circle cx="58" cy="42" r="1" fill="#ffffff"/>
        <!-- Muzzle -->
        <ellipse cx="50" cy="56" rx="10" ry="7" fill="#fef3c7"/>
        <polygon points="50,53 46,50 54,50" fill="#18181b"/>
        <path d="M46,56 Q50,59 54,56" fill="none" stroke="#18181b" stroke-width="1.5" stroke-linecap="round"/>
      </g>
    </svg>`
  },
  {
    id: 'penguin',
    name: 'Waddling Penguin',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <defs>
        <linearGradient id="penguin-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#7028e4"/>
          <stop offset="100%" stop-color="#e5e5be"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#penguin-bg)"/>
      <g class="penguin-head">
        <!-- Head base (black) -->
        <circle cx="50" cy="50" r="26" fill="#1f2937" class="penguin-skull"/>
        <!-- Face masking (white) -->
        <ellipse cx="42" cy="52" rx="12" ry="16" fill="#ffffff"/>
        <ellipse cx="58" cy="52" rx="12" ry="16" fill="#ffffff"/>
        <!-- Eyes -->
        <circle cx="42" cy="45" r="3.5" fill="#1f2937"/>
        <circle cx="41" cy="43" r="1" fill="#ffffff"/>
        <circle cx="58" cy="45" r="3.5" fill="#1f2937"/>
        <circle cx="57" cy="43" r="1" fill="#ffffff"/>
        <!-- Beak (orange) -->
        <polygon points="50,48 44,53 56,53" fill="#f59e0b" class="penguin-beak"/>
        <!-- Cheeks -->
        <ellipse cx="32" cy="55" rx="3.5" ry="2" fill="#ffb6c1" opacity="0.6"/>
        <ellipse cx="68" cy="55" rx="3.5" ry="2" fill="#ffb6c1" opacity="0.6"/>
      </g>
    </svg>`
  },
  {
    id: 'monkey',
    name: 'Cheeky Monkey',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <defs>
        <linearGradient id="monkey-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f093fb"/>
          <stop offset="100%" stop-color="#f5576c"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#monkey-bg)"/>
      <g class="monkey-head">
        <!-- Ears -->
        <circle cx="25" cy="44" r="11" fill="#b45309" stroke="#78350f" stroke-width="1.5" class="monkey-ear-l"/>
        <circle cx="25" cy="44" r="7" fill="#fed7aa"/>
        <circle cx="75" cy="44" r="11" fill="#b45309" stroke="#78350f" stroke-width="1.5" class="monkey-ear-r"/>
        <circle cx="75" cy="44" r="7" fill="#fed7aa"/>
        <!-- Head base -->
        <circle cx="50" cy="48" r="24" fill="#b45309" stroke="#78350f" stroke-width="0.5"/>
        <!-- Face mask -->
        <ellipse cx="42" cy="49" rx="10" ry="12" fill="#fed7aa"/>
        <ellipse cx="58" cy="49" rx="10" ry="12" fill="#fed7aa"/>
        <ellipse cx="50" cy="56" rx="14" ry="10" fill="#fed7aa"/>
        <!-- Eyes -->
        <circle cx="42" cy="44" r="3.5" fill="#18181b"/>
        <circle cx="41" cy="42" r="1" fill="#ffffff"/>
        <circle cx="58" cy="44" r="3.5" fill="#18181b"/>
        <circle cx="57" cy="42" r="1" fill="#ffffff"/>
        <!-- Nose / Mouth -->
        <circle cx="47" cy="51" r="1" fill="#78350f"/>
        <circle cx="53" cy="51" r="1" fill="#78350f"/>
        <path d="M42,56 Q50,62 58,56" fill="none" stroke="#78350f" stroke-width="2" stroke-linecap="round" class="monkey-mouth"/>
      </g>
    </svg>`
  },
  {
    id: 'owl',
    name: 'Wise Owl',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <defs>
        <linearGradient id="owl-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#30cfd0"/>
          <stop offset="100%" stop-color="#330867"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#owl-bg)"/>
      <g class="owl-head">
        <!-- Ear Tufts -->
        <polygon points="28,34 18,18 42,28" fill="#4b5563" class="owl-ear-l"/>
        <polygon points="72,34 82,18 58,28" fill="#4b5563" class="owl-ear-r"/>
        <!-- Head Base -->
        <ellipse cx="50" cy="52" rx="26" ry="22" fill="#4b5563"/>
        <!-- Large round eye patches -->
        <circle cx="40" cy="46" r="11" fill="#ffffff" class="owl-eye-patch-l"/>
        <circle cx="60" cy="46" r="11" fill="#ffffff" class="owl-eye-patch-r"/>
        <!-- Eyes -->
        <circle cx="40" cy="46" r="6" fill="#18181b"/>
        <circle cx="39" cy="44" r="2" fill="#ffffff" class="owl-eye-highlight-l"/>
        <!-- Right eye is animatable (wink) -->
        <circle cx="60" cy="46" r="6" fill="#18181b" class="owl-eye-r"/>
        <circle cx="59" cy="44" r="2" fill="#ffffff" class="owl-eye-highlight-r"/>
        <!-- Wink overlay path -->
        <path d="M54,46 Q60,52 66,46" fill="none" stroke="#18181b" stroke-width="2.5" stroke-linecap="round" class="owl-wink"/>
        <!-- Beak -->
        <polygon points="50,48 46,55 54,55" fill="#f59e0b" class="owl-beak"/>
      </g>
    </svg>`
  },
  {
    id: 'bear',
    name: 'Sleepy Bear',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <defs>
        <linearGradient id="bear-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#b8cbb8"/>
          <stop offset="100%" stop-color="#ee9ca7"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#bear-bg)"/>
      <g class="bear-head">
        <!-- Ears -->
        <circle cx="28" cy="32" r="9" fill="#7c2d12" stroke="#5b21b6" stroke-width="0.5" class="bear-ear-l"/>
        <circle cx="28" cy="32" r="5" fill="#ffb6c1"/>
        <circle cx="72" cy="32" r="9" fill="#7c2d12" stroke="#5b21b6" stroke-width="0.5" class="bear-ear-r"/>
        <circle cx="72" cy="32" r="5" fill="#ffb6c1"/>
        <!-- Head -->
        <circle cx="50" cy="50" r="26" fill="#7c2d12"/>
        <!-- Eyes -->
        <circle cx="40" cy="44" r="3.2" fill="#18181b"/>
        <circle cx="39" cy="42.5" r="0.8" fill="#ffffff"/>
        <circle cx="60" cy="44" r="3.2" fill="#18181b"/>
        <circle cx="59" cy="42.5" r="0.8" fill="#ffffff"/>
        <!-- Snout -->
        <ellipse cx="50" cy="56" rx="10" ry="7" fill="#fed7aa"/>
        <!-- Nose -->
        <ellipse cx="50" cy="53" rx="4.5" ry="2.8" fill="#18181b"/>
        <!-- Mouth -->
        <path d="M46,57 Q50,60 54,57" fill="none" stroke="#18181b" stroke-width="1.5" stroke-linecap="round"/>
      </g>
    </svg>`
  }
];
