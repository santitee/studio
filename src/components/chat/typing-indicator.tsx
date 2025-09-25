import { cn } from '@/lib/utils';

const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-1.5 p-2">
      <div className={cn("h-2 w-2 rounded-full bg-current animate-pulse [animation-delay:-0.3s]")}></div>
      <div className={cn("h-2 w-2 rounded-full bg-current animate-pulse [animation-delay:-0.15s]")}></div>
      <div className={cn("h-2 w-2 rounded-full bg-current animate-pulse")}></div>
    </div>
  );
};

export default TypingIndicator;
