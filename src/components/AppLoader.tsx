import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import PageLoader from "./PageLoader";

const INITIAL_DURATION = 900;
const ROUTE_DURATION = 450;

const AppLoader = () => {
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isInitial, setIsInitial] = useState(true);

  // Initial app load
  useEffect(() => {
    const t = setTimeout(() => {
      setIsLoading(false);
      setIsInitial(false);
    }, INITIAL_DURATION);
    return () => clearTimeout(t);
  }, []);

  // Subsequent route changes
  useEffect(() => {
    if (isInitial) return;
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), ROUTE_DURATION);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="app-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <PageLoader />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AppLoader;
