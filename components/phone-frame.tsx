"use client"

import { ReactNode, useEffect, useRef } from "react"

interface PhoneFrameProps {
  children: ReactNode
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const setWidthVar = () => {
      el.style.setProperty("--width", `${el.clientWidth}px`)
    }
    const ro = new ResizeObserver(setWidthVar)
    ro.observe(el)
    setWidthVar()
    return () => ro.disconnect()
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-300 via-slate-200 to-slate-300 p-4 select-none">
      <div ref={containerRef} className="w-full max-w-sm aspect-[353/745] relative" style={{
      }}>
        <div
          className="absolute overflow-hidden z-0"
          style={{
            left: "4.1%",
            right: "4.8%",
            top: "2.05%",
            bottom: "1.8%",
            borderRadius: "calc(var(--width) * 0.126666666666667)"
          }}
        >
          <div className="w-full h-full bg-background relative">
            {children}
          </div>
        </div>

        <svg className="absolute inset-0 z-10 w-full h-full block pointer-events-none select-none" viewBox="0 0 353 745" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M66.7227 3.70581C31.3764 3.70581 2.72266 32.3596 2.72266 67.7058V679.706C2.72266 715.052 31.3764 743.706 66.7227 743.706H282.723C318.069 743.706 346.723 715.052 346.723 679.706V67.7058C346.723 32.3596 318.069 3.70581 282.723 3.70581H66.7227ZM59 16C34.6995 16 15 35.6995 15 60V686C15 710.301 34.6995 730 59 730H291C315.301 730 335 710.301 335 686V60C335 35.6995 315.301 16 291 16H59Z" fill="black"/>
          <path d="M350 202C351.105 202 352 202.895 352 204V256C352 257.105 351.105 258 350 258V202Z" fill="url(#paint0_linear_2202_14)"/>
          <path d="M350 296C351.105 296 352 296.895 352 298V398C352 399.105 351.105 400 350 400V296Z" fill="url(#paint1_linear_2202_14)"/>
          <rect x="60" y="1" width="230" height="7" fill="url(#paint2_linear_2202_14)"/>
          <rect x="60" y="738" width="230" height="7" fill="url(#paint3_linear_2202_14)"/>
          <rect y="685" width="624" height="7.00003" transform="rotate(-90 0 685)" fill="url(#paint4_linear_2202_14)"/>
          <rect x="350" y="61" width="624" height="7.00003" transform="rotate(90 350 61)" fill="url(#paint5_linear_2202_14)"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M60 738C31.0051 738 7 713.995 7 685H0C0 717.861 27.1391 745 60 745V738Z" fill="url(#paint6_radial_2202_14)"/>
          <path d="M20.9571 727.678C32.7484 739.525 46.219 744 60 744V740C43.0185 740 29.4497 732.108 21.9404 726.633C19.2414 724.666 18.6008 725.311 20.9571 727.678Z" fill="url(#paint7_linear_2202_14)"/>
          <path d="M14.8232 720.893C4.70757 709.334 1.00012 695.669 1.00012 685L5.52737 685C5.52737 700.554 11.458 712.762 15.9758 719.92C17.7995 722.809 17.0732 723.465 14.8232 720.893Z" fill="url(#paint8_linear_2202_14)"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M290 738C318.995 738 343 713.995 343 685H350C350 717.861 322.861 745 290 745V738Z" fill="url(#paint9_radial_2202_14)"/>
          <path d="M329.043 727.678C317.252 739.525 303.781 744 290 744V740C306.981 740 320.55 732.108 328.06 726.633C330.759 724.666 331.399 725.311 329.043 727.678Z" fill="url(#paint10_linear_2202_14)"/>
          <path d="M335.177 720.893C345.292 709.334 349 695.669 349 685L344.473 685C344.473 700.554 338.542 712.762 334.024 719.92C332.201 722.809 332.927 723.465 335.177 720.893Z" fill="url(#paint11_linear_2202_14)"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M60 8C31.0051 8 7 32.0051 7 61H0C0 28.1391 27.1391 1 60 1V8Z" fill="url(#paint12_radial_2202_14)"/>
          <path d="M20.9571 18.3218C32.7484 6.47457 46.219 2 60 2V6C43.0185 6 29.4497 13.8918 21.9404 19.3666C19.2414 21.3344 18.6008 20.6893 20.9571 18.3218Z" fill="url(#paint13_linear_2202_14)"/>
          <path d="M14.8232 25.1066C4.70757 36.6663 1.00012 50.3312 1.00012 61L5.52737 61C5.52737 45.4457 11.458 33.2377 15.9758 26.0799C17.7995 23.1906 17.0732 22.5353 14.8232 25.1066Z" fill="url(#paint14_linear_2202_14)"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M290 8C318.995 8 343 32.0051 343 61H350C350 28.1391 322.861 1 290 1V8Z" fill="url(#paint15_radial_2202_14)"/>
          <path d="M329.043 18.3218C317.252 6.47457 303.781 2 290 2V6C306.981 6 320.55 13.8918 328.06 19.3666C330.759 21.3344 331.399 20.6893 329.043 18.3218Z" fill="url(#paint16_linear_2202_14)"/>
          <path d="M335.177 25.1066C345.292 36.6663 349 50.3312 349 61L344.473 61C344.473 45.4457 338.542 33.2377 334.024 26.0799C332.201 23.1906 332.927 22.5353 335.177 25.1066Z" fill="url(#paint17_linear_2202_14)"/>
          <rect y="116" width="7" height="8" fill="black" fillOpacity="0.2"/>
          <rect width="7" height="8" transform="matrix(1 0 0 -1 0 670)" fill="black" fillOpacity="0.2"/>
          <rect x="343" y="116" width="7" height="8" fill="black" fillOpacity="0.2"/>
          <rect width="7" height="8" transform="matrix(1 0 0 -1 343 670)" fill="black" fillOpacity="0.2"/>
          <rect x="171" y="8" width="7" height="8" transform="rotate(-90 171 8)" fill="black" fillOpacity="0.2"/>
          <rect width="7" height="8" transform="matrix(-4.37114e-08 1 1 4.37114e-08 212.5 738)" fill="black" fillOpacity="0.2"/>
          {/* Top-center camera and UI details */}
          <g filter="url(#filter0_di_2202_14)">
            <circle cx="175" cy="42" r="11" fill="#080808"/>
          </g>
          <g filter="url(#filter1_d_2202_14)">
            <circle cx="175" cy="42" r="6" fill="black"/>
            <circle cx="175" cy="42" r="5.5" stroke="white" strokeOpacity="0.1"/>
          </g>
          <circle cx="175" cy="42" r="4.5" fill="url(#paint18_linear_2202_14)" stroke="black"/>
          <g style={{ mixBlendMode: "lighten" }}>
            <path d="M176.562 44.5619C177.424 44.0349 178 43.0847 178 42C178 40.3431 176.657 39 175 39C173.915 39 172.965 39.5757 172.438 40.4381C172.893 40.1602 173.428 40 174 40C175.657 40 177 41.3431 177 43C177 43.5722 176.84 44.1069 176.562 44.5619Z" fill="url(#paint19_linear_2202_14)"/>
          </g>
          <g style={{ mixBlendMode: "screen" }}>
            <path d="M172.264 40.7668C172.095 41.143 172 41.5605 172 42C172 43.6569 173.343 45 175 45C175.44 45 175.857 44.9055 176.233 44.7356C174.34 44.1532 172.847 42.6596 172.264 40.7668Z" fill="url(#paint20_linear_2202_14)"/>
          </g>
          <defs>
            <filter id="filter0_di_2202_14" x="164" y="31" width="22" height="23" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="1"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2202_14"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2202_14" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="1"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"/>
              <feBlend mode="normal" in2="shape" result="effect2_innerShadow_2202_14"/>
            </filter>
            <filter id="filter1_d_2202_14" x="169" y="36" width="12" height="13" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="1"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2202_14"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2202_14" result="shape"/>
            </filter>
            <linearGradient id="paint0_linear_2202_14" x1="351" y1="202" x2="351" y2="258" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FEF7F0"/>
              <stop offset="0.055" stopColor="#8D8072"/>
              <stop offset="0.0793102" stopColor="#988C81"/>
              <stop offset="0.100079" stopColor="#A8998A"/>
              <stop offset="0.939936" stopColor="#7E7367"/>
              <stop offset="0.946426" stopColor="#F8F2ED"/>
              <stop offset="1" stopColor="#FEF5EB"/>
            </linearGradient>
            <linearGradient id="paint1_linear_2202_14" x1="351" y1="296" x2="351" y2="400" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F9F1E9"/>
              <stop offset="0.04" stopColor="#8C8073"/>
              <stop offset="0.05" stopColor="#A3998F"/>
              <stop offset="0.100079" stopColor="#A99989"/>
              <stop offset="0.97" stopColor="#8C8073"/>
              <stop offset="0.98" stopColor="#F0E6DB"/>
              <stop offset="1" stopColor="#F0E6DB"/>
            </linearGradient>
            <linearGradient id="paint2_linear_2202_14" x1="172.641" y1="8" x2="172.641" y2="1" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8C8073"/>
              <stop offset="0.08" stopColor="#67594C"/>
              <stop offset="0.22" stopColor="#3C3228"/>
              <stop offset="0.285714" stopColor="#2E261F"/>
              <stop offset="0.286272" stopColor="#F3E5D7"/>
              <stop offset="0.856585" stopColor="#FEFCFA"/>
              <stop offset="0.856585" stopColor="#66594C"/>
              <stop offset="1" stopColor="#988C81"/>
            </linearGradient>
            <linearGradient id="paint3_linear_2202_14" x1="175" y1="738" x2="175" y2="745" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8C7377"/>
              <stop offset="0.08" stopColor="#674C51"/>
              <stop offset="0.22" stopColor="#3C282B"/>
              <stop offset="0.285714" stopColor="#2E1F21"/>
              <stop offset="0.286272" stopColor="#F3D7DB"/>
              <stop offset="0.856585" stopColor="#FEFAFB"/>
              <stop offset="0.856585" stopColor="#664C50"/>
              <stop offset="1" stopColor="#988184"/>
            </linearGradient>
            <linearGradient id="paint4_linear_2202_14" x1="306" y1="692" x2="306" y2="685" gradientUnits="userSpaceOnUse">
              <stop stopColor="#988C81"/>
              <stop offset="0.1" stopColor="#67594C"/>
              <stop offset="0.2099" stopColor="#4D4033"/>
              <stop offset="0.21" stopColor="#EBDED1"/>
              <stop offset="0.76" stopColor="#FEF7F0"/>
              <stop offset="0.858259" stopColor="#FEFAF6"/>
              <stop offset="0.86" stopColor="#584D41"/>
              <stop offset="0.98" stopColor="#988C81"/>
            </linearGradient>
            <linearGradient id="paint5_linear_2202_14" x1="656" y1="68" x2="656" y2="61" gradientUnits="userSpaceOnUse">
              <stop stopColor="#988C81"/>
              <stop offset="0.1" stopColor="#67594C"/>
              <stop offset="0.2099" stopColor="#4D4033"/>
              <stop offset="0.21" stopColor="#EBDED1"/>
              <stop offset="0.76" stopColor="#FEF7F0"/>
              <stop offset="0.858259" stopColor="#FEFAF6"/>
              <stop offset="0.86" stopColor="#584D41"/>
              <stop offset="0.98" stopColor="#988C81"/>
            </linearGradient>
            <radialGradient id="paint6_radial_2202_14" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(59.5 685.5) rotate(136.675) scale(60.4835 60.4836)">
              <stop offset="0.867457" stopColor="#988C81"/>
              <stop offset="0.879909" stopColor="#67594C"/>
              <stop offset="0.902341" stopColor="#30261D"/>
              <stop offset="0.946821" stopColor="#30261D"/>
              <stop offset="0.967149" stopColor="#584D41"/>
              <stop offset="0.981589" stopColor="#988C81"/>
            </radialGradient>
            <linearGradient id="paint7_linear_2202_14" x1="37.2936" y1="721.5" x2="37.2937" y2="743.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9D8C7B"/>
              <stop offset="0.83" stopColor="#F2E6D9"/>
              <stop offset="0.95" stopColor="#FFF7EE"/>
              <stop offset="1" stopColor="#FEFAF5"/>
            </linearGradient>
            <linearGradient id="paint8_linear_2202_14" x1="20.5124" y1="706.027" x2="1.08186" y2="706.027" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9D8C7B"/>
              <stop offset="0.83" stopColor="#F2E6D9"/>
              <stop offset="0.95" stopColor="#FFF7EE"/>
              <stop offset="1" stopColor="#FEFAF5"/>
            </linearGradient>
            <radialGradient id="paint9_radial_2202_14" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(290.5 685.5) rotate(43.3252) scale(60.4835 60.4836)">
              <stop offset="0.867457" stopColor="#988C81"/>
              <stop offset="0.879909" stopColor="#67594C"/>
              <stop offset="0.902341" stopColor="#30261D"/>
              <stop offset="0.946821" stopColor="#30261D"/>
              <stop offset="0.967149" stopColor="#584D41"/>
              <stop offset="0.981589" stopColor="#988C81"/>
            </radialGradient>
            <linearGradient id="paint10_linear_2202_14" x1="312.706" y1="721.5" x2="312.706" y2="743.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9D8C7B"/>
              <stop offset="0.83" stopColor="#F2E6D9"/>
              <stop offset="0.95" stopColor="#FFF7EE"/>
              <stop offset="1" stopColor="#FEFAF5"/>
            </linearGradient>
            <linearGradient id="paint11_linear_2202_14" x1="329.488" y1="706.027" x2="348.918" y2="706.027" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9D8C7B"/>
              <stop offset="0.83" stopColor="#F2E6D9"/>
              <stop offset="0.95" stopColor="#FFF7EE"/>
              <stop offset="1" stopColor="#FEFAF5"/>
            </linearGradient>
            <radialGradient id="paint12_radial_2202_14" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(59.5 60.5001) rotate(-136.675) scale(60.4835 60.4836)">
              <stop offset="0.867457" stopColor="#988C81"/>
              <stop offset="0.879909" stopColor="#67594C"/>
              <stop offset="0.902341" stopColor="#30261D"/>
              <stop offset="0.946821" stopColor="#30261D"/>
              <stop offset="0.967149" stopColor="#584D41"/>
              <stop offset="0.981589" stopColor="#988C81"/>
            </radialGradient>
            <linearGradient id="paint13_linear_2202_14" x1="37.2936" y1="24.5" x2="37.2937" y2="2.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9D8C7B"/>
              <stop offset="0.83" stopColor="#F2E6D9"/>
              <stop offset="0.95" stopColor="#FFF7EE"/>
              <stop offset="1" stopColor="#FEFAF5"/>
            </linearGradient>
            <linearGradient id="paint14_linear_2202_14" x1="20.5124" y1="39.9734" x2="1.08186" y2="39.9735" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9D8C7B"/>
              <stop offset="0.83" stopColor="#F2E6D9"/>
              <stop offset="0.95" stopColor="#FFF7EE"/>
              <stop offset="1" stopColor="#FEFAF5"/>
            </linearGradient>
            <radialGradient id="paint15_radial_2202_14" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(290.5 60.5001) rotate(-43.3252) scale(60.4835 60.4836)">
              <stop offset="0.867457" stopColor="#988C81"/>
              <stop offset="0.879909" stopColor="#67594C"/>
              <stop offset="0.902341" stopColor="#30261D"/>
              <stop offset="0.946821" stopColor="#30261D"/>
              <stop offset="0.967149" stopColor="#584D41"/>
              <stop offset="0.981589" stopColor="#988C81"/>
            </radialGradient>
            <linearGradient id="paint16_linear_2202_14" x1="312.706" y1="24.5" x2="312.706" y2="2.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9D8C7B"/>
              <stop offset="0.83" stopColor="#F2E6D9"/>
              <stop offset="0.95" stopColor="#FFF7EE"/>
              <stop offset="1" stopColor="#FEFAF5"/>
            </linearGradient>
            <linearGradient id="paint17_linear_2202_14" x1="329.488" y1="39.9734" x2="348.918" y2="39.9735" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9D8C7B"/>
              <stop offset="0.83" stopColor="#F2E6D9"/>
              <stop offset="0.95" stopColor="#FFF7EE"/>
              <stop offset="1" stopColor="#FEFAF5"/>
            </linearGradient>
            <linearGradient id="paint18_linear_2202_14" x1="178.5" y1="38.5" x2="172" y2="45" gradientUnits="userSpaceOnUse">
              <stop stopColor="#70665C"/>
              <stop offset="0.495"/>
              <stop offset="0.77" stopColor="#1D1A16"/>
              <stop offset="1" stopColor="#584D41"/>
            </linearGradient>
            <linearGradient id="paint19_linear_2202_14" x1="177.083" y1="39.7091" x2="173.11" y2="43.6825" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6A54AA"/>
              <stop offset="0.475"/>
            </linearGradient>
            <linearGradient id="paint20_linear_2202_14" x1="177.1" y1="39.9" x2="173.2" y2="43.8" gradientUnits="userSpaceOnUse">
              <stop offset="0.77"/>
              <stop offset="1" stopColor="#47331F"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  )
}
