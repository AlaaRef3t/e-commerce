declare module "aos" {
  const AOS: {
    init: (options?: { duration?: number; [key: string]: unknown }) => void;
    refresh?: () => void;
    refreshHard?: () => void;
  };
  export default AOS;
}
