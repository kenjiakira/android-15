// Font Manager - Quản lý font cho ứng dụng
import { useEffect } from 'react'

export interface FontConfig {
  name: string
  path: string
  weight?: string
  style?: string
  display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional'
}

export const FONTS = {
  STRETCH_PRO: {
    name: 'StretchPro',
    path: '/fonts/StretchPro.otf',
    weight: '400',
    style: 'normal',
    display: 'swap'
  },
  STRETCH_PRO_BOLD: {
    name: 'StretchPro',
    path: '/fonts/StretchPro.otf',
    weight: '700',
    style: 'normal',
    display: 'swap'
  },
  STRETCH_PRO_THIN: {
    name: 'StretchPro',
    path: '/fonts/StretchPro.otf',
    weight: '100',
    style: 'normal',
    display: 'swap'
  }
} as const

export class FontManager {
  private static instance: FontManager
  private loadedFonts: Set<string> = new Set()

  static getInstance(): FontManager {
    if (!FontManager.instance) {
      FontManager.instance = new FontManager()
    }
    return FontManager.instance
  }

  async loadFont(fontConfig: FontConfig): Promise<void> {
    const fontKey = `${fontConfig.name}-${fontConfig.weight}-${fontConfig.style}`
    
    if (this.loadedFonts.has(fontKey)) {
      return
    }

    try {
      const fontFace = new FontFace(
        fontConfig.name,
        `url(${fontConfig.path})`,
        {
          weight: fontConfig.weight,
          style: fontConfig.style,
          display: fontConfig.display
        }
      )

      await fontFace.load()
      document.fonts.add(fontFace)
      this.loadedFonts.add(fontKey)
      
      console.log(`Font loaded: ${fontKey}`)
    } catch (error) {
      console.error(`Failed to load font ${fontKey}:`, error)
    }
  }

  async loadFonts(fontConfigs: FontConfig[]): Promise<void> {
    const promises = fontConfigs.map(config => this.loadFont(config))
    await Promise.all(promises)
  }

  getFontCSS(fontConfig: FontConfig): string {
    return `
      font-family: '${fontConfig.name}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-weight: ${fontConfig.weight};
      font-style: ${fontConfig.style};
    `
  }
}

// Hook để sử dụng font trong React components
export const useFont = (fontConfig: FontConfig) => {
  const fontManager = FontManager.getInstance()
  
  useEffect(() => {
    fontManager.loadFont(fontConfig)
  }, [fontConfig])

  return fontManager.getFontCSS(fontConfig)
}
