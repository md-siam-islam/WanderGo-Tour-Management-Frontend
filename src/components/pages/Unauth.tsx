import { Button } from '../ui/button';

const Unauth = () => {
  return (
    <div className="flex flex-col items-center justify-center max-h-screen gap-4 mt-20">
      <h1>Ja sala  tui ay page ar joggona . tui home page a ja  </h1>
      <Button>
        <a href="/">Home</a>
      </Button>
    </div>
  );
};

export default Unauth;