"use client"

import { ReactNode } from "react"
import { App, AppScreenProps } from "./app-manager"

interface AppComponent {
  component: React.ComponentType<AppScreenProps>
  props?: Record<string, any>
}

class AppRouter {
  private static instance: AppRouter
  private appComponents: Map<string, AppComponent> = new Map()

  static getInstance(): AppRouter {
    if (!AppRouter.instance) {
      AppRouter.instance = new AppRouter()
    }
    return AppRouter.instance
  }

  registerApp(appId: string, component: React.ComponentType<AppScreenProps>, props?: Record<string, any>): void {
    this.appComponents.set(appId, { component, props })
  }

  getAppComponent(appId: string): AppComponent | undefined {
    return this.appComponents.get(appId)
  }

  hasAppComponent(appId: string): boolean {
    return this.appComponents.has(appId)
  }

  getRegisteredAppIds(): string[] {
    return Array.from(this.appComponents.keys())
  }

  renderApp(appId: string, onBack: () => void, onNavigate?: (appId: string) => void): ReactNode {
    const appComponent = this.getAppComponent(appId)
    if (!appComponent) {
      return this.renderDefaultApp(appId, onBack)
    }

    const { component: Component, props = {} } = appComponent
    return <Component onBack={onBack} onNavigate={onNavigate} {...props} />
  }

  private renderDefaultApp(appId: string, onBack: () => void): ReactNode {
    return (
      <div className="w-full h-full bg-gray-900 text-white flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">App Not Found</h1>
          <p className="text-gray-400 mb-6">The app "{appId}" is not available yet.</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }
}

export default AppRouter
