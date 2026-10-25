import { Outlet, Link, useNavigate } from "react-router";
import '../style/rootlayout.css';

function RootLayout() {
  const navigate = useNavigate();

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let searchText = event.currentTarget.elements.namedItem('textSearch') as HTMLInputElement;
    if (searchText.value.length === 0) return;
    navigate(`search/${searchText.value}`);
  }

  return ( 
    <>
      <header className="header">
        <div className="header-container">
          <Link className='header-logo' to='/'>
            <img className='header-logo-img' src="/ShowFinder/img/cinopedia_logo.svg" alt="" />
          </Link>
          {/* <form className="header-form" onSubmit={submitSearch}>
            <input className="header-form-input" type='text' placeholder="Enter the title" name="textSearch" />
            <input className="header-form-button" type="submit" value={'Search'} name="buttonSearch" />
          </form> */}
          <form action="" onSubmit={submitSearch}>
            <input className="header-form-input-test" type="text" placeholder="Enter the title" name="textSearchTest" />
          </form>
        </div>
      </header>
      <main className="main">
        <div className="main-container">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export { RootLayout };