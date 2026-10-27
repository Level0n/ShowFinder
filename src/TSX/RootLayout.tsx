import { Outlet, Link, useNavigate } from "react-router";
import '../style/rootlayout.css';

function RootLayout() {
  const navigate = useNavigate();

  function showSearch() {
    const formSearch = document.querySelector("#root > header > div > div.header-bottom");
    formSearch?.classList.toggle('header-bottom-active');
  }

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let searchText = event.currentTarget.elements.namedItem('textSearch') as HTMLInputElement;
    if (searchText.value.length === 0) return;
    navigate(`search/${searchText.value}`);
  }

  return ( 
    <div className="content">
      <header className="header">
        <div className="header-container">
          <div className="header-top">          
            <Link className='header-top-logo' to='/'>
              <img className='header-top-logo-img' src="/ShowFinder/img/cinopedia_logo.svg" alt="" />
            </Link>
            <div className="header-top-icon-container" onClick={showSearch}>
              <svg className="header-top-icon" xmlns="http://w3.org" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
          <div className="header-bottom header-bottom-active">
            <form className="header-form" action="" onSubmit={submitSearch}>
              <svg className="header-form-icon" xmlns="http://w3.org" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input className="header-form-input" type="text" placeholder="Enter the title" name="textSearch" autoComplete="off" />
            </form>
          </div>
        </div>
      </header>
      <main className="main">
        <div className="main-container">
          <Outlet />
        </div>
      </main>
      <footer className="footer">
        <div className="footer-container">
          <Link className='footer-logo' to='/'>
            <img className='footer-logo-img' src="/ShowFinder/img/cinopedia_logo.svg" alt="" />
          </Link>
          <div className="footer-bottom">
            <p className="footer-bottom-text">@Andrew Stepanov 2026</p>
            <p className="footer-bottom-text">Information about the world of cinema</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export { RootLayout };