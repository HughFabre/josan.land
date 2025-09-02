"use client"

import React from 'react'
import { Menu, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'
import { useTheme } from 'next-themes'

interface NavigationItem {
  title: string
  href: string
  description?: string
  items?: NavigationItem[]
}

interface NavigationBarProps {
  logo?: string
  brandName?: string
  navigationItems?: NavigationItem[]
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  logo = "https://ui.shadcn.com/favicon.ico",
  brandName = "Josan Land",
  navigationItems = [
    {
      title: "ソーシャル",
      href: "/social",
      items: [
        { title: "メッセージ", href: "/social/message", description: "暗号化付きのチャットサービス。" },
        { title: "SNS", href: "/social/sns", description: "投稿・反応でつながるコミュニティ。" },
        { title: "掲示板", href: "/social/board", description: "匿名で投稿できる書き込み場。" }
      ]
    },
    {
      title: "ゲーム",
      href: "/games",
      items: [
        { title: "競馬", href: "/games/racing", description: "着順を予想して賭けるゲーム。" },
        { title: "ポーカー", href: "/games/poker", description: "役と駆け引きを予想して賭けるゲーム。" },
        { title: "ブラックジャック", href: "/games/blackjack", description: "札の合計を21に近づけるゲーム。" },
        { title: "バカラ", href: "/games/baccarat", description: "プレイヤーかバンカーに賭けるゲーム。" }
      ]
    },
    {
      title: "リソース",
      href: "/resources",
      items: [
        { title: "情報", href: "/resources/info", description: "ジョサン教についての情報。" },
        { title: "ブログ", href: "/resources/blog", description: "ジョサン教についてのブログ。" },
        { title: "利用規約", href: "/resources/terms", description: "Josan Landの利用規約。" },
        { title: "プライバシーポリシー", href: "/resources/privacypolicy", description: "Josan Landのプライバシーポリシー。" }
      ]
    }
  ]
}) => {
  const { theme, setTheme } = useTheme()

  const ThemeToggle = () => (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )

  const MobileNavigation = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-2">
              <img src={logo} alt={brandName} className="h-8 w-8" />
              <span className="font-bold text-lg">{brandName}</span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {navigationItems.map((item, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="font-medium text-foreground">{item.title}</h3>
                  {item.items && (
                    <div className="pl-4 space-y-2">
                      {item.items.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href={subItem.href}
                          className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {subItem.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 border-t border-border space-y-3">
            <Button variant="outline" className="w-full" asChild>
              <a href="/auth/login">ログイン</a>
            </Button>
            <Button className="w-full" asChild>
              <a href="/auth/signup">サインアップ</a>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )

  return (
    <header className="fixed top-0 z-50 w-full font-sans">
      <div className="hidden md:block">
        <div className="mx-4 mt-4 rounded-xl border border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center space-x-4">
                <a href="/" className="flex items-center space-x-2">
                  <img src={logo} alt={brandName} className="h-8 w-8" />
                  <span className="font-bold text-xl">{brandName}</span>
                </a>
                <NavigationMenu className="ml-8">
                <NavigationMenuList className="[&>li]:transition-all [&>li]:duration-150 [&>li:hover]:bg-accent/50">
                  {navigationItems.map((item, index) => (
                    <NavigationMenuItem key={index}>
                      {item.items ? (
                        <>
                          <NavigationMenuTrigger className="h-10 px-4 py-2 data-[state=open]:bg-accent/50 hover:bg-accent/30 transition-all duration-200">
                            {item.title}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                              {item.items.map((subItem, subIndex) => (
                                <NavigationMenuLink key={subIndex} asChild>
                                  <a
                                    href={subItem.href}
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  >
                                    <div className="text-sm font-medium leading-none">{subItem.title}</div>
                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                      {subItem.description}
                                    </p>
                                  </a>
                                </NavigationMenuLink>
                              ))}
                            </div>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <NavigationMenuLink asChild>
                          <a
                            href={item.href}
                            className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                          >
                            {item.title}
                          </a>
                        </NavigationMenuLink>
                      )}
                    </NavigationMenuItem>
                  ))}
                 </NavigationMenuList>
               </NavigationMenu>
               </div>
              <div className="flex items-center space-x-2">
                <ThemeToggle />
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" asChild>
                    <a href="/auth/login">ログイン</a>
                  </Button>
                  <Button size="sm" asChild>
                    <a href="/auth/signup">サインアップ</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <MobileNavigation />
              <a href="/" className="flex items-center space-x-2">
                <img src={logo} alt={brandName} className="h-8 w-8" />
                <span className="font-bold text-xl">{brandName}</span>
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavigationBar