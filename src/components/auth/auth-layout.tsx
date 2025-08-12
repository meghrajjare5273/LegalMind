// "use client";

// import { Box } from "@mui/material";
// import { motion, AnimatePresence } from "framer-motion";
// import { useRouter } from "next/navigation";
// import AuthForm from "./auth-form";

// interface AuthLayoutProps {
//   mode: "sign-up" | "sign-in";
// }

// export default function AuthLayout({ mode }: AuthLayoutProps) {
//   const router = useRouter();

//   const handleModeChange = (newMode: "sign-up" | "sign-in") => {
//     router.push(`/auth/${newMode}`);
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         p: { xs: 2, md: 4 },
//         position: "relative",
//         height: "100%",
//         overflow: "hidden",
//       }}
//     >
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={mode}
//           initial={{ opacity: 0, x: mode === "sign-in" ? -100 : 100 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: mode === "sign-in" ? 100 : -100 }}
//           transition={{
//             duration: 0.4,
//             ease: [0.4, 0, 0.2, 1],
//             type: "tween",
//           }}
//           style={{
//             width: "100%",
//             height: "100%",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <AuthForm mode={mode} onModeChange={handleModeChange} />
//         </motion.div>
//       </AnimatePresence>
//     </Box>
//   );
// }
