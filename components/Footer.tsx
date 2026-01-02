export default function Footer() {
  return (
    <footer className={'flex flex-col'}>
      <div
        className={
          'flex flex-col justify-center items-center border-t border-t-text-dark px-8 max-sm:px-4 pt-4 pb-8 text-sm font-light'
        }
      >
        <div className={'flex lg:max-w-360 w-full'}>
          <div className={'grid grid-cols-3 max-sm:text-xs'}>
            <div>
              <span className={'font-black'}>{'Stephen Ko'}</span>
              <div></div>
            </div>
            <div>
              <span></span>
            </div>
            <div>
              <span></span>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          'flex justify-center px-8 max-sm:px-4 py-2 text-xs bg-text-dark text-white'
        }
      >
        <span className={'lg:max-w-360 w-full'}>
          {'Developed by Gi Hun Ko Stephen'}
        </span>
      </div>
    </footer>
  );
}
