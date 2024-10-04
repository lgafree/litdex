import { Search } from "~/components/Search";

export default function Index() {
  return (
    // <div className="flex-grow flex items-center justify-center min-h-screen">
    //   <div className="max-w-md w-full space-y-8 px-4">
    //     <div className="text-center">
    //       <h1 className="text-6xl font-extrabold text-primary mb-2 font-orbitron tracking-wider">LitDex</h1>
    //       <p className="text-xl text-muted-foreground">Deep Information of Litmatch</p>
    //     </div>
    //     <Search />
    //   </div>
    // </div>
  <div className="flex-grow flex items-center justify-center min-h-screen">
    <div className="max-w-md w-full space-y-8 px-4 text-center">
      <h2 className="text-2xl font-bold text-primary mb-4">Na-Ban agad tayo ni madam litmatch, andaming taga suplong.</h2>
      <p className="text-lg text-muted-foreground">
        Kung gusto nyong gumawa tayo ng same app or discussion, message or comment lang kayo sa account ko sa LM. 
        <span 
          className="font-bold text-primary cursor-pointer" 
          onClick={() => navigator.clipboard.writeText("5644916954")}
        >
          Id: 5644916954
        </span>
      </p>
    </div>
  </div>
  );
}
