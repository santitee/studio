import type { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Skeleton } from '@/components/ui/skeleton';

interface MessageProps {
  message: Message;
}

const botAvatar = PlaceHolderImages.find((img) => img.id === 'bot-avatar');

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
        <div className="flex-shrink-0">
          {botAvatar ? (
            <Image
              src={botAvatar.imageUrl}
              alt={botAvatar.description}
              width={40}
              height={40}
              className="rounded-full"
              data-ai-hint={botAvatar.imageHint}
            />
          ) : (
            <Skeleton className="w-10 h-10 rounded-full" />
          )}
        </div>
      )}
      <div
        className={cn(
          'max-w-[80%] rounded-lg px-4 py-3',
          isBot
            ? 'bg-card text-card-foreground shadow-sm'
            : 'bg-primary text-primary-foreground'
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
