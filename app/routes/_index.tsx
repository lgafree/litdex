import { Search } from "~/components/Search";

export default function Index() {
  return (
    <div className="flex-grow flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full space-y-8 px-4">
        <div className="text-center">
          <h1 className="text-6xl font-extrabold text-primary mb-2 font-orbitron tracking-wider">LitDex</h1>
          <p className="text-xl text-muted-foreground">Deep Information For Users & Rooms</p>
        </div>
        <Search />
      </div>
    </div>
  );
}
