// import { Navbar, Header, About ,  Vision, Services, Contact, Footer , Head} from "../../sections/index";

import Head from "../components/Head";
import Landing from "../components/Landing";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Services from "../components/Services";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import FloatingButtons from "../components/FloatingButtons";



export default function Home() {

  return (
    <>
      <Head />
      <Navbar />
      <Landing />
      <FloatingButtons />
      <About />
      <Services />
      <Contact />
      <Footer />
    </>
  )
}
