
import { Link } from "react-router-dom";


function Footer() {
  return (
    <>
      <div className='bg-slate-950  px-6 grid  md:grid-cols-2 lg:grid-cols-2   gap-4 bottom-0 py-4 h-25' data-testid="footer">
        <div className="  lg:justify-self-start">
          <span
          className=' cursor-pointer  bg-gradient-to-r from-green-400 to-blue-400 hover:from-pink-500 hover:to-rose-500 rounded p-2'
          data-testid="footer-drop-imagery"
        >
         <Link to = "/imagegallery"> DropImagery</Link>
        </span>

        </div>
        <section className="lg:justify-self-end">
        <span className='   py-4 ' data-testid="footer-copyright">
          &copy; Gbenga Oluwadahunsi 2023
        </span>
        </section>
      </div>
    </>
  );
}

export default Footer;
