import Spinner from "./Spinner";

type Props = {
  message?: string;
  fullScreen?: boolean;
};

export default function LoadingScreen({
  message = "Loading…",
  fullScreen = true,
}: Props) {
  const shell = fullScreen
    ? "fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-primary-900/80 backdrop-blur-sm"
    : "flex w-full items-center justify-center py-16";

  return (
    <div className={shell}>
      <div className="flex flex-col items-center gap-4 rounded-xl border border-white/15 bg-primary-800/90 px-8 py-7 text-primary-100 shadow-xl">
        <Spinner size="lg" className="text-primary-300" />
        <p className="text-sm font-medium tracking-wide">{message}</p>
      </div>
    </div>
  );
}
