"use client";
import { Box, Button, Container, Flex } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const Navbar = () => {
  const pathName = usePathname();
  const { status, data } = useSession();
  const router = useRouter();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="border-b px-5 py-3 mb-5">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <ul className="flex space-x-6">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={classNames({
                      "text-zinc-900": link.href === pathName,
                      "text-zinc-500": link.href !== pathName,
                      "hover:text-zinc-800 transition-colors": true,
                    })}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            <Button
              className="cursor-pointer"
              onClick={() => {
                if (status === "authenticated")
                  router.push("/api/auth/signout");
                else if (status === "unauthenticated")
                  router.push("/api/auth/signin");
              }}
            >
              {status === "authenticated" && "Logout"}
              {status === "unauthenticated" && "Login"}
            </Button>
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
