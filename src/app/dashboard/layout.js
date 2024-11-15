import Nav from "@/components/Nav";

export default function RootLayout({ children }) {
  return (
   <>
       <Nav>{ children }</Nav>
       </>
  );
}
