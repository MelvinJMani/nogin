import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className='border border-black/70 px-3 py-1 text-sm active:eink-refresh flex items-center gap-1'
    >
      <span aria-hidden='true' className='font-mono text-lg leading-none'>
        ←
      </span>
      <span>Back</span>
    </button>
  );
}
