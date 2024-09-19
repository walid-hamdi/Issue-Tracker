"use client";
import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const Navbar = () => {
  return (
    <nav className="border-b px-5 py-3 mb-5">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <AuthLinks />
          </Flex>
          <Box>
            <AuthState />
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

const AuthLinks = () => {
  const pathName = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
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
  );
};

const AuthState = () => {
  const { status, data } = useSession();
  const router = useRouter();

  if (status === "loading") return null;

  if (status === "unauthenticated")
    return (
      <Button
        className="cursor-pointer"
        onClick={() => {
          router.push("/api/auth/signin");
        }}
      >
        Login
      </Button>
    );

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          src={data!.user?.image!}
          fallback="?"
          radius="full"
          size="2"
          className="cursor-pointer"
          referrerPolicy="no-referrer"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>
          <Text size="2">{data!.user?.email}</Text>
        </DropdownMenu.Label>
        <DropdownMenu.Item>
          <Link className="block cursor-pointer" href="/api/auth/signout">
            Logout
          </Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Navbar;
