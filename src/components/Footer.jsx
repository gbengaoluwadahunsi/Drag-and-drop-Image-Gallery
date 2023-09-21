

function Footer() {
  return (
    <>
      <div className='bg-slate-950 bottom-0 py-4 h-25' data-testid="footer">
        <span
          className='inline-block cursor-pointer bg-gradient-to-r from-green-400 to-blue-400 hover:from-pink-500 hover:to-rose-500 rounded p-2'
          data-testid="footer-drop-imagery"
        >
          DropImagery
        </span>
        <span className='block py-4 text-xs' data-testid="footer-copyright">
          &copy; Gbenga Oluwadahunsi 2023
        </span>
      </div>
    </>
  );
}

export default Footer;
