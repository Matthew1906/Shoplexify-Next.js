import Image from "next/image";
import background from "@/public/auth-bg.jpg"
import { Header } from "@/app/components/partials";

export default function RootLayout(
  { children }: Readonly<{children: React.ReactNode}>
) {
  return (
    <>
        <Image alt="Supermarket Background" src={background}
          placeholder="blur" quality={100} fill sizes="100vh"
          style={{ objectFit: 'cover', zIndex: -10 }}
        />
        <Header isAuth={true} isLoggedIn={false} isAdmin={false}/>
        {children}
    </>
  );
}
