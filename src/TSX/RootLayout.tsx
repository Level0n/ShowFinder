import { Outlet, Link, useNavigate } from "react-router";
import '../style/rootlayout.css';

function RootLayout() {
  const navigate = useNavigate();

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let searchText = event.currentTarget.elements.namedItem('textSearch') as HTMLInputElement;
    navigate(`search/${searchText.value}`);
  }

  return ( 
    <>
      <header className="header">
        <div className="header-container">
          <Link className='header-logo' to='.'>LOGOTYPE</Link>
          <form className="header-form" onSubmit={submitSearch}>
            <input className="header-form-input" type='text' placeholder="Enter the title" name="textSearch" />
            <input className="header-form-button" type="submit" value={'Search'} name="buttonSearch" />
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