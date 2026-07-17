import logo from "../assets/logo.png";

export default function BayrahaLogo() {
  return (
    <div className="w-12 h-12 flex items-center justify-center shrink-0">
      <img
        src={logo}
        alt="Bayraha Logo"
        className="w-full h-full object-contain"
        draggable={false}
      />
    </div>
  );
}