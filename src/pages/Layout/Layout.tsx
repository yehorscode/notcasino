import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Link } from "@radix-ui/react-navigation-menu";
import { Outlet } from "react-router-dom";
import { useTheme } from "@/components/utils/theme-provider";
import { Button } from "@/components/ui/button";

export default function Layout() {
    const { theme, setTheme } = useTheme();

    const components: { title: string; href: string; description: string }[] = [
        {
            title: "Slot machines",
            href: "/games/slots",
            description:
                "Classic gambling game. Spin, wait, win!",
        },
        {
            title: "Roulette",
            href: "/games/roulette",
            description: "Very easy to win but fun"
        }
    ];

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <div className="flex flex-col">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link
                                className="font-rumisgone font-bold flex justify-center items-center"
                                href="/"
                            >
                                Pirate Play
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>
                            <b>Games!</b>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                {components.map((component) => (
                                    <ListItem
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                    >
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="flex justify-end items-center gap-2">
                        <Button
                            onClick={toggleTheme}
                            aria-label="Switch theme"
                            variant="outline"
                        >
                            {theme === "dark" ? "Light Mode" : "Dark Mode"}
                        </Button>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <Outlet />
        </div>
    );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}