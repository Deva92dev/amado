// import Link from "next/link";
// import { AlignLeft } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
// import { Button } from "../ui/button";
// import { navLinks, publicNavLinks } from "@/utils/links";
// import SignOutLink from "./SignOutLink";
// import UserIcon from "./UserIcon";
// import { env } from "../../../env";
// import { getOptionalAuth } from "@/lib/clerk/authServer";
// import {
//   AuthSignedIn,
//   AuthSignedOut,
//   AuthSignInButton,
//   AuthSignUpButton,
// } from "@/lib/clerk/authClient";

// type LinksDropDownProps = {
//   hidePublicLinks?: boolean;
// };

// const LinksDropDown = async ({
//   hidePublicLinks = false,
// }: LinksDropDownProps) => {
//   const userId = await getOptionalAuth();
//   const isAdmin = userId === env.ADMIN_USER_ID;

//   return (
//     <DropdownMenu modal={false}>
//       <DropdownMenuTrigger asChild>
//         <Button
//           variant="outline"
//           className="flex gap-4 max-w-[100px] cursor-pointer"
//           aria-label="User options"
//         >
//           <AlignLeft className="w-6 h-6 cursor-pointer" />
//           <UserIcon />
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent
//         className="w-48 cursor-pointer"
//         align="start"
//         sideOffset={10}
//       >
//         <AuthSignedOut>
//           <DropdownMenuItem>
//             <AuthSignInButton mode="modal">
//               <button className="w-full text-left">Login</button>
//             </AuthSignInButton>
//           </DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem>
//             <AuthSignUpButton mode="modal">
//               <button className="w-full text-left">Register</button>
//             </AuthSignUpButton>
//           </DropdownMenuItem>
//           <DropdownMenuSeparator />
//           {publicNavLinks.map((link) => {
//             return (
//               <DropdownMenuItem key={link.href}>
//                 <Link href={link.href} className="capitalize w-full">
//                   {link.label}
//                 </Link>
//               </DropdownMenuItem>
//             );
//           })}
//         </AuthSignedOut>
//         <AuthSignedIn>
//           {navLinks.map((link) => {
//             if (link.label === "dashboard" && !isAdmin) return null;
//             // Skip public links on large screens
//             if (
//               hidePublicLinks &&
//               publicNavLinks.some((publicLink) => publicLink.href === link.href)
//             ) {
//               return null;
//             }
//             return (
//               <DropdownMenuItem key={link.href}>
//                 <Link href={link.href} className="capitalize w-full">
//                   {link.label}
//                 </Link>
//               </DropdownMenuItem>
//             );
//           })}
//           <DropdownMenuSeparator />
//           <DropdownMenuItem>
//             <SignOutLink />
//           </DropdownMenuItem>
//         </AuthSignedIn>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };

// export default LinksDropDown;
import Link from "next/link";
import { AlignLeft } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { navLinks, publicNavLinks } from "@/utils/links";
import SignOutLink from "./SignOutLink";
import UserIcon from "./UserIcon";
import { env } from "../../../env";
import { getOptionalAuth } from "@/lib/clerk/authServer";
import { AuthSignedIn, AuthSignedOut } from "@/lib/clerk/authClient";

type LinksDropDownProps = {
  hidePublicLinks?: boolean;
};

const LinksDropDown = async ({
  hidePublicLinks = false,
}: LinksDropDownProps) => {
  const userId = await getOptionalAuth();
  const isAdmin = userId === env.ADMIN_USER_ID;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex gap-4 max-w-[100px] cursor-pointer"
          aria-label="User options"
        >
          <AlignLeft className="w-6 h-6 cursor-pointer" />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-48 cursor-pointer"
        align="start"
        sideOffset={10}
      >
        <AuthSignedOut>
          <DropdownMenuItem>
            <Link href="/login" className="w-full text-left">
              Login
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/sign-up" className="w-full text-left">
              Register
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {publicNavLinks.map((link) => {
            return (
              <DropdownMenuItem key={link.href}>
                <Link href={link.href} className="capitalize w-full">
                  {link.label}
                </Link>
              </DropdownMenuItem>
            );
          })}
        </AuthSignedOut>
        <AuthSignedIn>
          {navLinks.map((link) => {
            if (link.label === "dashboard" && !isAdmin) return null;
            // Skip public links on large screens
            if (
              hidePublicLinks &&
              publicNavLinks.some((publicLink) => publicLink.href === link.href)
            ) {
              return null;
            }
            return (
              <DropdownMenuItem key={link.href}>
                <Link href={link.href} className="capitalize w-full">
                  {link.label}
                </Link>
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutLink />
          </DropdownMenuItem>
        </AuthSignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LinksDropDown;
