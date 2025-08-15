"use client";
function LitratoNavbar() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className="fixed top-[36px] left-1/2 transform -translate-x-1/2 w-[710px] h-[45px] border-litratoblack border-2 bg-white z-50 rounded-xl flex justify-around pt-[13px] items-center font-semibold text-[20px] shadow-md shadow-litratoblack">
        <p
          onClick={() => scrollToSection("home")}
          className="cursor-pointer text-litratoblack"
        >
          Home
        </p>
        <p
          onClick={() => scrollToSection("about")}
          className="cursor-pointer text-litratoblack"
        >
          About
        </p>
        <p
          onClick={() => scrollToSection("events")}
          className="cursor-pointer text-litratoblack"
        >
          Events
        </p>
        <p
          onClick={() => scrollToSection("services")}
          className="cursor-pointer text-litratoblack"
        >
          Services
        </p>
      </div>
    </div>
  );
}

export default LitratoNavbar;
