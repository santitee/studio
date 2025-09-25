import type { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import Logo from '../logo';

interface MessageProps {
  message: Message;
}

const ChatMessage = ({ message }: MessageProps) => {
  const isBot = message.sender === 'bot';

  return (
    <div
      className={cn(
        'flex items-start gap-3 w-full',
        !isBot && 'justify-end'
      )}
    >
      {isBot && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
          <Logo className="w-6 h-6 text-primary-foreground" />
        </div>
      )}
      <div
        className={cn(
          'max-w-[80%] rounded-lg',
          isBot
            ? 'bg-card text-card-foreground shadow-sm'
            : 'bg-primary text-primary-foreground',
           !message.component && 'px-4 py-3'
        )}
      >
        {message.text && (
          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        )}
        {message.component}
      </div>
    </div>
  );
};

export default ChatMessage;
