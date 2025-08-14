import { useRouteError } from 'react-router-dom';
import BackButton from '../components/BackButton';

type RouteError = {
  status?: number;
  statusText?: string;
  message?: string;
};

export function ErrorPage({
  errorCode,
  errorMessage,
}: {
  errorCode?: number;
  errorMessage?: string;
}) {
  const error = useRouteError() as RouteError | undefined;
  const status = error?.status || errorCode || 500;
  return (
    <article className='eink-paper border border-black/60 p-4'>
      <div className='flex items-center gap-3 mb-2'>
        <BackButton />
        <h2 className='font-mono text-lg mb-0'>{status} Error</h2>
      </div>
      <p>{error?.statusText || errorMessage || 'Unexpected error'}</p>
    </article>
  );
}
