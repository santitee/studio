import Logo from './logo';

const Header = () => {
  return (
    <header className="flex items-center h-16 px-4 md:px-6 border-b bg-card/80 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <Logo className="w-8 h-8 text-primary" />
        <h1 className="text-xl font-bold font-headline text-primary">
          InsuroMatch AI
        </h1>
      </div>
    </header>
  );
};

export default Header;
