import { cn } from '@/src/utils';

/**
 * 
.books-circle-container {
  display: inline-grid;
  & div {
    width: 150px;
    background-color: blue;
    border-radius: 50%;
    aspect-ratio: 1;
    offset: circle(50vw) calc(100% * sibling-index()/sibling-count()) 0deg;
  }
}
*/
export default function Page() {
  return (
    <div
      className={
        'h-[70dvh] relative flex grow w-full max-w-360 m-auto overflow-hidden'
      }
    >
      <div
        className={cn(
          'absolute bottom-0 translate-y-[70%] left-0 translate-x-[-50%]',
          'animate-spin [animation-duration:30s]',
          'circle-container book-circle',
        )}
      >
        <div>Text</div>
        <div>Text</div>
        <div>Text</div>
        <div>Text</div>
        <div>Text</div>
        <div>Text</div>
        <div>Text</div>
        <div>Text</div>
        <div>Text</div>
        <div>Text</div>
        <div>Text</div>
        <div>Text</div>
        <div>Text</div>
      </div>

      <div
        className={cn(
          'absolute top-[20%] translate-y-[-80%] right-[20%] translate-x-[50%]',
          'animate-spin [animation-duration:40s]',
          'circle-container artist-circle',
        )}
      >
        <div>Text</div>
        <div>Text</div>
        <div>Text</div>
        <div>Text</div>
        <div>Text</div>
        <div>Text</div>
        <div>Text</div>
        <div>Text</div>
        <div>Text</div>
        <div>Text</div>
      </div>
    </div>
  );
}
