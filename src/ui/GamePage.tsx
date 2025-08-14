import { useNavigate } from 'react-router-dom';

export function GamePage({ title }: { title: string }) {
  const navigate = useNavigate();
  return (
    <article className='eink-paper border border-black/60 p-4'>
      <div className='flex items-center gap-3 mb-2'>
        <button
          onClick={() => navigate(-1)}
          className='border border-black/70 px-3 py-1 text-sm active:eink-refresh flex items-center gap-1'
        >
          <span aria-hidden='true' className='font-mono text-lg leading-none'>
            ←
          </span>
          <span>Back</span>
        </button>
        <h2 className='font-mono text-lg mb-0'>{title}</h2>
      </div>

      <p className='text-sm text-[rgb(var(--ink-weak))]'>
        WIP: {title} game screen.
      </p>
    </article>
  );
}
