// import { Navbar, Header, About ,  Vision, Services, Contact, Footer , Head} from "../../sections/index";

import Head from "../components/Head";
import Landing from "../components/Landing";
import Navbar from "../components/Navbar";
import About from "../components/About";



export default function Home() {

  return (
    <>
      <Head />
      <Navbar />
      <Landing />
      <About />
      {/*  <Services />
      <Contact />
      <Footer /> */}
    </>
  )
}
