import BackButton from '../components/BackButton';

export function GamePage({ title }: { title: string }) {
  return (
    <article className='eink-paper border border-black/60 p-4'>
      <div className='flex items-center gap-3 mb-2'>
        <BackButton />
        <h2 className='font-mono text-lg mb-0'>{title}</h2>
      </div>

      <p className='text-sm text-[rgb(var(--ink-weak))]'>
        WIP: {title} game screen.
      </p>
    </article>
  );
}
