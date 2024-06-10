import { DemystLogo } from '../icons/Logo';

export const AppHeader = () => {
  return (
    <header className="fixed top-0 h-[64px] w-full shadow-sm bg-white">
      <div className="flex h-full items-center px-4">
        <DemystLogo />
      </div>
    </header>
  );
};
