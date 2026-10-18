import '../style/errorpage.css';

function ErrorPage() {
  return (
    <div className='error'>
      <h1 className='error-title'>This page does not exist</h1>
      <img className="error-image" src="/img/cat.jpg" alt="Ошибка 404" />
    </div>
  )
}

export { ErrorPage };