"use client";
import Image from "next/image";
import logoImg from "../../public/assets/logo/full_wlogo.png";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from 'next/navigation';
// import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
// import { HoverBorderGradient } from "@/components/ui/animations/hover-border-gradient";

export default function Header() {
  const privy = usePrivy();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  // const [CA, setCA] = useState("");
  
  // const handleLogin = useCallback(() => privy.login(), [privy]);
  // useEffect(() => {
  //   axios.get("https://catools.dev3vds1.link/get/almaze-labs")
  //     .then(response => {
  //       const data = response.data
  //       if (data) {
  //         // console.log(`this is the data addr : ${data.address}`)
  //         setCA(data.address);

  //       }
  //     })
  //     .catch(error => {
  //       console.error("Error fetching CA:", error);
  //     });
  // }, []);

  useEffect(() => {
    if (privy?.ready) {
      if (privy.authenticated) {
        localStorage.setItem('useremail', privy.user?.email?.address ?? "Guest");
        Cookies.set('privy-authenticated', 'true', { path: '/', expires: 1 });
        router.push('/dashboard');
      }
    }
  }, [privy.ready, privy.authenticated, router]);

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setActiveSection(sectionId);
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  });

  // Intersection Observer to detect active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = ["features", "tokenomics"];
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { name: "Features", href: "features", isExternal: false },
    { name: "Tokenomics", href: "tokenomics", isExternal: false },
    { name: "Socials", href: "footer", isExternal: false },
    { name: "Docs", href: "https://dotbase.gitbook.io/dotbase", isExternal: true },
  ];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="fixed z-[1000] top-0 left-0 w-full"
    >
      {/* Dark gradient background with glow */}
      <div className="mx-auto container max-w-[1128px] pt-8 px-8">
      <div className="relative">
        {/* Glow effect layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/60 via-purple-500/60 to-red-500/60 blur-xl" />
        <div className="relative py-1 px-2 bg-gray-950 backdrop-blur-lg rounded-full flex justify-between items-center">
          <Link href={"/"} className="flex">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Image src={logoImg} alt="dotbase-logo" className="w-[116px]" />
            </motion.div>
          </Link>

          <ul className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center gap-4">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.isExternal ? (
                  <motion.a
                    href={item.href}
                    target="_blank"
                  >
                     <motion.button
                    className={`relative py-1.5 px-2 rounded-md text-sm font-medium text-white transition-colors duration-200 ${
                      activeSection === item.href ? "text-purple-700" : ""
                    }`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {item.name}
                    {activeSection === item.href && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 w-full bg-purple-700"
                        layoutId="underline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                  </motion.a>
                ) : (
                  
                  <motion.button
                    onClick={() => scrollToSection(item.href)}
                    className={`relative py-1.5 px-2 rounded-md text-sm font-medium text-white transition-colors duration-200 ${
                      activeSection === item.href ? "text-purple-700" : ""
                    }`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {item.name}
                    {activeSection === item.href && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 w-full bg-purple-700"
                        layoutId="underline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                )}
              </li>
            ))}

          </ul>

          <div className="flex items-center gap-1 pr-4">
              <motion.a
                href="https://github.com/Dotbaseai"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="w-[42px] h-[42px] rounded-md flex justify-center items-center hover:bg-white/5"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.99999 0.526611C4.76578 0.526611 0.526306 4.76609 0.526306 10.0003C0.526306 14.1924 3.23815 17.7332 7.00394 18.9885C7.47762 19.0713 7.65525 18.7871 7.65525 18.5385C7.65525 18.3135 7.64341 17.5675 7.64341 16.774C5.26315 17.2122 4.64736 16.1938 4.45789 15.6608C4.35131 15.3885 3.88946 14.5477 3.48683 14.3227C3.15525 14.145 2.68157 13.7069 3.47499 13.695C4.22104 13.6832 4.75394 14.3819 4.93157 14.6661C5.7842 16.099 7.14604 15.6964 7.69078 15.4477C7.77367 14.8319 8.02236 14.4175 8.29473 14.1806C6.18683 13.9438 3.9842 13.1266 3.9842 9.50293C3.9842 8.47266 4.35131 7.62003 4.95525 6.95687C4.86052 6.72003 4.52894 5.74898 5.04999 4.44635C5.04999 4.44635 5.84341 4.19766 7.65525 5.4174C8.41315 5.20424 9.21841 5.09766 10.0237 5.09766C10.8289 5.09766 11.6342 5.20424 12.3921 5.4174C14.204 4.18582 14.9974 4.44635 14.9974 4.44635C15.5184 5.74898 15.1868 6.72003 15.0921 6.95687C15.6961 7.62003 16.0631 8.46082 16.0631 9.50293C16.0631 13.1385 13.8487 13.9438 11.7408 14.1806C12.0842 14.4766 12.3803 15.045 12.3803 15.9332C12.3803 17.2003 12.3684 18.2187 12.3684 18.5385C12.3684 18.7871 12.5461 19.0832 13.0198 18.9885C16.7619 17.7332 19.4737 14.1806 19.4737 10.0003C19.4737 4.76609 15.2342 0.526611 9.99999 0.526611Z"
                    fill="#FFFFFF"
                  />
                </svg>
              </motion.a>

              <motion.a
                href="https://x.com/dotbase_ai"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="w-[42px] h-[42px] rounded-md flex justify-center items-center hover:bg-white/5"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.2719 1.58659H18.0832L11.9415 8.60617L19.1667 18.1582H13.5094L9.0784 12.365L4.00833 18.1582H1.1954L7.76457 10.65L0.833374 1.58659H6.6343L10.6395 6.88187L15.2719 1.58659ZM14.2853 16.4756H15.843L5.78787 3.18087H4.11626L14.2853 16.4756Z"
                    fill="#FFFFFF"
                  />
                </svg>
              </motion.a>
              {/* <div className="bg-gray-950 text-white flex items-center space-x-2 py-1.5 text-[13px] font-normal mr-6">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(CA);
                    setIsCopied(true);
                  }}
                  className="py-1.5"
                >
                  CA :{" "}
                  {isCopied
                    ? "Copied!"
                    : CA}
                </button>
                <svg
                              width="16"
                              height="17"
                              viewBox="0 0 16 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_1_771)">
                                <path
                                  d="M5.68437 5.91912V4.13412C5.68437 3.42005 5.68437 3.06301 5.82334 2.79028C5.94558 2.55037 6.14063 2.35532 6.38054 2.23308C6.65327 2.09412 7.01031 2.09412 7.72437 2.09412H12.5694C13.2834 2.09412 13.6405 2.09412 13.9132 2.23308C14.1531 2.35532 14.3482 2.55037 14.4704 2.79028C14.6094 3.06301 14.6094 3.42005 14.6094 4.13412V8.97912C14.6094 9.69318 14.6094 10.0502 14.4704 10.323C14.3482 10.5629 14.1531 10.7579 13.9132 10.8801C13.6405 11.0191 13.2834 11.0191 12.5694 11.0191H10.7844M3.89937 14.8441H8.74437C9.45844 14.8441 9.8155 14.8441 10.0882 14.7051C10.3281 14.5829 10.5232 14.3879 10.6454 14.148C10.7844 13.8752 10.7844 13.5182 10.7844 12.8041V7.95912C10.7844 7.24505 10.7844 6.88801 10.6454 6.61528C10.5232 6.37537 10.3281 6.18032 10.0882 6.05808C9.8155 5.91912 9.45844 5.91912 8.74437 5.91912H3.89937C3.18531 5.91912 2.82827 5.91912 2.55554 6.05808C2.31563 6.18032 2.12058 6.37537 1.99834 6.61528C1.85937 6.88801 1.85938 7.24505 1.85938 7.95912V12.8041C1.85938 13.5182 1.85937 13.8752 1.99834 14.148C2.12058 14.3879 2.31563 14.5829 2.55554 14.7051C2.82827 14.8441 3.1853 14.8441 3.89937 14.8441Z"
                                  stroke="white"
                                  strokeWidth="1.275"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1_771">
                                  <rect
                                    width="15"
                                    height="15"
                                    fill="white"
                                    transform="translate(0.584351 0.81897)"
                                  />
                                </clipPath>
                              </defs>
                </svg>
              </div> */}
          </div>
        </div>
      </div>
      </div>
    </motion.nav>
  );
}
